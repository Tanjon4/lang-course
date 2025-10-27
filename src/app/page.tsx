// src/app/page.tsx
"use client";

import { useTranslation } from "react-i18next";
import "@/translations/i18next";
import useLanguageStore from "@/store/languageStore";
import { useEffect } from "react";
import i18n from "@/translations/i18next";
import HeroSection from "@/components/sections/HeroSection";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/app/contexts/AuthContext";


export default function Home() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const { isAuthenticated, user } = useAuth();

  // Raha ovaina ny lang dia miova koa ny i18next
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      {/* Hero Section avec les boutons d'authentification intégrés */}
      <Navbar />
      <HeroSection />
      
      
      <div className="container mx-auto px-4 py-8">
        {/* Section de bienvenue personnalisée (optionnelle - peut être supprimée si redondante) */}
        {isAuthenticated && (
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/60 mb-16 transform transition-all duration-300 hover:shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-4">
                {t('welcome')}, {user?.username}!
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t('welcomeMessage')}
              </p>
              <div className="flex justify-center">
                <a 
                  href="/profile" 
                  className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold transform hover:-translate-y-1 flex items-center space-x-3"
                >
                  <span>{t('viewProfile')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Section About */}
        <About />

        <Contact/>

        {/* Section des fonctionnalités d'authentification */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent mb-4">
              {t('authFeatures')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('discoverOurSecureFeatures')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: t('secureAuth'),
                description: t('secureAuthDesc')
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                title: t('socialLogin'),
                description: t('socialLoginDesc')
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: t('emailVerification'),
                description: t('emailVerificationDesc')
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section d'appel à l'action supplémentaire pour les non-authentifiés */}
        {!isAuthenticated && (
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('readyToGetStarted')}
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                {t('joinThousands')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold transform hover:-translate-y-1 hover:shadow-lg"
                >
                  {t('getStartedNow')}
                </a>
                <a 
                  href="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-300 font-semibold transform hover:-translate-y-1"
                >
                  {t('learnMore')}
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}