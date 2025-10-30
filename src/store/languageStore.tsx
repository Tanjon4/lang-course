import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18next from "@/translations/i18next";

type SupportedLang = "en" | "fr" | "mg";

interface LangState {
  lang: SupportedLang;
  toggleLang: () => void;
  setLang: (newLang: SupportedLang) => void;
}

export const useLangStore = create(
  persist<LangState>(
    (set, get) => ({
      lang: "en",
      
      toggleLang: () => {
        const { lang } = get();
        const languages: SupportedLang[] = ["en", "fr", "mg"];
        const currentIndex = languages.indexOf(lang);
        const nextIndex = (currentIndex + 1) % languages.length;
        const newLang = languages[nextIndex];
        
        set({ lang: newLang });
        
        // S'assurer que document existe (côté client uniquement)
        if (typeof document !== 'undefined') {
          i18next.changeLanguage(newLang);
          document.documentElement.setAttribute('lang', newLang);
        }
      },
      
      setLang: (newLang: SupportedLang) => {
        set({ lang: newLang });
        
        if (typeof document !== 'undefined') {
          i18next.changeLanguage(newLang);
          document.documentElement.setAttribute('lang', newLang);
        }
      }
    }),
    {
      name: "lang-storage",
    }
  )
);

export default useLangStore;