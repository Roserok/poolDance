import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farfala | Pole Sport Academy",
  description: "Tu fuerza también puede tener alas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
