import GetDotenvVariable from "@/config/dotenfconfig";
import NextAuth, { NextAuthOptions, Session, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Extensão do tipo Session para incluir token e outros dados do usuário
declare module "next-auth" {
  interface Session {
    user: {
      token?: string;
      refreshToken?: string;
      profilePicture?: string;
      id?: string;
      [key: string]: any;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const authDTO = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const res = await fetch(
          `${GetDotenvVariable("ENVIROMENT")}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(authDTO),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          console.log("Login bem-sucedido:", user);
          return {
            ...user,
            id: user.id,
            tokens: user.tokens, // certifique-se de que 'tokens' existe na resposta do login
          };
        }

        console.log("Falha no login:", res.statusText);
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.token = user.tokens.access_token; // Atribui o access_token
        token.refreshToken = user.tokens.refresh_token; // Atribui o refresh_token
        token.profilePicture = user.profilePicture; // Pega a imagem de perfil
        token.id = user.id; // Adiciona o ID do usuário ao token
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.user.token = token.token as string | undefined;
      session.user.refreshToken = token.refreshToken as string | undefined;
      session.user.profilePicture = token.profilePicture as string | undefined;
      session.user.id = token.id as string | undefined;
      
      console.log("Session callback - session:", session);
      return session;
    },
  },
  debug: true, // Ativa logs de depuração para ajudar a identificar problemas de autenticação
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
