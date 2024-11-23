"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { fetchTrail } from "@/app/api/trailApi";
import { Trail } from "../../../../interfaces/Trails";

// Importação dinâmica do mapa
const TrailMap = dynamic(() => import("@/components/ui/TrailMap"), { ssr: false });

const TrailPage = () => {
  const { id } = useParams();
  const { data: session, status } = useSession(); // Obtém a sessão do usuário logado
  const [trail, setTrail] = useState<Trail | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTrailData = async () => {
      if (!id) return;

      try {
        // Buscar detalhes da trilha
        const trailData = await fetchTrail(Number(id));
        setTrail(trailData);

        // Buscar comentários da trilha
        const response = await fetch(`/api/trail-comments/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar comentários.");
        }

        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Erro ao buscar trilha ou comentários:", error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchTrailData();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Verifica se a sessão está carregada e se o usuário está logado
      if (!session?.user?.id) {
        console.error("Usuário não autenticado.");
        return;
      }

      const response = await fetch(`/api/trail-comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trail_id: Number(id),
          user_id: session.user.id, // Agora o ID do usuário autenticado é usado
          comment: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar comentário.");
      }

      const createdComment = await response.json();

      // Atualizar os comentários com o novo
      setComments((prev) => [...prev, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
        <p className="text-lg">Carregando sessão...</p>
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
        <p className="text-lg">Carregando detalhes da trilha...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Nome da Trilha */}
        <h1 className="text-4xl font-bold text-center mb-6">{trail.name}</h1>

        {/* Informações da Trilha */}
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-lg">
              <span className="font-bold text-green-700">Distância:</span>{" "}
              {(trail.distance / 1000).toFixed(2)} km
            </p>
            <p className="text-lg">
              <span className="font-bold text-green-700">Dificuldade:</span> {trail.difficulty}
            </p>
            <p className="text-lg">
              <span className="font-bold text-green-700">Descrição:</span> {trail.description}
            </p>
            <p className="text-lg">
              <span className="font-bold text-green-700">Localização:</span> {trail.location}
            </p>
          </div>
        </div>

        {/* Mapa da Trilha */}
        {trail.path?.coordinates ? (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
            <TrailMap path={trail.path.coordinates} className="h-[400px] w-full" />
          </div>
        ) : (
          <p className="text-center text-white">Sem dados de rota disponíveis para esta trilha.</p>
        )}

        {/* Comentários */}
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Comentários</h2>
          {isLoadingComments ? (
            <p className="text-center text-gray-600">Carregando comentários...</p>
          ) : comments.length > 0 ? (
            <ul className="space-y-6">
              {comments.map((comment, index) => (
                <li key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 text-green-800 font-bold w-10 h-10 flex items-center justify-center rounded-full">
                      {comment.user?.firstName?.[0] || "A"}
                    </div>
                    <p className="font-bold text-green-700">
                      {comment.user?.firstName || "Anônimo"}
                    </p>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">Nenhum comentário encontrado.</p>
          )}

          {/* Adicionar novo comentário */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-green-700 mb-4">Adicione um comentário:</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário aqui..."
              className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmitComment}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg disabled:opacity-50 transition-all"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
