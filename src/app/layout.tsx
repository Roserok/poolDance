import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farfala | Pole Sport Academy",
  description: "Academia de pole sport, pole dance, baile y acondicionamiento físico en Tuluá. Clases presenciales y virtuales para empezar desde cero.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
