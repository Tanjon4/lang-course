// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import FooterPage from "../components/layout/Footer";
import { AuthProvider } from '@/app/contexts/AuthContext'

export const metadata: Metadata = {
  title: "E-Learn Platform",
  description: "Plateforme e-learning multi-langue (FR/EN/MG)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <AuthProvider>
          {/* Navbar fixée en haut */}
          {/* <Navbar /> */}

          {/* Main content */}
          <main className="pt-3 min-h-screen">{children}</main>

          {/* Footer */}
          {/* <FooterPage /> */}
        </AuthProvider>
      </body>
    </html>
  );
}