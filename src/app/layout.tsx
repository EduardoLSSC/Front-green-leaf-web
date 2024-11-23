import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

// Metadata unificada
export const metadata: Metadata = {
  title: "Green Leaf",
  description: "Descobrimento de trilhas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Importa a fonte Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col m-0 p-0"
        style={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Layout do cliente */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
