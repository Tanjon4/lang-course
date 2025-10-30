import { ReactNode } from 'react';
import ClientInitializer from '@/components/i18n/ClientInitializer';

interface LangLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

export default function LangLayout({
  children,
  params: { lng }
}: LangLayoutProps) {
  return (
    <ClientInitializer>
      {children}
    </ClientInitializer>
  );
}

export async function generateStaticParams() {
  return ['fr', 'en', 'mg'].map((lng) => ({ lng }));
}

export const dynamicParams = true;