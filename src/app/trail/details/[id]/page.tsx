"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrail } from '@/app/api/trailApi';
import dynamic from 'next/dynamic';
import { Trail } from '../../../../interfaces/Trails';

// Dynamically import TrailMap with `ssr: false` to avoid server-side rendering issues
const TrailMap = dynamic(() => import('@/components/ui/TrailMap'), { ssr: false });

const TrailPage = () => {
  const [trail, setTrail] = useState<Trail | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrailData = async () => {
      if (id) {
        try {
          const trailData = await fetchTrail(parseInt(id as string, 10));
          setTrail(trailData);
        } catch (error) {
          console.error('Error fetching trail:', error);
        }
      }
    };

    fetchTrailData();
  }, [id]);

  if (!trail) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto my-8">
        <h2 className="text-4xl font-bold text-center my-6">{trail.name}</h2>
        <div className="mb-6">
          <img src={trail.photo} alt="Trail map" className="w-full object-cover" />
        </div>
        <div className="text-center space-y-4 mb-8">
          <p><strong>Distance:</strong> {trail.distance} meters</p>
          <p><strong>Difficulty:</strong> {trail.difficulty}</p>
          <p><strong>Description:</strong> {trail.description}</p>
          <p><strong>Location:</strong> {trail.location}</p>
          <p><strong>Created By:</strong> {trail.createdBy.firstName} {trail.createdBy.lastName}</p>
        </div>
        {trail.path && trail.path.coordinates ? (
          <TrailMap path={trail.path.coordinates} />
        ) : (
          <p className="text-center text-gray-600">No path data available for this trail.</p>
        )}
      </main>
    </div>
  );
};

export default TrailPage;
