"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"; // Importando o useSession
import logo from "@/assets/images/logoBg.png";
import { useRouter } from 'next/navigation'; // Importando useRouter
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
        const myTrails = data.filter((trail: Trail) => trail.createdBy.id === user?.id);// Armazena as trilhas do usuário no estado
        
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
  }, [user]);

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
          <div className='flex justify-between'>
            <Button className="hover:bg-green-700 rounded-full text-2xl font-bold text-center text-white mt-2 bg-green-600 dark:text-white"
             ><Link href={"/mytrails"}>Minhas trilhas</Link></Button>
          </div>
          
        </div>

        <div className="bg-green-200 p-4 rounded-lg text-lg dark:bg-dark-selected">
          <p>Trilhas Visitadas: <span className="font-bold">{trailsVisited || 0}</span></p>
          <p>Distância Percorrida: <span className="font-bold">{totalDistance || 0} KM</span></p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg text-lg text-center">
          <h4 className="font-bold">Minha Pontuação</h4>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
