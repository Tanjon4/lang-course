// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import useLangStore from "../store/languageStore";

import translationFR from "./locales/fr/translations.json";
import translationEN from "./locales/en/translations.json";
import translationMG from "./locales/mg/translations.json";

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  mg: { translation: translationMG },
};


const langDefault = useLangStore.getState().lang;

const zustandDetector = {
  name: 'zustandDetector',
  lookup() {
    const { lang } = useLangStore.getState();
    return lang;
  },
  cacheUserLanguage(lang) {
    useLangStore.getState().setLang(lang);
  },
};

i18n
.use(LanguageDetector) // built-in detector (localStorage, browser, etc.)
  .use({
    type: 'languageDetector',
    async: false,
    detect: zustandDetector.lookup,
    init: () => {},
    cacheUserLanguage: zustandDetector.cacheUserLanguage,
  })
.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
