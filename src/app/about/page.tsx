"use client";

import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-white mb-12">Sobre o Green Leaf Trail</h1>

        <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">Nosso Propósito</h2>
          <p className="text-lg mb-6">
            O <strong>Green Leaf Trail</strong> é mais do que um aplicativo de trilhas. É uma ponte entre o homem e a natureza, nascido da paixão pela preservação ambiental e da vontade de explorar o mundo. Criado em parceria com biólogos e ambientalistas, o projeto busca unir conhecimento, aventura e tecnologia.
          </p>
          <h2 className="text-3xl font-semibold text-green-700 mb-6">O que oferecemos?</h2>
          <ul className="list-disc ml-6 space-y-4 text-lg">
            <li><strong>📚 Educação Ambiental:</strong> Aprenda sobre ecossistemas enquanto explora trilhas.</li>
            <li><strong>🗺️ Trilhas personalizadas:</strong> Escolha trilhas baseadas no seu nível de experiência.</li>
            <li><strong>🌍 Impacto positivo:</strong> Ajude na preservação das trilhas compartilhando suas descobertas.</li>
            <li><strong>📈 Estatísticas:</strong> Acompanhe seu progresso e veja o impacto da sua jornada.</li>
          </ul>
          <p className="text-lg mt-6">
            Nosso objetivo é formar uma comunidade que celebra a natureza e trabalha junta para sua preservação. Seja você um aventureiro iniciante ou experiente, o Green Leaf Trail está aqui para inspirar sua próxima jornada.
          </p>
        </div>

        <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">Fale Conosco</h2>
          <p className="text-lg">
            📧 Email: <strong>contato@greenleaftrail.com</strong>
          </p>
          <p className="text-lg">
            📞 Telefone: <strong>(11) 1234-5678</strong>
          </p>
          <p className="text-lg">
            📍 Endereço: <strong>Rua das Trilhas, 123, São Paulo, SP</strong>
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-2xl font-bold text-center text-white">"Venha fazer parte de uma jornada para explorar e preservar."</h3>
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

export default AboutPage;
