"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [registrationError, setRegistrationError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const router = useRouter(); // Usando o hook useRouter para navegação

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('name'),
            lastName: formData.get('surname'),
            email: formData.get('email'),
            password: formData.get('password'),
            profilePicture: "", // Aqui você pode adicionar lógica para carregar uma imagem, se necessário
        };

        // Verificar se as senhas coincidem e não estão vazias
        if (!password || !confirmPassword) {
            setPasswordError("Os campos de senha não podem estar vazios");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("As senhas não coincidem");
            return;
        } else {
            setPasswordError(""); // Limpar o erro se as senhas coincidirem
        }

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccessMessage("Usuário registrado com sucesso!");
                setRegistrationError(""); // Limpar erros
                setShowSuccessPopup(true); // Exibir o pop-up temporário

                // Redirecionar após 5 segundos
                setTimeout(() => {
                    setShowSuccessPopup(false); // Esconder o pop-up
                    router.push("/"); // Redirecionar para a página inicial
                }, 5000);
            } else if (response.status === 500) {
                const errorData = await response.json();

                // Verifica se o erro é sobre duplicação de email
                if (errorData.message.includes("duplicate key")) {
                    setRegistrationError("Este email já está registrado. Por favor, tente outro.");
                } else {
                    setRegistrationError(errorData.message || "Erro ao registrar o usuário.");
                }
            }
        } catch (error) {
            console.error("Erro ao registrar o usuário:", error);
            setRegistrationError("Erro ao registrar o usuário. Tente novamente.");
        }
    }

    // Função para cancelar e voltar para a página inicial
    function cancel() {
        router.push("/"); // Navegar para a rota inicial
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg md:max-w-md">
                <div className="flex flex-col items-center">
                    <Image src={logo} alt="Logo" className="mb-6 shadow-lg" width={300} height={300} />
                    <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Green Leaf Trail</h1>
                </div>
                <form onSubmit={register} className="space-y-6 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 font-semibold">Nome</label>
                        <Input 
                            name="name" 
                            type="text" 
                            placeholder="Nome completo" 
                            className="w-full p-4 border border-gray-300 rounded-full focus:ring-4 focus:ring-green-400 focus:outline-none transition duration-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="surname" className="text-gray-700 font-semibold">Sobrenome</label>
                        <Input 
                            name="surname" 
                            type="text" 
                            placeholder="Sobrenome" 
                            className="w-full p-4 border border-gray-300 rounded-full focus:ring-4 focus:ring-green-400 focus:outline-none transition duration-300"
                        />
                    </div>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-gray-700 font-semibold">Confirme a senha</label>
                        <Input 
                            name="confirmPassword" 
                            type="password" 
                            placeholder="Confirme a senha" 
                            className="w-full p-4 border border-gray-300 rounded-full focus:ring-4 focus:ring-green-400 focus:outline-none transition duration-300"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {passwordError && (
                        <div className="text-red-500 text-sm mt-2 text-center">{passwordError}</div>
                    )}
                    {registrationError && (
                        <div className="text-red-500 text-sm mt-2 text-center">{registrationError}</div>
                    )}
                    <Button 
                        type="submit" 
                        className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-500 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Cadastrar
                    </Button>
                </form>
                <Button 
                    onClick={cancel}
                    className="mt-4 w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-500 shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Cancelar
                </Button>
            </div>

            {/* Pop-up de sucesso */}
            {showSuccessPopup && (
                <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-4">
                    Usuário registrado com sucesso! Redirecionando...
                </div>
            )}
        </div>
    );
}
