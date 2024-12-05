"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; 

export default function LoginForm() {
    const router = useRouter(); // Adiciona o roteador para navegação

    const searchParams = useSearchParams();
    const error = searchParams?.get('error') || null;
    
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        signIn('credentials', {
            ...data,
            callbackUrl: '/home'
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl md:max-w-xl">
                <div className="flex flex-col items-center">
                    <Image src={logo} alt="Logo" width={300} height={300} />
                </div>
                <form onSubmit={login} className="space-y-6 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                        <Input 
                            name="email" 
                            type="email" 
                            placeholder="Email" 
                            className="w-full p-4 border border-gray-300 rounded-full focus:ring-4 focus:ring-green-400 focus:outline-none transition duration-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 font-semibold">Senha</label>
                        <Input 
                            name="password" 
                            type="password" 
                            placeholder="Senha" 
                            className="w-full p-4 border border-gray-300 rounded-full focus:ring-4 focus:ring-green-400 focus:outline-none transition duration-300"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-500 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Entrar
                    </Button>
                    {error === "CredentialsSignin" && (
                        <div className="text-red-500 text-sm mt-2 text-center">Credenciais inválidas</div>
                    )}
                </form>
                <div className="mt-6 flex justify-between w-full">
                    <div className="flex flex-col">
                        {/* Redirecionar para a página de redefinição de senha */}
                        <a 
                            onClick={() => router.push("/forgot-password")} 
                            className="text-sm text-gray-600 transition duration-300 cursor-pointer hover:text-green-600"
                        >
                            Esqueceu a senha?
                        </a>
                        <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Necessita de acessibilidade?</a>
                    </div>
                    {/* Redirecionar para a página de cadastro */}
                    <a 
                        onClick={() => router.push("/register")} 
                        className="text-sm text-gray-600 hover:text-green-600 transition duration-300 cursor-pointer"
                    >
                        Cadastrar
                    </a>
                </div>
            </div>
        </div>
    );
}
