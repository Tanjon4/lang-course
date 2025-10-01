import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar"; // import Navbar (ao amin'ny src/app/components/Navbar.tsx)

// Metadata Next.js
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
      <body className="bg-gray-50 text-gray-900">
        {/* Navbar fixée en haut */}
        <Navbar />

        {/* Main content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="mt-20 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} E-Learn Platform 🌐 - Tous droits réservés
        </footer>
      </body>
    </html>
  );
}
