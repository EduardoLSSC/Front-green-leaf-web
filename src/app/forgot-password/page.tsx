"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function ForgotPassword() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
        };

        // Lógica para enviar o email de redefinição de senha
        console.log("Email para redefinição de senha enviado:", data.email);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg md:max-w-md">
                <div className="flex flex-col items-center">
                    <Image src={logo} alt="Logo" className="mb-6 shadow-lg" width={300} height={300} />
                    <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Green Leaf Trail</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    {/* Campo de email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                        <Input 
                            name="email" 
                            type="email" 
                            placeholder="Email" 
                            className="w-full p-4 border border-gray-300 rounded-full focus:ring-4 focus:ring-green-400 focus:outline-none transition duration-300"
                        />
                    </div>
                    {/* Botão de enviar email */}
                    <Button 
                        type="submit" 
                        className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-500 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Enviar email de redefinição de senha
                    </Button>
                </form>
            </div>
        </div>
    );
}
