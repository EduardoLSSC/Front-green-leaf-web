"use client";
import Link from "next/link";
import LogoutButton from "./logoutbutton"

export default function Header() {
    return (
        <header className="bg-[#2E4600] shadow-[0_4px_8px_rgba(139,69,19,0.5),0_6px_20px_rgba(139,69,19,0.3)] p-6 w-full border-b-2 border-[#8B4513] fixed top-0 left-0 z-50">
            <div className="flex justify-between items-center px-4">
                {/* Nome "Green Leaf Trail" com fonte Poppins */}
                <Link href="/home">
                    <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Green Leaf Trail
                    </h1>
                </Link>

                {/* Menu de navegação alinhado à direita */}
                <nav className="space-x-4 text-lg font-medium text-white flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Link href="/shopping" className="hover:text-[#BDB76B] transition duration-300">Shopping</Link>
                    <Link href="/news" className="hover:text-[#BDB76B] transition duration-300">Novidades</Link>
                    <Link href="/about" className="hover:text-[#BDB76B] transition duration-300">Quem somos?</Link>
                    <Link href="/profile" className="hover:text-[#BDB76B] transition duration-300">Perfil</Link>
                    <Link href="/mytrails" className="bg-[#4CBB17] text-white px-4 py-2 rounded-full hover:bg-[#6B8E23] transition duration-300">Trilhas</Link>
                    {/* Botão de logout usando o componente LogoutButton */}
                    <LogoutButton />
                </nav>
            </div>
        </header>
    );
}
