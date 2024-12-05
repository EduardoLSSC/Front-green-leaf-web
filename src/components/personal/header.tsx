"use client";
import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logoutbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-700 via-green-500 to-green-400 shadow-lg p-4 lg:p-6 w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-4 lg:px-8">
        {/* Nome "Green Leaf Trail" com estilo motivador */}
        <Link href="/home">
          <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-wide hover:text-yellow-300 transition-all duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Green Leaf Trail
          </h1>
        </Link>

        {/* Botão de menu para telas menores */}
        <button
          className="text-white text-3xl lg:hidden focus:outline-none transition-transform transform hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        {/* Menu de navegação */}
        <nav
          className={`lg:flex lg:space-x-6 text-lg font-semibold text-white items-center fixed top-0 left-0 h-full w-3/4 max-w-xs bg-green-600 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-auto lg:bg-transparent lg:max-w-none lg:h-auto`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 mt-24 lg:mt-0">
            <li>
              <Link href="/shopping" className="block text-center hover:text-yellow-300 transition-all duration-300">
                Shopping
              </Link>
            </li>
            <li>
              <Link href="/news" className="block text-center hover:text-yellow-300 transition-all duration-300">
                Novidades
              </Link>
            </li>
            <li>
              <Link href="/about" className="block text-center hover:text-yellow-300 transition-all duration-300">
                Quem somos?
              </Link>
            </li>
            <li>
              <Link href="/mytrails" className="block text-center bg-yellow-400 text-green-900 px-4 py-2 rounded-full hover:bg-yellow-300 hover:scale-105 transition-all duration-300">
                Minhas Trilhas
              </Link>
            </li>
            <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-100">
                <DropdownMenuItem>
                  <Link href="/profile" className="hover:text-green-600">
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer hover:text-green-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
