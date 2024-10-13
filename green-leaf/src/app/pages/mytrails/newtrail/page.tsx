"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'; // Importa o CSS do locate control
import 'leaflet.locatecontrol'; // Importa o JavaScript do locate control
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

// Configurações para o ícone do marcador
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Position = [number, number];

// Componente para adicionar o botão de localização no mapa
const LocateControl = () => {
  const map = useMap();

  useEffect(() => {
    const locateControl = (L.control as any).locate({
      position: 'topright',
      flyTo: true,
      showPopup: false,
      strings: {
        title: "Voltar para a localização atual"
      },
      locateOptions: {
        enableHighAccuracy: true
      }
    }).addTo(map);

    return () => {
      locateControl.remove();
    };
  }, [map]);

  return null;
};

// Função para calcular a distância entre dois pontos
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * (Math.PI / 180); // Convertendo para radianos
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Retorna a distância em metros
};

const AddTrailPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [position, setPosition] = useState<Position | null>(null);
  const [previousPosition, setPreviousPosition] = useState<Position | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [trailData, setTrailData] = useState({
    name: '',
    difficulty: '',
    description: '',
    photo: '',
  });

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [averageSpeed, setAverageSpeed] = useState<number>(0);

  // Função para obter a localização do usuário
  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Erro ao obter a localização:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  };

  useEffect(() => {
    fetchUserLocation();
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (previousPosition) {
          const distance = calculateDistance(
            previousPosition[0],
            previousPosition[1],
            latitude,
            longitude
          );
          setTotalDistance(prevDistance => prevDistance + distance);
          setAverageSpeed((totalDistance / 1000) / (elapsedTime / 3600));
        }
        
        setPreviousPosition([latitude, longitude]);
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Erro ao obter a localização:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [previousPosition, elapsedTime, totalDistance]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTracking) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking]);

  const handleStart = () => {
    setIsTracking(true);
    setElapsedTime(0);
    setTotalDistance(0);
    setAverageSpeed(0);
  };

  const handlePause = () => {
    setIsTracking(false);
  };

  const handleFinish = () => {
    setIsTracking(false);
    setIsFormVisible(true);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await fetch('/api/trails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...trailData, createdBy: user?.id }),
    });

    if (response.ok) {
      alert('Atividade salva com sucesso!');
      setIsFormVisible(false);
    } else {
      alert('Erro ao salvar a atividade.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      {/* Top Bar */}
      <div className="w-full bg-black text-white flex items-center justify-between p-4">
        <FontAwesomeIcon icon={faTimes} className="text-white text-xl" />
        <h2 className="text-2xl font-bold">Trail Run</h2>
        <FontAwesomeIcon icon={faCog} className="text-white text-xl" />
      </div>

      {/* Mapa */}
      {position && (
        <MapContainer center={position} zoom={13} className="h-64 mb-4 rounded-lg shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={DefaultIcon}>
            <Popup>Você está aqui</Popup>
          </Marker>
          <LocateControl /> {/* Adiciona o botão de localização no mapa */}
        </MapContainer>
      )}

      {/* Controles Principais e Métricas */}
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-between bg-gray-900 p-4 space-y-4">
        {!isFormVisible ? (
          <>
            {/* Métricas */}
            <div className="text-center text-white">
              <h3 className="text-lg">Tempo Percorrido: {Math.floor(elapsedTime / 60)}:{('0' + (elapsedTime % 60)).slice(-2)}</h3>
              <h3 className="text-lg">Distância Percorrida: {(totalDistance / 1000).toFixed(2)} km</h3>
              <h3 className="text-lg">Velocidade Média: {averageSpeed.toFixed(2)} km/h</h3>
            </div>

            {/* Controles Principais */}
            <div className="flex space-x-4">
              <button onClick={handleStart} className="bg-orange-600 p-4 rounded-full shadow-md text-white flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faPlay} className="text-2xl" />
              </button>
              <button onClick={handlePause} className="bg-yellow-600 p-4 rounded-full shadow-md text-white flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faPause} className="text-2xl" />
              </button>
              <button onClick={handleFinish} className="bg-red-600 p-4 rounded-full shadow-md text-white flex items-center justify-center w-16 h-16">
                <FontAwesomeIcon icon={faStop} className="text-2xl" />
              </button>
            </div>
          </>
        ) : (
          /* Formulário de Finalização */
          <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg">
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
                placeholder="Digite o nome da atividade"
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
                placeholder="Compartilhe detalhes da sua atividade"
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
                <option value="fácil">Fácil</option>
                <option value="moderada">Moderada</option>
                <option value="difícil">Difícil</option>
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

            <button type="submit" className="bg-orange-600 text-white p-3 rounded-full w-full hover:bg-orange-700">
              Salvar Atividade
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTrailPage;
