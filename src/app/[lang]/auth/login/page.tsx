'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Languages } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/BaseLayout';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string;
  const { login } = useAuth();
  const { t } = useTranslation();

  // ✅ Login avec email/password backend - UTILISE LE AUTHCONTEXT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Utilise la fonction login du AuthContext qui gère tout
      await login(formData);
      
      console.log('✅ Connexion réussie via AuthContext');
      // La redirection est gérée automatiquement dans le AuthContext
      
    } catch (error: any) {
      console.error('❌ Erreur login:', error);
      
      if (error.message && error.message.includes('401')) {
        alert(t('invalidCredentials'));
      } else {
        alert(`${t('loginError')} ${error.message || "Identifiants invalides"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Login avec Google Firebase
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Firebase Google User:', user);

      // ✅ Récupérez le token JWT de Firebase
      const token = await user.getIdToken();
      console.log('🔐 Firebase ID Token:', token ? 'Present' : 'Missing');
      
      // ✅ Essayez l'endpoint Firebase avec le bon format
      const res = await fetch('https://lang-courses-api.onrender.com/api/users/firebase/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id_token: token, // ✅ Le backend attend "id_token" (avec underscore)
          // Ou essayez aussi avec "token" si "id_token" ne marche pas
          token: token
        }),
      });
      
      console.log('📥 Google login response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('❌ Google login failed:', errorData);
        
        // ✅ Si l'endpoint Firebase ne marche pas, essayez l'endpoint standard
        if (res.status === 400 || res.status === 404) {
          console.log('🔄 Trying standard login with Google credentials...');
          await handleStandardLoginWithGoogle(user);
          return;
        }
        
        alert(`❌ ${t('loginError')}: ${errorData.error || errorData.detail || "Erreur serveur"}`);
        return;
      }

      // ✅ Parsez la réponse JSON
      const data = await res.json();
      console.log('✅ Google login successful:', data);
      
      // ✅ Stockez les tokens
      if (data.access && data.refresh) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        console.log('💾 Tokens stored for Google login');
        
        // ✅ Redirection automatique
        setTimeout(() => {
          window.location.href = `/${lang}/auth/profile`;
        }, 100);
        
        alert(t('googleSuccess'));
      } else {
        throw new Error('Tokens manquants dans la réponse');
      }
      
    } catch (error: any) {
      console.error('❌ Erreur login Google Firebase:', error);
      alert(t('googleLoginError'));
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fonction de fallback pour l'authentification standard
  const handleStandardLoginWithGoogle = async (user: any) => {
    try {
      console.log('🔄 Attempting standard login with Google user...');
      
      const res = await fetch('https://lang-courses-api.onrender.com/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: `google_${user.uid}`, // Mot de passe unique basé sur l'UID
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        console.log('✅ Standard login with Google successful');
        alert(t('loginSuccess'));
        
        setTimeout(() => {
          window.location.href = `/${lang}/auth/profile`;
        }, 100);
        
      } else {
        // Si le compte n'existe pas, proposez l'inscription
        if (res.status === 401) {
          const shouldRegister = confirm(
            `${t('accountNotFound')} ${user.email}. ${t('createAccountWithGoogle')}`
          );
          
          if (shouldRegister) {
            // Redirigez vers l'inscription
            router.push(`/${lang}/auth/register?email=${encodeURIComponent(user.email || '')}&name=${encodeURIComponent(user.displayName || '')}`);
          }
        } else {
          alert(`❌ Erreur: ${data.detail || data.message || "Connexion échouée"}`);
        }
      }
    } catch (error) {
      console.error('❌ Standard login with Google failed:', error);
      alert(t('googleLoginError'));
    }
  };

  return (
    <Layout>
      <br /> <br />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 mb-5">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          
          {/* Section de bienvenue - Côté gauche */}
          <div className="lg:w-1/2 bg-gradient-to-br from-zinc-600 to-gray-400 text-white p-12 flex flex-col justify-center">
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
                  <h2 className="text-4xl font-bold">{t('welcome')}</h2>
                </div>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  {t('welcomeMessage')}
                </p>
              </div>

              <div className="space-y-6 pt-8">
                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-4 px-6 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <span className="text-white font-medium">{t('continueWithGoogle')}</span>
                </button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <Link 
                    href={`/${lang}/auth/forgot-password`} 
                    className="text-indigo-200 hover:text-white transition-colors duration-300 text-sm font-medium inline-flex items-center space-x-1"
                  >
                    <Lock className="h-4 w-4" />
                    <span>{t('forgotPassword')}</span>
                  </Link>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-indigo-200 text-sm">
                  {t('charlemagneQuote')}<br />
                  <span className="italic">{t('charlemagne')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section formulaire - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('loginTitle')}</h2>
              <p className="text-gray-600">{t('loginSubtitle')}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  {t('emailLabel')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('emailPlaceholder')}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  {t('passwordLabel')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t('passwordPlaceholder')}
                    className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-400 to-zinc-600 text-white py-4 px-6 rounded-xl hover:from-amber-300 hover:to-orange-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-semibold">
                  {isLoading ? t('loggingIn') : t('loginButton')}
                </span>
              </button>

              {/* Register Link */}
              <div className="text-center pt-6">
                <p className="text-gray-600">
                  {t('noAccount')}{' '}
                  <Link 
                    href={`/${lang}/auth/register`}
                    className="font-semibold text-indigo-600 hover:text-orange-500 transition-colors duration-300 inline-flex items-center space-x-1"
                  >
                    <span>{t('createAccount')}</span>
                    <span>→</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}