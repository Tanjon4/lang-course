// app/[lang]/auth/email-verified/[token]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Mail, Sparkles, Languages, ArrowRight, Shield } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout/BaseLayout';
import { useTranslation } from 'react-i18next';

export default function EmailVerifiedPage() {
    const router = useRouter();
    const { token, lang } = useParams() as { token: string; lang: string };
    const decodedToken = decodeURIComponent(token);
    const { t } = useTranslation();

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
      let isMounted = true;

      const verifyEmail = async () => {
        try {
          const res = await fetch(
            `https://lang-courses-api.onrender.com/api/users/verify-email/${decodedToken}/`,
            { method: 'GET', headers: { 'Content-Type': 'application/json' } }
          );

          let data;
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            data = await res.json();
          } else {
            const text = await res.text();
            try { data = JSON.parse(text); } catch { data = { message: res.ok ? t('success_v.defaultMessage') : t('errors_v.generic', { status: res.status }) }; }
          }

          if (!isMounted) return;

          if (res.ok) {
            setStatus('success');
            setMessage(data.message || t('success_v.message'));
            setTimeout(() => router.push(`/${lang}/auth/login`), 3000);
          } else {
            setStatus('error');
            setMessage(data.error || data.message || t('errors_v.verificationError', { status: res.status }));
          }
        } catch (err) {
          if (!isMounted) return;
          console.error(err);
          setStatus('error');
          setMessage(t('errors_v.networkError'));
        }
      };

      if (token) verifyEmail();
      else {
        setStatus('error');
        setMessage(t('errors_v.missingToken'));
      }

      return () => { isMounted = false; };
    }, [decodedToken, router, lang, token, t]);

  if (status === 'loading') {
    return (
      <Layout>
        <br /> <br />
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* Section de chargement - Côté gauche */}
            <div className="lg:w-1/2 bg-gradient-to-br from-gray-500 to-zinc-600 text-white p-12 flex flex-col justify-center">
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
                    <h2 className="text-4xl font-bold">{t('loading_v.title')}</h2>
                  </div>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    {t('loading_v.description')}
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span className="text-indigo-100">{t('loading_v.steps.email')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span className="text-indigo-100">{t('loading_v.steps.activation')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span className="text-indigo-100">{t('loading_v.steps.preparation')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-indigo-200 text-sm">
                    {t('loading_v.quote.text')}<br />
                    <span className="italic">{t('loading_v.quote.author')}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section de chargement - Côté droit */}
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('loading_v.verification')}</h2>
                <p className="text-gray-600">{t('loading_v.validating')}</p>
              </div>

              <div className="space-y-6 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-blue-800 font-semibold">{t('loading_v.validationInProgress')}</p>
                      <p className="text-blue-700 text-sm mt-1">
                        {t('loading_v.pleaseWait')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex space-x-2 justify-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout>
        <br /> <br />
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* Section d'erreur - Côté gauche */}
            <div className="lg:w-1/2 bg-gradient-to-br from-red-600 to-orange-700 text-white p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Languages className="h-8 w-8" />
                  </div>
                  <h1 className="text-2xl font-bold">{t("cours_langue")}</h1>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-6 w-6 text-yellow-300" />
                    <h2 className="text-4xl font-bold">{t('error_v.title')}</h2>
                  </div>
                  <p className="text-red-100 text-lg leading-relaxed">
                    {t('error_v.description')}
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-yellow-300" />
                      <span className="text-red-100">{t('error_v.issues.expired')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-yellow-300" />
                      <span className="text-red-100">{t('error_v.issues.verification')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-yellow-300" />
                      <span className="text-red-100">{t('error_v.issues.newRequest')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-red-200 text-sm">
                    {t('error_v.quote.text')}<br />
                    <span className="italic">{t('error_v.quote.author')}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section d'erreur - Côté droit */}
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {t('error_v.verificationFailed')}
                </h2>
                <p className="text-gray-600">{message}</p>
              </div>

              <div className="space-y-6 text-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Shield className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-red-800 font-semibold">{t('error_v.actionRequired')}</p>
                      <p className="text-red-700 text-sm mt-1">
                        {t('error_v.newVerificationRequired')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    href={`/${lang}/auth/login`}
                    className="inline-flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-red-700 hover:to-orange-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ArrowRight className="h-5 w-5" />
                    <span className="font-semibold">{t('error_v.goToLogin')}</span>
                  </Link>

                  <Link
                    href={`/${lang}/auth/register`}
                    className="inline-flex items-center justify-center space-x-3 w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 border border-gray-300"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">{t('error_v.createNewAccount')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Success state
  return (
    <Layout>
      <br /> <br />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          
          {/* Section de succès - Côté gauche */}
          <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 text-white p-12 flex flex-col justify-center">
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
                  <h2 className="text-4xl font-bold">{t('success_v.title')}</h2>
                </div>
                <p className="text-green-100 text-lg leading-relaxed">
                  {t('success_v.description')}
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300" />
                    <span className="text-green-100">{t('success_v.benefits.emailVerified')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300" />
                    <span className="text-green-100">{t('success_v.benefits.accountActivated')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300" />
                    <span className="text-green-100">{t('success_v.benefits.fullAccess')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-green-200 text-sm">
                  {t('success_v.quote.text')}<br />
                  <span className="italic">{t('success_v.quote.author')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section de succès - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {t('success_v.emailVerified')}
              </h2>
              <p className="text-gray-600 text-lg">{message}</p>
            </div>

            <div className="space-y-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">{t('success_v.accountSecure')}</p>
                    <p className="text-green-700 text-sm mt-1">
                      {t('success_v.accountProtected')}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {t('success_v.autoRedirect')}
              </p>

              <Link
                href={`/${lang}/auth/login`}
                className="inline-flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="font-semibold">{t('success_v.startNow')}</span>
              </Link>

              <div className="pt-4">
                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}