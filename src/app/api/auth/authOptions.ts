// src/app/api/auth/authOptions.ts

import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GetDotenvVariable from "@/config/dotenfconfig";

declare module "next-auth" {
  interface User {
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    profilePicture?: string;
    id?: string;
  }

  interface Session {
    user: {
      token?: string;
      refreshToken?: string;
      profilePicture?: string;
      id?: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/" },
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
        const res = await fetch(`${GetDotenvVariable("ENVIROMENT")}/auth/login`, {
          method: "POST",
          body: JSON.stringify(authDTO),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        if (res.ok && user) {
          return { ...user, id: user.id, tokens: user.tokens };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.tokens.access_token;
        token.refreshToken = user.tokens.refresh_token;
        token.profilePicture = user.profilePicture;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.token = token.token as string | undefined;
      session.user.refreshToken = token.refreshToken as string | undefined;
      session.user.profilePicture = token.profilePicture as string | undefined;
      session.user.id = token.id as string | undefined;
      return session;
    },
  },
};
