"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trail } from "../../interfaces/Trails";

const AccountPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [userTrails, setUserTrails] = useState<Trail[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [trailsVisited, setTrailsVisited] = useState<number>(0);

  useEffect(() => {
    const fetchUserTrails = async () => {
      try {
        const response = await fetch("/api/trails");
        if (!response.ok) {
          throw new Error("Erro ao buscar trilhas");
        }
        const data = await response.json();

        const myTrails = data.filter(
          (trail: Trail) => trail.createdBy.id === user?.id
        );
        setUserTrails(myTrails);

        const totalDistanceInMeters = myTrails.reduce(
          (acc: number, trail: Trail) => acc + trail.distance,
          0
        );
        setTotalDistance(totalDistanceInMeters / 1000); // Converte metros para quilômetros
        setTrailsVisited(myTrails.length);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchUserTrails();
    }
  }, [user]);

  const handleAddTrail = () => {
    router.push("/mytrails/newtrail");
  };

  return (
    <div className="mt-4 min-h-screen bg-slate-50 text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Estatísticas do usuário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-green-700">Estatísticas</h3>
            <p className="text-lg">
              Trilhas Visitadas:{" "}
              <span className="font-bold text-green-700">{trailsVisited || 0}</span>
            </p>
            <p className="text-lg">
              Distância Percorrida:{" "}
              <span className="font-bold text-green-700">
                {totalDistance.toFixed(2)} km
              </span>
            </p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-green-700">Pontuação</h3>
            <p className="text-center text-3xl font-bold text-green-600">
              {trailsVisited * 10 || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Ganhe mais pontos explorando e criando trilhas!
            </p>
          </div>
        </div>

        {/* Trilhas do usuário */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-700">Minhas Trilhas</h3>
          {userTrails.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTrails.map((trail) => (
                <Link key={trail.id} href={`/trail/details/${trail.id}`} passHref>
                  <li className="bg-white text-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
                    {/* Imagem da trilha */}
                    <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                      <img
                        src={trail.photo || "/images/default-trail.jpg"} // Mostra imagem padrão se não houver foto
                        alt={trail.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Informações da trilha */}
                    <h4 className="text-lg font-bold text-green-700">{trail.name}</h4>
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
                    <p className="text-gray-600">
                      <span className="font-bold">Autor:</span> {trail.author}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-center text-white mt-4">
              Você ainda não tem trilhas criadas.
            </p>
          )}
        </div>
      </main>

      {/* Botão fixo para adicionar trilha */}
      <button
        onClick={handleAddTrail}
        className="fixed bottom-6 right-6 bg-green-800 hover:bg-green-900 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl transition-all"
        aria-label="Adicionar trilha"
      >
        +
      </button>
    </div>
  );
};

export default AccountPage;
