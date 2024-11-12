"use client";
import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logoutbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./themeToggle";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-[#2E4600] shadow-[0_4px_8px_rgba(139,69,19,0.5),0_6px_20px_rgba(139,69,19,0.3)] p-4 lg:p-6 w-full border-b-2 border-[#8B4513] fixed top-0 left-0 z-50
        dark:bg-dark">
            <div className="flex justify-between items-center px-4 lg:px-8">
                {/* Nome "Green Leaf Trail" com fonte Poppins */}
                <Link href="/home">
                    <h1 className="text-2xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Green Leaf Trail
                    </h1>
                </Link>

                {/* Botão de menu para telas menores */}
                <button
                    className="text-white text-2xl lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                {/* Menu de navegação */}
                <nav className={`lg:flex lg:space-x-4 text-lg font-medium text-white items-center ${isMenuOpen ? 'block' : 'hidden'} lg:block`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Link href="/shopping" className="block lg:inline hover:text-[#BDB76B] transition duration-300 py-2 lg:py-0">Shopping</Link>
                    <Link href="/news" className="block lg:inline hover:text-[#BDB76B] transition duration-300 py-2 lg:py-0">Novidades</Link>
                    <Link href="/about" className="block lg:inline hover:text-[#BDB76B] transition duration-300 py-2 lg:py-0">Quem somos?</Link>
                    <Link href="/profile" className="block lg:inline hover:text-[#BDB76B] transition duration-300 py-2 lg:py-0">Perfil</Link>
                    <Link href="/mytrails" className="block lg:inline bg-[#4CBB17] text-white px-4 py-2 rounded-full hover:bg-[#6B8E23] transition duration-300 my-2 lg:my-0">Trilhas</Link>
                    <ThemeToggle/>
                    <LogoutButton />
                </nav>
            </div>
        </header>
    );
}
