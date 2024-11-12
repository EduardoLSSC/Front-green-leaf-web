"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"; // Importando o useSession
import logo from "@/assets/images/logoBg.png";
import trilha from "@/assets/images/trilhaexemplo.jpg";
import { useRouter } from 'next/navigation'; // Importando useRouter

// Defina a interface aqui se não estiver importando
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Trail {
  id: string;
  name: string;
  difficulty: string;
  distance: number; // Distância da trilha
  rating: number;
  photo: string;
  createdBy: User; // Propriedade para o usuário que criou a trilha
  author?: string;
}

const AccountPage = () => {
  const { data: session } = useSession(); // Obtendo a sessão
  const user = session?.user; // Acessando os dados do usuário da sessão
  const router = useRouter(); // Inicializa o useRouter

  const [userTrails, setUserTrails] = useState<Trail[]>([]); // Estado para trilhas do usuário
  const [totalDistance, setTotalDistance] = useState<number>(0); // Total de distância percorrida
  const [trailsVisited, setTrailsVisited] = useState<number>(0); // Número de trilhas visitadas

  useEffect(() => {
    const fetchUserTrails = async () => {
      try {
        const response = await fetch('/api/trails');
        if (!response.ok) {
          throw new Error('Erro ao buscar trilhas');
        }
        const data = await response.json();

        // Filtra as trilhas para incluir apenas aquelas criadas pelo usuário logado
        const myTrails = data.filter((trail: Trail) => trail.createdBy.id === user?.id);
        setUserTrails(myTrails); // Armazena as trilhas do usuário no estado
        
        // Calcular distância total e número de trilhas
        const totalDistance = myTrails.reduce((acc: any, trail: any) => acc + trail.distance, 0);
        setTotalDistance(totalDistance);
        setTrailsVisited(myTrails.length); // Atualiza o número de trilhas visitadas
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchUserTrails();
    }
  }, [user]); // Inclui user como dependência para garantir que a filtragem funcione

  // Função para redirecionar para a página de adicionar trilha
  const handleAddTrail = () => {
    router.push('/mytrails/newtrail'); // Mude o caminho conforme necessário
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      <main className="container mx-auto my-8">
        <div className="flex items-center space-x-4 mb-8">
          <Image
            src={logo}
            alt="Foto do perfil"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="text-4xl font-bold dark:text-white">Minha Conta</h2>
        </div>

        <div className="mb-6">
          <Image
            src={trilha}
            alt="Minhas Trilhas"
            width={800}
            height={200}
            className="w-full object-cover rounded"
          />
          <h3 className="text-2xl font-bold text-center mt-2 dark:text-white">Minhas Trilhas</h3>
        </div>

        <div className="bg-green-200 p-4 rounded-lg text-lg dark:bg-dark-selected">
          <p>Trilhas Visitadas: <span className="font-bold">{trailsVisited || 0}</span></p>
          <p>Distância Percorrida: <span className="font-bold">{totalDistance || 0} KM</span></p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg text-lg text-center">
          <h4 className="font-bold">Minha Pontuação</h4>
        </div>

        {/* Exibir trilhas do usuário */}
        <div className="mt-6">
          <h4 className="text-xl font-bold mb-4">Minhas Trilhas:</h4>
          <ul className="space-y-2">
            {userTrails.length > 0 ? (
              userTrails.map((trail) => (
                <li key={trail.id} className="bg-white border p-4 rounded-lg shadow">
                  <h5 className="font-bold">{trail.name}</h5>
                  <p>Dificuldade: {trail.difficulty}</p>
                  <p>Distância: {trail.distance} km</p>
                  <p>Avaliação: {trail.rating} estrelas</p>
                  <p>Autor: {trail.author}</p>
                </li>
              ))
            ) : (
              <p>Nenhuma trilha encontrada.</p>
            )}
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={handleAddTrail} // Redireciona para a página de adicionar trilha
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Adicionar</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
