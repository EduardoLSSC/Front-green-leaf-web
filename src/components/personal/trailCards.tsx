"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShareAlt, FaStar, FaBookmark } from "react-icons/fa";

interface Trail {
  id: string;
  name: string;
  difficulty: string;
  distance: number;
  author: string;
  rating: number;
  photo: string;
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
    const distanceInKm = distanceInMeters / 1000;
    return `${distanceInKm.toFixed(2)} km`;
  };

  return (
    <main>
      <Card
        className="flex flex-row sm:flex-col lg:flex-row w-full max-h-[180px] rounded-xl bg-[#FAFAF5] cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
        onClick={handleRedirect}
      >
        {/* Imagem */}
        <div className="relative w-1/3 sm:w-full lg:w-32 h-[180px] sm:h-48 lg:h-[180px]">
          <Image
            src={trail.photo}
            alt="Foto da trilha"
            layout="fill"
            objectFit="cover"
            className="rounded-l-xl sm:rounded-t-xl sm:rounded-bl-none"
            priority
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col w-2/3 sm:w-full p-2">
          <CardHeader className="mb-0">
            <CardTitle className="flex flex-col">
              {/* Título maior */}
              <h1 className="text-xl font-semibold text-gray-800 truncate mb-2">
                {trail.name}
              </h1>
              {/* Dificuldade com espaçamento */}
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                {trail.difficulty}
              </span>
            </CardTitle>
            <CardDescription className="text-[#426B1F] text-xs mt-2">
              <strong>{formatDistance(trail.distance)}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col justify-between h-full">
            <div className="flex flex-col mt-auto space-y-1">
              <p className="text-gray-500 text-xs truncate">{trail.author}</p>
              <div className="flex items-center justify-between mt-1">
                {renderStars(rating)}
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
