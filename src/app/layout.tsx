import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toastify from "@/shared/components/toastify/Toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drone",
  description: "A simple drone control panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toastify />
      </body>
    </html>
  );
}
