// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Green Leaf",
//   description: "Descobrimento de trilhas",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="pt-BR">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Passa o layout do cliente aqui */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

