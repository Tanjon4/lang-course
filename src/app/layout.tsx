// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "@/translations/i18next"; // ⚡ Initialisation i18next
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
    <html>
      <body className="bg-gray-50">
        <AuthProvider>
        

          {/* Main content */}
          <main>{children}</main>

          
        </AuthProvider>
      </body>
    </html>
  );
}