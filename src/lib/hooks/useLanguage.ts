import { useLangStore } from '@/store/languageStore';
import { useTranslation } from 'react-i18next';

// Types correspondant à votre store
type SupportedLang = "en" | "fr" | "mg";

export function useLanguage() {
  const { lang, setLang, toggleLang } = useLangStore();
  const { t, i18n } = useTranslation();

  const changeLanguage = (newLang: string) => {
    // Convertir en SupportedLang avant de passer au store
    const validatedLang: SupportedLang = 
      (newLang === "en" || newLang === "fr" || newLang === "mg") 
        ? newLang 
        : "en";
    
    setLang(validatedLang);
  };

  const getLanguageName = (code: string) => {
    const names: { [key: string]: string } = {
      en: 'English',
      fr: 'Français', 
      mg: 'Malagasy'
    };
    return names[code] || code;
  };

  const getFlagEmoji = (code: string) => {
    const flags: { [key: string]: string } = {
      en: '🇬🇧',
      fr: '🇫🇷',
      mg: '🇲🇬'
    };
    return flags[code] || '🏳️';
  };

  return {
    // État
    lang,
    currentLanguage: {
      code: lang,
      name: getLanguageName(lang),
      flag: getFlagEmoji(lang)
    },
    
    // Actions
    setLang: changeLanguage,
    toggleLang,
    
    // i18next
    t,
    i18n,
    
    // Utilitaires
    languages: [
      { code: 'en' as SupportedLang, name: 'English', flag: '🇬🇧' },
      { code: 'fr' as SupportedLang, name: 'Français', flag: '🇫🇷' },
      { code: 'mg' as SupportedLang, name: 'Malagasy', flag: '🇲🇬' }
    ] as const
  };
}