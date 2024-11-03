"use client"; // Ensures this is a client-side component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TrailCard from '@/components/personal/personalTrailCards';
import logo from "@/assets/images/logoBg.png";
import { useSession } from 'next-auth/react';
import { Trail } from "../../interfaces/Trails";

const MyTrailsPage = () => {
  const { data: session } = useSession();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await fetch('/api/trails', {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trails');
        }

        const data = await response.json();
        setTrails(data);
      } catch (error) {
        console.error('Error fetching trails:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.token) {
      fetchTrails();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Minhas Trilhas</h1>
          <div className="flex items-center space-x-2 text-sm">
            <span>Editado em — 22/2/2024</span>
            <button className="bg-gray-200 px-3 py-1 rounded-full">Default</button>
            <button className="bg-gray-200 px-3 py-1 rounded-full">A-Z</button>
            <button className="bg-gray-200 px-3 py-1 rounded-full">Lista</button>
          </div>
        </header>
        <hr className='mt-4 pt-2' />

        {loading ? (
          <p className="text-center mt-8">Carregando trilhas...</p>
        ) : trails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {trails.map((trail) => (
              <Link key={trail.id} href={`/trail/details/${trail.id}`}>
                <TrailCard
                  image={trail.photo || logo}
                  title={trail.name}
                  distance={`${trail.distance} km`}
                  location={trail.location}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8">Nenhuma trilha encontrada.</p>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <Link href="/mytrails/newtrail">
            <button className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyTrailsPage;
