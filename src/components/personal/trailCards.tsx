"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Importando useRouter
import { FaShareAlt, FaStar, FaBookmark } from "react-icons/fa"; // Importando ícones

// Definindo a interface para os dados da trilha
interface Trail {
  id: string; // ID da trilha
  name: string; // Nome da trilha
  difficulty: string; // Dificuldade da trilha
  distance: number; // Distância da trilha
  author: string; // Nome do autor da trilha
  rating: number; // Nota da trilha
  photo: string; // Propriedade para a URL da imagem da trilha
}

export default function TrailCard({ trail }: { trail: Trail }) {
  const router = useRouter(); // Hook para manipular o roteamento

  const handleRedirect = () => {
    console.log("Redirecionando para:", `/trail/details/${trail.id}`);
    router.push(`/trail/details/${trail.id}`); // Redireciona para a página de detalhes da trilha
  };

  // Classificação fixa em 4.3
  const rating = 4.3;

  // Função para renderizar estrelas
  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating); // Estrelas preenchidas
    const totalStars = 5; // Total de estrelas a serem exibidas

    return (
      <>
        {Array.from({ length: filledStars }, (_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {Array.from({ length: totalStars - filledStars }, (_, index) => (
          <FaStar key={index + filledStars} className="text-gray-400" />
        ))}
      </>
    );
  };

  return (
    <main>
      <Card className="w-full max-h-[150px] rounded-2xl bg-[#FAFAF5] cursor-pointer" onClick={handleRedirect}>
        <div className="flex flex-row md:flex-row">
          <div className="w-40 h-[150px] relative overflow-hidden rounded-l-2xl">
            <Image 
              src={trail.photo} // A URL da imagem da trilha
              layout="fill" // Preenche o espaço disponível
              alt="Foto da trilha" 
              objectFit="cover" // Mantém a proporção da imagem
              priority // Carrega a imagem com prioridade
            />
          </div>
          <div className="flex flex-col w-full">
            <CardHeader>
              <CardTitle className="flex flex-row justify-between">
                <h1>{trail.name}</h1> {/* Nome da trilha */}
                <h1>{trail.difficulty}</h1> {/* Dificuldade */}
              </CardTitle>
              <CardDescription className="text-[#426B1F]">
                <strong>{trail.distance} Km</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full"> {/* Faz a área do conteúdo ocupar todo o espaço disponível */}
              <div className="flex flex-col mt-1">
                <p className="text-gray-500">{trail.author}</p> {/* Nome do autor */}
                <div className="flex items-center justify-between mt-1"> {/* Flex para alinhar as estrelas e os botões */}
                  <div className="flex items-center">
                    {renderStars(rating)} {/* Renderiza as estrelas fixas */}
                  </div>
                  <div className="flex space-x-2 ml-2"> {/* Espaçamento entre os botões */}
                    <button title="Bookmark" onClick={handleRedirect} className="text-blue-500">
                      <FaBookmark />
                    </button>
                    <button title="Compartilhar" onClick={handleRedirect}>
                      <FaShareAlt className="text-green-500" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </main>
  );
}
