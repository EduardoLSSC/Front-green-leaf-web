"use client";
import Link from "next/link"; // Importa o componente Link
import Header from "@/components/personal/header";
import TrailCard from "@/components/personal/trailCards";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
    const { data: session } = useSession();
    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrails = async () => {
            if (session?.user?.token) {
                try {
                    const response = await fetch('/api/trails', {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session.user.token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao buscar trilhas');
                    }

                    const data = await response.json();
                    setTrails(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Erro ao buscar trilhas no frontend:", error);
                    setLoading(false);
                }
            } else {
                console.log("Token não encontrado na sessão");
            }
        };

        fetchTrails();
    }, [session]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg font-medium text-gray-600">Carregando...</p>
            </div>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto p-6 mt-4">
                <div className="mb-1"> {/* Reduzido espaço aqui */}
                    <h1 className="text-4xl font-bold text-green-600">Trilhas</h1>
                    <p className="text-gray-600">{trails.length} itens disponíveis</p>
                </div>
                <hr className="my-1 border-gray-300" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {trails.map((trail, index) => (
                    <TrailCard key={index} trail={trail} />
                ))}
                </div>
            </div>
        </main>
    );
}
