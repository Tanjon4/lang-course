"use client";

import { useTranslation } from "react-i18next";
import "@/translations/i18next"; // antsoina ny config
import HeroSection from "@/components/sections/HeroSection";
import useLanguageStore from "@/store/languageStore";
import { useEffect } from "react";
import i18n from "@/translations/i18next";

export default function Home() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  // Raha ovaina ny lang dia miova koa ny i18next
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <main className="p-6">
      <HeroSection />
    </main>
  );
}