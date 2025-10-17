"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationFR from "./locales/fr/translations.json";
import translationEN from "./locales/en/translations.json";
import translationMG from "./locales/mg/translations.json";

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  mg: { translation: translationMG },
};

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "fr", "mg"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18next; // 👈 zava-dehibe: export default ilay instance marina
