"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';

import LocateControl from './components/LocateControl';
import DefaultIcon from './components/DefaultIcon';
import calculateDistance from './utils/calculateDistance';

// Import react-leaflet components dynamically for client-side only
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const LayersControl = dynamic(() => import('react-leaflet').then(mod => mod.LayersControl), { ssr: false });
const BaseLayer = dynamic(() => import('react-leaflet').then(mod => mod.LayersControl.BaseLayer), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });

type Position = [number, number];

const AddTrailPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [position, setPosition] = useState<Position | null>(null);
  const [path, setPath] = useState<Position[]>([]);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [isMapVisible, setIsMapVisible] = useState<boolean>(true);
  const [trailData, setTrailData] = useState({
    name: '',
    difficulty: '',
    description: '',
    photo: '',
    location: '',
  });

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [averageSpeed, setAverageSpeed] = useState<number>(0);
  const [averagePace, setAveragePace] = useState<string>('0:00');

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => console.error("Erro ao obter a localização:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator?.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (isTracking && !isPaused) {
            const newPoint: Position = [latitude, longitude];
            setPath((prevPath) => {
              if (prevPath.length > 0) {
                const lastPoint = prevPath[prevPath.length - 1];
                const distance = calculateDistance(
                  lastPoint[0],
                  lastPoint[1],
                  latitude,
                  longitude
                );
                setTotalDistance((prevDistance) => prevDistance + distance);
                setAverageSpeed((totalDistance / 1000) / (elapsedTime / 3600));
                if (totalDistance > 0) {
                  setAveragePace(`${Math.floor(elapsedTime / (totalDistance / 1000))}:${('0' + Math.floor((elapsedTime % (totalDistance / 1000)))).slice(-2)}`);
                } else {
                  setAveragePace('0:00');
                }
              }
              return [...prevPath, newPoint];
            });
          }

          setPosition([latitude, longitude]);
        },
        (error) => console.error("Erro ao obter a localização:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isTracking, isPaused, totalDistance, elapsedTime]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let timer: NodeJS.Timeout;
      if (isTracking && !isPaused) {
        timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
      }
      return () => clearInterval(timer);
    }
  }, [isTracking, isPaused]);

  const handleStart = () => {
    setIsTracking(true);
    setIsPaused(false);
    setIsMapVisible(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleFinish = () => {
    setIsTracking(false);
    setIsFormVisible(true);
    setIsMapVisible(false);
  };

  const handleDiscard = () => {
    setIsTracking(false);
    setElapsedTime(0);
    setTotalDistance(0);
    setPath([]);
    setAverageSpeed(0);
    setIsMapVisible(true);
    setIsFormVisible(false);
    localStorage.removeItem('trailPath');
  };

  const handleSave = async () => {
    const trailToSave = {
      ...trailData,
      distance: totalDistance,
      createdById: user?.id || null,
      path: {
        type: "LineString",
        coordinates: path,
      },
    };

    try {
      const response = await fetch('/api/trails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(trailToSave),
      });

      if (response.ok) {
        console.log('Trail saved successfully');
      } else {
        console.error('Failed to save trail:', await response.text());
      }
    } catch (error) {
      console.error('Error saving trail:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTrailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTrailData((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      <div className="w-full bg-black text-white flex items-center justify-between p-4">
        <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
        <h2 className="text-2xl font-bold">Trail Run</h2>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" onClick={() => setIsMapVisible(true)} />
      </div>

      {/* Mapa */}
      {isMapVisible && position && (
        <MapContainer center={position} zoom={13} className="h-64 mb-4 rounded-lg shadow-lg">
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
          </LayersControl>
          <Marker position={position} icon={DefaultIcon || undefined}>
            <Popup>Você está aqui</Popup>
          </Marker>
          <LocateControl />
          <ZoomControl position="topright" />
        </MapContainer>
      )}

      {/* Conteúdo ajustável e responsivo */}
      <div className="flex flex-col items-center justify-between bg-gray-900 p-4 space-y-4 flex-grow">
        {!isFormVisible ? (
          <>
            {/* Métricas em colunas */}
            <div className={`grid grid-cols-1 gap-4 text-center text-white w-full h-full ${isTracking ? 'bg-blue-600' : ''}`}>
              <div className="border-b border-gray-700">
                <h3 className="text-lg">Tempo</h3>
                <p className="text-5xl font-bold">{Math.floor(elapsedTime / 60)}:{('0' + (elapsedTime % 60)).slice(-2)}</p>
              </div>
              <div className="border-b border-gray-700">
                <h3 className="text-lg">Distância</h3>
                <p className="text-5xl font-bold">{(totalDistance > 0 ? (totalDistance / 1000).toFixed(2) : '0.00')} km</p>
              </div>
              <div className="border-b border-gray-700">
                <h3 className="text-lg">Velocidade Média</h3>
                <p className="text-5xl font-bold">{(totalDistance > 0 ? averageSpeed.toFixed(2) : '0.00')} km/h</p>
              </div>
              <div>
                <h3 className="text-lg">Ritmo Médio</h3>
                <p className="text-5xl font-bold">{averagePace} /km</p>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              {!isTracking || isPaused ? (
                <button onClick={handleStart} className="bg-orange-600 p-4 rounded-full shadow-md text-white flex items-center justify-center w-16 h-16">
                  <FontAwesomeIcon icon={faPlay} className="text-2xl" />
                </button>
              ) : (
                <button onClick={handlePause} className="bg-yellow-600 p-4 rounded-full shadow-md text-white flex items-center justify-center w-16 h-16">
                  <FontAwesomeIcon icon={faPause} className="text-2xl" />
                </button>
              )}
              <button onClick={handleFinish} className="bg-red-600 p-4 rounded-full shadow-md text-white flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faStop} className="text-2xl" />
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium">Nome da Atividade</label>
              <input
                type="text"
                name="name"
                id="name"
                value={trailData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-lg font-medium">Localização</label>
              <input
                type="text"
                name="location"
                id="location"
                value={trailData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg font-medium">Como foi?</label>
              <textarea
                name="description"
                id="description"
                value={trailData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="difficulty" className="block text-lg font-medium">Dificuldade</label>
              <select
                name="difficulty"
                id="difficulty"
                value={trailData.difficulty}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded"
              >
                <option value="">Selecione a dificuldade</option>
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-lg font-medium">Adicionar Fotos/Vídeos</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded"
              />
              {trailData.photo && (
                <img src={trailData.photo} alt="Preview" className="mt-2 w-full h-auto rounded" />
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={handleDiscard} className="bg-red-600 text-white p-3 rounded-full w-1/2 mr-2 hover:bg-red-700">
                Descartar Atividade
              </button>
              <button type="submit" className="bg-orange-600 text-white p-3 rounded-full w-1/2 hover:bg-orange-700">
                Salvar Atividade
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTrailPage;
