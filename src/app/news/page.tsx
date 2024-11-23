"use client";

import Link from "next/link";

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-white mb-12">Novidades</h1>

        <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">As últimas do Green Leaf Trail!</h2>
          <p className="text-lg mb-6">
            Descubra o que há de novo no universo do <strong>Green Leaf Trail</strong>! Estamos trazendo novidades incríveis para tornar suas aventuras ainda mais emocionantes:
          </p>
          <ul className="list-disc ml-6 space-y-4 text-lg">
            <li><strong>🌲 Novas trilhas desafiadoras:</strong> Experimente novos cenários e eleve seu espírito aventureiro.</li>
            <li><strong>📱 Tecnologia nas trilhas:</strong> Use o aplicativo para explorar em realidade aumentada e identificar fauna e flora.</li>
            <li><strong>🧑‍🤝‍🧑 Comunidade ativa:</strong> Participe de eventos e conheça novos amigos amantes da natureza.</li>
            <li><strong>💚 Recompensas por exploração:</strong> Acumule pontos e desbloqueie descontos exclusivos na nossa loja.</li>
          </ul>
          <p className="text-lg mt-6">
            Este é apenas o começo de uma jornada emocionante! Continue explorando e ajude-nos a construir um futuro mais verde.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-2xl font-bold text-center text-white">"A aventura nunca para! Desbrave mais e compartilhe momentos."</h3>
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

export default NewsPage;
