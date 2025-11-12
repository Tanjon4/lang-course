'use client';
import React, { useState } from 'react';
import { Lock, CheckCircle, ArrowLeft, Sparkles, Languages, Shield, Key } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout/BaseLayout';
import { useTranslation } from 'react-i18next';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const decodedToken = decodeURIComponent(token);
  const lang = params.lang as string;
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
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
    setIsLoading(true);
    setError(null);

    if (password !== password2) {
      setError(t('formErrors_f.passwordsMismatch'));
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setError(t('formErrors_f.passwordTooWeak'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://lang-courses-api.onrender.com/api/users/reset-password/${decodedToken}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, password2 }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setError(data.error || t('errors_f.resetError'));
      }
    } catch (err) {
      setError(t('errors_f.networkError'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <br /> <br />
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* Section de confirmation - Côté gauche */}
            <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Languages className="h-8 w-8" />
                  </div>
                  <h1 className="text-2xl font-bold">LangCourses</h1>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-yellow-300" />
                    <h2 className="text-4xl font-bold">{t('success.title')}</h2>
                  </div>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    {t('success.description')}
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-indigo-100">{t('success.benefits.secure')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-indigo-100">{t('success.benefits.protected')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span className="text-indigo-100">{t('success.benefits.redirect')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-indigo-200 text-sm">
                    {t('success.quote.text')}<br />
                    <span className="italic">{t('success.quote.author')}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section de confirmation - Côté droit */}
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {t('success.resetSuccess')}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t('success.passwordChanged')}
                </p>
              </div>

              <div className="space-y-6 text-center">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-green-800 font-semibold">{t('success.accountSecure')}</p>
                      <p className="text-green-700 text-sm mt-1">
                        {t('success.accountProtected')}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {t('success.autoRedirect')}
                </p>

                <Link
                  href={`/${lang}/auth/login`}
                  className="inline-flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="font-semibold">{t('success.loginNow')}</span>
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
          <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Languages className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold">LangCourses</h1>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Key className="h-6 w-6 text-yellow-300" />
                  <h2 className="text-4xl font-bold">{t('form_f.title')}</h2>
                </div>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  {t('form_f.description')}
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('form_f.requirements.minLength')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('form_f.requirements.case')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-indigo-100">{t('form_f.requirements.special')}</span>
                  </div>
                </div>

                {/* Lien vers login */}
                <div className="text-center pt-4">
                  <p className="text-indigo-200">
                    {t('form_f.rememberPassword')}{' '}
                    <Link 
                      href={`/${lang}/auth/login`}
                      className="text-white font-semibold hover:text-yellow-200 transition-colors duration-300 inline-flex items-center space-x-1"
                    >
                      <span>{t('form_f.loginLink')}</span>
                      <span>→</span>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-indigo-200 text-sm">
                  {t('form_f.quote.text')}<br />
                  <span className="italic">{t('form_f.quote.author')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section formulaire - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('form_f.formTitle')}</h2>
              <p className="text-gray-600">{t('form_f.formSubtitle')}</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-800 font-medium text-center">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  {t('form_f.newPassword')}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder={t('form_f.newPasswordPlaceholder')}
                  />
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
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
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="password2" className="block text-sm font-semibold text-gray-700">
                  {t('form_f.confirmPassword')}
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
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                    placeholder={t('form_f.confirmPasswordPlaceholder')}
                  />
                </div>
                {password2 && password === password2 && passwordStrength >= 3 && (
                  <p className="text-sm text-green-600 font-medium mt-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>{t('formErrors_f.passwordsMatch')}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || passwordStrength < 3 || password !== password2}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <Key className="h-5 w-5" />
                <span className="font-semibold">
                  {isLoading ? t('form_f.resetting') : t('form_f.resetButton')}
                </span>
              </button>

              {/* Back to Login */}
              <div className="text-center pt-6">
                <Link 
                  href={`/${lang}/auth/login`}
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t('form_f.backToLogin')}</span>
                </Link>
              </div>
            </form>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">{t('security_f.tip')}</p>
                  <p className="text-sm text-blue-800 mt-1">
                    {t('security_f.advice')}
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