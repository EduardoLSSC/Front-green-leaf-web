"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importando o componente Image

const ShoppingPage = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Mochila de Aventura",
      price: 120.0,
      description: "Mochila resistente e espaçosa para longas trilhas.",
      image: "/images/mochila.jpg", // Caminho relativo ao diretório public
    },
    {
      id: 2,
      name: "Bota de Caminhada",
      price: 250.0,
      description: "Bota confortável e impermeável para terrenos difíceis.",
      image: "/images/bota.jpg",
    },
    {
      id: 3,
      name: "Camiseta de Trilha",
      price: 45.0,
      description: "Camiseta leve e respirável para trilhas intensas.",
      image: "/images/camiseta.jpg",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center text-white mb-12">
          Loja Green Leaf Trail
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative h-56 mb-6 rounded-xl overflow-hidden">
                {/* Usando o componente Image do Next.js */}
                <Image
                  src={product.image} // Caminho vindo do array
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                  width={300} // Define a largura
                  height={300} // Define a altura
                />
              </div>
              <h4 className="text-xl font-semibold text-green-700">{product.name}</h4>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              <p className="text-lg font-bold text-green-700 mt-4">
                R${product.price.toFixed(2)}
              </p>
              <Link href={`/shopping/${product.id}`} passHref>
                <button className="w-full bg-green-600 text-white py-2 mt-4 rounded-full hover:bg-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                  Comprar
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/home" passHref>
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300">
              Voltar para a Página Inicial
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
