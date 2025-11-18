// app/register/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, CheckCircle, Sparkles, Languages } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/BaseLayout';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const params = useParams();
  const lang = params.lang as string;
  const { t } = useTranslation();

  // Utilisation de useEffect pour calculer la force du mot de passe
  useEffect(() => {
    const checkPasswordStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      setPasswordStrength(strength);
    };

    if (formData.password) {
      checkPasswordStrength(formData.password);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
  };

  const getStrengthColor = (strength: number) => {
    const colors = [
      'bg-red-500', 
      'bg-orange-500', 
      'bg-yellow-500', 
      'bg-blue-500', 
      'bg-green-500'
    ];
    return colors[strength - 1] || 'bg-gray-300';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation supplémentaire
    if (!isFormValid) {
      alert(t('formErrors.correctErrors'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://lang-courses-api.onrender.com/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Inscription réussie');
        alert(t('registrationSuccess'));
        // router.push(`/${lang}/auth/login`);
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(`${t('errors.error')}: ${errorData.message || t('formErrors.checkInfo')}`);
      } else {
        const error = await response.json();
        console.error('Erreur d\'inscription:', error);
        alert(t('errors.registrationError'));
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      alert(t('errors.connectionError'));
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = passwordStrength >= 3 && 
                      formData.password === formData.password2 && 
                      formData.username.trim() !== '' && 
                      formData.email.trim() !== '';
  
  return (
    <Layout>
      <br /> <br />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          
          {/* Section de bienvenue - Côté gauche */}
          <div className="lg:w-1/2 bg-gradient-to-b from-gray-500 to-zinc-600 text-white p-12 flex flex-col justify-center">
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
                  <h2 className="text-4xl font-bold">{t('welcome_r.title')}</h2>
                </div>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  {t('welcome_r.description')}
                </p>
              </div>

              <div className="space-y-6 pt-8">
                {/* Avantages */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('benefits.personalized')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('benefits.progress')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('benefits.community')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('benefits.pace')}</span>
                  </div>
                </div>

                {/* Lien vers login */}
                <div className="text-center pt-4">
                  <p className="text-indigo-200">
                    {t('alreadyMember')}{' '}
                    <Link 
                      href={`/${lang}/auth/login`} 
                      className="text-white font-semibold hover:text-yellow-200 transition-colors duration-300 inline-flex items-center space-x-1"
                    >
                      <span>{t('loginLink')}</span>
                      <span>→</span>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-indigo-200 text-sm">
                  {t('quote.text')}<br />
                  <span className="italic">{t('quote.author')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section formulaire - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('form.title')}</h2>
              <p className="text-gray-700">{t('form.subtitle')}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                  {t('form.username')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder={t('form.usernamePlaceholder')}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  {t('form.email')}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  {t('form.password')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder={t('form.passwordPlaceholder')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{t('passwordStrength.title')}</span>
                      <span className={`text-sm font-semibold ${
                        passwordStrength <= 2 ? 'text-red-600' :
                        passwordStrength === 3 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {t(`passwordStrength.levels.${passwordStrength}`)}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength 
                              ? getStrengthColor(passwordStrength) 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {t('passwordStrength.requirements')}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="password2" className="block text-sm font-semibold text-gray-700">
                  {t('form.confirmPassword')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    value={formData.password2}
                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder={t('form.confirmPasswordPlaceholder')}
                  />
                </div>
                {formData.password2 && formData.password !== formData.password2 && (
                  <p className="text-sm text-red-600 font-medium mt-2 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{t('formErrors.passwordsMismatch')}</span>
                  </p>
                )}
                {formData.password2 && formData.password === formData.password2 && passwordStrength >= 3 && (
                  <p className="text-sm text-green-600 font-medium mt-2 flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>{t('formErrors.passwordsMatch')}</span>
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full bg-gradient-to-r from-gray-500 to-zinc-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-semibold">
                  {isLoading ? t('form.creatingAccount') : t('form.createAccount')}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}