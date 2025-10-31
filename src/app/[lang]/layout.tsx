import { ReactNode } from 'react';
import type { Metadata } from 'next';
import ClientInitializer from '@/components/i18n/ClientInitializer';
import { AuthProvider } from '../contexts/AuthContext';

interface LangLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

// Métadonnées dynamiques basées sur la langue
export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const { lng } = params;
  
  const titles = {
    fr: 'Mon Application',
    en: 'My Application', 
    mg: 'Ny My Application'
  };

  return {
    title: titles[lng as keyof typeof titles] || titles.fr,
    description: 'Application d\'apprentissage de langues'
  };
}

export default function LangLayout({
  children,
  params: { lng }
}: LangLayoutProps) {
  return (
    <html lang={lng} dir={lng === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Vous pouvez ajouter des balises meta supplémentaires ici */}
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          <ClientInitializer >
            {children}
          </ClientInitializer>
        </AuthProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return ['fr', 'en', 'mg'].map((lng) => ({ lng }));
}

export const dynamicParams = true;