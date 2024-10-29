"use client";

import Image from 'next/image';
import logo from "@/assets/images/trilhaexemplo.jpg";
import { useState } from 'react';

// Componente de Estrelas (Avaliação)
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex space-x-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={rating >= star ? "green" : "none"}
          viewBox="0 0 24 24"
          stroke="green"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </div>
  );
};

// Página de Trilhas
const TrailPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto my-8">
        <h2 className="text-4xl font-bold text-center my-6">Long Life Trail</h2>

        <div className="mb-6">
          <Image
            src={logo}
            alt="Mapa da Trilha"
            width={400}
            height={400}
            className="w-full object-cover"
          />
        </div>

        {/* Ícones de Ação */}
        <div className="flex justify-center space-x-4 mb-8">
          <StarRating />
          <button className="flex flex-col items-center text-sm text-green-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
            <span>Detalhes</span>
          </button>
          <button className="flex flex-col items-center text-sm text-green-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4z" />
            </svg>
            <span>Mapa</span>
          </button>
          <button className="flex flex-col items-center text-sm text-green-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4z" />
            </svg>
            <span>Compartilhar</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TrailPage;