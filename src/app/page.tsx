// src/app/page.tsx
"use client";

import { useTranslation } from "react-i18next";
import "@/translations/i18next";
import useLanguageStore from "@/store/languageStore";
import { useEffect } from "react";
import i18n from "@/translations/i18next";
import HeroSection from "@/components/sections/HeroSection";
import About from "@/components/sections/About";
import { Header } from "@/components/layout/Header";
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
    <main className="min-h-screen ">
     
      
      
      <div className="container mx-auto px-4 py-8">
        {/* Section d'authentification */}
        {isAuthenticated ? (
          <div className="max-w-2xl mx-auto  p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {t('welcome')}, {user?.username}!
            </h1>
            <p className="text-gray-600 text-center mb-6">
              {t('welcomeMessage')}
            </p>
            <div className="flex justify-center">
              <a 
                href="/profile" 
                className="bg-primary-600 px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {t('viewProfile')}
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center mb-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <a 
                href="/login" 
                className="bg-primary-600 border border-primary-600  px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>{t('login')}</span>
              </a>
              <a 
                href="/register" 
                className="border border-primary-600  px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                {t('register')}
              </a>
            </div>
          </div>
        )}

        {/* Vos sections existantes */}
        <HeroSection />

        
        <About />

        {/* Section des fonctionnalités d'authentification */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('authFeatures')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('secureAuth')}</h3>
              <p className="text-gray-600">{t('secureAuthDesc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('socialLogin')}</h3>
              <p className="text-gray-600">{t('socialLoginDesc')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('emailVerification')}</h3>
              <p className="text-gray-600">{t('emailVerificationDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}