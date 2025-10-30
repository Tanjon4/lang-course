'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { I18nextProvider } from 'react-i18next';
import i18next from '@/translations/i18next';
import { useLangStore } from '@/store/languageStore';

interface ClientInitializerProps {
  children: React.ReactNode;
}

type SupportedLang = "en" | "fr" | "mg";
const SUPPORTED_LANGS: SupportedLang[] = ["en", "fr", "mg"];

const isValidLang = (lang: string): lang is SupportedLang => {
  return SUPPORTED_LANGS.includes(lang as SupportedLang);
};

export default function ClientInitializer({ children }: ClientInitializerProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { setLang } = useLangStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Attendre l'initialisation de i18next
        if (!i18next.isInitialized) {
          await i18next.init();
        }

        // Déterminer la langue cible
        const urlLang = params.lng as string;
        let targetLang: SupportedLang = "en"; // Fallback

        if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
          targetLang = urlLang as SupportedLang;
        } else {
          // Utiliser la langue détectée par i18next
          const detectedLang = i18next.language;
          if (detectedLang && SUPPORTED_LANGS.includes(detectedLang as SupportedLang)) {
            targetLang = detectedLang as SupportedLang;
          }
        }

        // Appliquer la langue
        await i18next.changeLanguage(targetLang);
        setLang(targetLang);

        // Rediriger si l'URL est incorrecte
        if (!urlLang || urlLang !== targetLang) {
          const basePath = pathname.replace(/^\/(en|fr|mg)/, '') || '';
          const newPath = `/${targetLang}${basePath}`;
          
          if (newPath !== pathname) {
            router.replace(newPath);
          }
        }

        setIsReady(true);
      } catch (error) {
        console.error('Erreur initialisation langue:', error);
        setIsReady(true); // Continuer malgré l'erreur
      }
    };

    initializeLanguage();
  }, [params.lng, pathname, router, setLang]);

  // Synchronisation bidirectionnelle - CORRIGÉ
  useEffect(() => {
    // Écouter les changements du store Zustand
    const unsubscribe = useLangStore.subscribe((state) => {
      const newLang = state.lang;
      // Synchroniser i18next avec le store
      if (i18next.language !== newLang) {
        i18next.changeLanguage(newLang);
      }
    });

    // Écouter les changements de i18next
    const handleI18nChange = (lng: string) => {
      if (SUPPORTED_LANGS.includes(lng as SupportedLang)) {
        const storeLang = useLangStore.getState().lang;
        if (storeLang !== lng) {
          useLangStore.getState().setLang(lng as SupportedLang);
        }
      }
    };

    i18next.on('languageChanged', handleI18nChange);

    return () => {
      unsubscribe();
      i18next.off('languageChanged', handleI18nChange);
    };
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500 text-xs">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}