"use client"; // Marcado como client-side

import { SessionProvider } from "next-auth/react";
import Header from "@/components/personal/header";
import Footer from "@/components/personal/footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || ""; // Garantindo que pathname seja uma string vazia se for null

  // Lista de páginas onde o Header e o Footer não devem aparecer
  const noHeaderFooterRoutes = ["/", "/register"];

  // Verifica se a página atual está na lista
  const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);

  return (
    <>
      {/* Renderiza Header e Footer apenas se a rota não estiver na lista */}
      {!hideHeaderFooter && <Header />}
      <main className={`flex-grow ${!hideHeaderFooter ? 'mt-32' : ''}`}>
        {/* O SessionProvider precisa estar no client-side */}
        <SessionProvider>{children}</SessionProvider>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
