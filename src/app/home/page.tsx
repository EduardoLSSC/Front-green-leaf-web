"use client";
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
            // Verifica se o token está presente
            if (session?.user?.token) {
                try {
                    const response = await fetch('/api/trails', {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session.user.token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    // Verifica se a resposta da API é ok
                    if (!response.ok) {
                        throw new Error('Erro ao buscar trilhas');
                    }

                    const data = await response.json();

                    // Ajuste aqui: não há propriedade 'data' na resposta
                    setTrails(data); // Acessa diretamente o array de trilhas
                    
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

    // Renderiza loading enquanto os dados estão sendo buscados
    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <main>
            <Header /> {/* Inclua o cabeçalho se necessário */}
            <div className="flex flex-row items-end">
                <h1 className="text-5xl font-serif">Trilhas</h1>
                <p className="pl-2">{trails.length} itens</p>
            </div>
            <hr className="mt-4 pt-2" />
            <div className="overflow-auto h-[80vh] w-[70%]"> {/* Contêiner com scroll */}
                <div className="grid grid-cols-1 gap-4 pr-4">
                    {trails.map((trail, index) => (
                        <TrailCard key={index} trail={trail} />
                    ))}
                </div>
            </div>
        </main>
    );
}
