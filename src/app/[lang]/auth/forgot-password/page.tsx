// app/forgot-password/page.tsx
'use client';
import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, Sparkles, Languages, Shield } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/BaseLayout';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const params = useParams();
  const lang = params.lang as string;
  const {t} = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://lang-courses-api.onrender.com/api/users/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout >
        
        <br /> <br />
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* Section de confirmation - Côté gauche */}
            <div className="lg:w-1/2 bg-linear-to-br from-gray-400 to-zinc-600 text-white p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Languages className="h-8 w-8" />
                  </div>
                  <h1 className="text-2xl font-bold">{t("cours_langue")}</h1>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                    <h2 className="text-4xl font-bold">{t("securité")}</h2>
                  </div>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    {t("p1_securité")}
                    {t("p2_securité")}
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-indigo-100">{t("sp_securité")}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-indigo-100">{t("sp_heure")}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-indigo-100">{t("garatie")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-indigo-200 text-sm">
                    {t("citations")}<br />
                    <span className="italic">- Bruce Schneier</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section de confirmation - Côté droit */}
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {t("envoyé")}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t("p_renitialisation")}
                </p>
                <p className="text-indigo-600 font-semibold text-lg mt-2">
                  {email}
                </p>
              </div>

              <div className="space-y-6 text-center">
                <p className="text-gray-600 mb-6">
                  {t("p1_link")}
                  {t("p2_link")}
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 text-sm">{t("verify_spam")}
                    <strong>{t("conseil")}</strong> 
                    {t("si")}
                  </p>
                </div>

                <Link
                  href={`/${lang}/auth/login`}
                  className="inline-flex items-center justify-center space-x-3 w-full bg-linear-to-r from-gray-400 to-zinc-600 text-white py-4 px-6 rounded-xl hover:from-amber-400 hover:to-orange-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-semibold">{t("return_login")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
      </Layout>
    );
  }

  return (
    <Layout>
      <br /> <br />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          
          {/* Section de bienvenue - Côté gauche */}
          <div className="lg:w-1/2 bg-linear-to-br from-gray-400 to-zinc-600 text-white p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Languages className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold">{t("cours_langue")}</h1>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-yellow-300" />
                  <h2 className="text-4xl font-bold">{t("forgot_password")}</h2>
                </div>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  {t("p_text")}
                  {t("p1_text")}
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t("sp_link")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t("instruction")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t("acces_rappide")}</span>
                  </div>
                </div>

                {/* Lien vers login */}
                <div className="text-center pt-4">
                  <p className="text-indigo-200">
                    {t("souvenez_mdp")}{' '}
                    <Link 
                      href={`/${lang}/auth/login`} 
                      className="text-white font-semibold hover:text-yellow-200 transition-colors duration-300 inline-flex items-center space-x-1"
                    >
                      <span>{t("login")}</span>
                      <span>→</span>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-indigo-200 text-sm">
                  {t("citation2")}<br />
                  <span className="italic">- Proverbe informatique</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section formulaire - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("Réinitialisation")}</h2>
              <p className="text-gray-600">{t("enter_email")}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  {t("email_add")}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder="votre@email.com"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t("link_2")}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                <span className="font-semibold">
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </span>
              </button>

              {/* Back to Login */}
              <div className="text-center pt-6">
                <Link 
                  href={`/${lang}/auth/login`} 
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t("back_connex")}</span>
                </Link>
              </div>
            </form>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{t("security")}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t("duration")}
                    {t("duration1")}
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}