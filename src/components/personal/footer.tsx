"use client";
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna de Redes Sociais */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-bold">Siga-nos</h3>
          <div className="flex space-x-6">
            <FaLinkedin className="hover:text-yellow-300 cursor-pointer transition-transform transform hover:scale-110" size={28} />
            <FaInstagram className="hover:text-yellow-300 cursor-pointer transition-transform transform hover:scale-110" size={28} />
            <FaWhatsapp className="hover:text-yellow-300 cursor-pointer transition-transform transform hover:scale-110" size={28} />
            <FaFacebook className="hover:text-yellow-300 cursor-pointer transition-transform transform hover:scale-110" size={28} />
          </div>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 hover:text-yellow-300 transition-all duration-300 cursor-pointer">
              <FaApple size={28} />
              <span>App Store</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-yellow-300 transition-all duration-300 cursor-pointer">
              <FaGooglePlay size={28} />
              <span>Google Play</span>
            </div>
          </div>
        </div>

        {/* Coluna de Serviços */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">Serviços</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/premium"
                className="hover:text-yellow-300 transition-all duration-300"
              >
                Adquira o Premium
              </Link>
            </li>
            <li>
              <Link
                href="/promote-trails"
                className="hover:text-yellow-300 transition-all duration-300"
              >
                Promova suas trilhas
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna de Explorar Trilhas */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">Explorar Trilhas</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:text-yellow-300 transition-all duration-300"
              >
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="hover:text-yellow-300 transition-all duration-300"
              >
                Central de ajuda
              </Link>
            </li>
            <li>
              <Link
                href="/donations"
                className="hover:text-yellow-300 transition-all duration-300"
              >
                Doadores
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-sm">
        <p>&copy; {new Date().getFullYear()} Green Leaf Trail. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
