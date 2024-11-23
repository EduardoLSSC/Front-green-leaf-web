"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Trail } from "../../interfaces/Trails";

const MyTrailsPage = () => {
  const { data: session } = useSession();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTrails = async () => {
      if (!session?.user?.token) {
        console.error("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/trails", {
          headers: {
            Authorization: `Bearer ${session.user.token}`, // Autenticação com token
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar trilhas.");
        }

        const data = await response.json();

        // Filtra trilhas criadas pelo usuário logado
        const userTrails = data.filter(
          (trail: Trail) => trail.createdBy?.id === session.user.id
        );

        setTrails(userTrails);
      } catch (error) {
        console.error("Erro ao buscar trilhas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrails();
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Minhas Trilhas</h1>
        </header>

        {/* Loading or Content */}
        {loading ? (
          <p className="text-center text-lg">Carregando trilhas...</p>
        ) : trails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trails.map((trail) => (
              <Link key={trail.id} href={`/trail/details/${trail.id}`} passHref>
                <div className="bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                  <img
                    src={trail.photo || "/images/default-trail.jpg"} // Exibe imagem padrão se não houver foto
                    alt={trail.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-green-700">{trail.name}</h2>
                    <p className="text-gray-600 mt-2">
                      <span className="font-bold">Dificuldade:</span> {trail.difficulty}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Distância:</span>{" "}
                      {(trail.distance / 1000).toFixed(2)} km
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Avaliação:</span> {trail.rating} estrelas
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">Nenhuma trilha encontrada.</p>
        )}
      </div>

      {/* Botão fixo para adicionar trilha */}
      <button
        onClick={() => window.location.href = "/mytrails/newtrail"}
        className="fixed bottom-6 right-6 bg-green-800 hover:bg-green-900 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl transition-all"
        aria-label="Adicionar trilha"
        style={{ zIndex: 50 }}
      >
        +
      </button>
    </div>
  );
};

export default MyTrailsPage;
