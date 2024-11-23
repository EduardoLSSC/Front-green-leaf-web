"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importando useRouter
import { FaShareAlt, FaStar, FaBookmark } from "react-icons/fa"; // Importando ícones

interface Trail {
  id: string; // ID da trilha
  name: string; // Nome da trilha
  difficulty: string; // Dificuldade da trilha
  distance: number; // Distância da trilha (em metros)
  author: string; // Nome do autor da trilha
  rating: number; // Nota da trilha
  photo: string; // Propriedade para a URL da imagem da trilha
}

export default function TrailCard({ trail }: { trail: Trail }) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/trail/details/${trail.id}`);
  };

  const rating = 4.3;

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const totalStars = 5;

    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: filledStars }, (_, index) => (
          <FaStar key={index} className="text-yellow-500 text-xs" />
        ))}
        {Array.from({ length: totalStars - filledStars }, (_, index) => (
          <FaStar key={index + filledStars} className="text-gray-400 text-xs" />
        ))}
      </div>
    );
  };

  const formatDistance = (distanceInMeters: number): string => {
    const distanceInKm = distanceInMeters / 1000; // Converte para km
    return `${distanceInKm.toFixed(2)} km`; // Retorna com duas casas decimais
  };

  return (
    <main>
      <Card
        className="flex flex-row sm:flex-col lg:flex-row w-full max-h-[220px] rounded-2xl bg-[#FAFAF5] cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
        onClick={handleRedirect}
      >
        {/* Imagem ajustada */}
        <div className="relative w-1/3 sm:w-full lg:w-40 h-[220px] sm:h-60 lg:h-[220px]">
          <Image
            src={trail.photo}
            alt="Foto da trilha"
            layout="fill" // Faz a imagem preencher a área
            objectFit="cover" // Ajusta a imagem proporcionalmente
            className="rounded-l-2xl sm:rounded-t-2xl sm:rounded-bl-none"
            priority
          />
        </div>

        {/* Conteúdo do card */}
        <div className="flex flex-col w-2/3 sm:w-full p-3">
          <CardHeader className="mb-1">
            <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h1 className="text-sm font-semibold text-gray-800 truncate mt-[-10px]">
                {trail.name}
              </h1>
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                {trail.difficulty}
              </span>
            </CardTitle>
            <CardDescription className="text-[#426B1F] text-xs mt-2">
              <strong>{formatDistance(trail.distance)}</strong> {/* Distância formatada */}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col justify-between h-full">
            <div className="flex flex-col mt-auto space-y-1">
              {/* Nome da pessoa */}
              <p className="text-gray-500 text-xs truncate">{trail.author}</p> {/* Fonte menor */}
              <div className="flex items-center justify-between mt-1">
                {/* Estrelas */}
                {renderStars(rating)}
                {/* Botões */}
                <div className="flex space-x-2">
                  <button
                    title="Bookmark"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    <FaBookmark />
                  </button>
                  <button
                    title="Compartilhar"
                    onClick={(e) => e.stopPropagation()}
                    className="text-green-500 hover:text-green-600 text-sm"
                  >
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}
