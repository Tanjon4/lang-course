// app/email-verified/[token]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Mail, Sparkles, Languages, ArrowRight, Shield } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout/BaseLayout';

export default function EmailVerifiedPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const lang = params.lang as string;

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`https://lang-courses-api.onrender.com/api/users/verify-email/${token}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Votre email a été vérifié avec succès !');
          // Redirection automatique après 3 secondes
          setTimeout(() => router.push(`/${lang}/auth/login`), 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Erreur lors de la vérification de l\'email');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Erreur réseau. Veuillez réessayer.');
        console.error(err);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, router]);

  if (status === 'loading') {
    return (
      <Layout>
        <br /> <br />
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
            
            {/* Section de chargement - Côté gauche */}
            <div className="lg:w-1/2 bg-linear-to-br from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center">
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
                    <h2 className="text-4xl font-bold">Vérification en cours</h2>
                  </div>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    Nous vérifions votre adresse email pour sécuriser votre compte. 
                        Cette opération ne prendra que quelques instants.
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span className="text-indigo-100">Vérification de l'email</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span className="text-indigo-100">Activation du compte</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      <span className="text-indigo-100">Préparation de votre espace</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-indigo-200 text-sm">
                    "La patience est la clé de la réussite."<br />
                    <span className="italic">- Proverbe</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section de chargement - Côté droit */}
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Vérification</h2>
                <p className="text-gray-600">Nous validons votre adresse email...</p>
              </div>

              <div className="space-y-6 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-blue-800 font-semibold">Validation en cours</p>
                      <p className="text-blue-700 text-sm mt-1">
                        Veuillez patienter pendant que nous vérifions votre email
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
            <div className="lg:w-1/2 bg-linear-to-br from-red-600 to-orange-700 text-white p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Languages className="h-8 w-8" />
                  </div>
                  <h1 className="text-2xl font-bold">LangCourses</h1>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-6 w-6 text-yellow-300" />
                    <h2 className="text-4xl font-bold">Oups !</h2>
                  </div>
                  <p className="text-red-100 text-lg leading-relaxed">
                    Nous n'avons pas pu vérifier votre adresse email. 
                    Le lien peut être expiré ou invalide.
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-yellow-300" />
                      <span className="text-red-100">Lien expiré ou invalide</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-yellow-300" />
                      <span className="text-red-100">Erreur de vérification</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-yellow-300" />
                      <span className="text-red-100">Nécessite une nouvelle demande</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-red-200 text-sm">
                    "L'erreur est humaine, mais la persévérance est divine."<br />
                    <span className="italic">- Proverbe</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section d'erreur - Côté droit */}
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Échec de la vérification
                </h2>
                <p className="text-gray-600">{message}</p>
              </div>

              <div className="space-y-6 text-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Shield className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-red-800 font-semibold">Action requise</p>
                      <p className="text-red-700 text-sm mt-1">
                        Vous devez demander un nouveau lien de vérification
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    href={`/${lang}/auth/login`}
                    className="inline-flex items-center justify-center space-x-3 w-full bg-linear-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-red-700 hover:to-orange-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ArrowRight className="h-5 w-5" />
                    <span className="font-semibold">Aller à la connexion</span>
                  </Link>

                  <Link
                    href={`/${lang}/auth/register`}
                    className="inline-flex items-center justify-center space-x-3 w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 border border-gray-300"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">Créer un nouveau compte</span>
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
          <div className="lg:w-1/2 bg-linear-to-br from-green-600 to-emerald-700 text-white p-12 flex flex-col justify-center">
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
                  <h2 className="text-4xl font-bold">Félicitations !</h2>
                </div>
                <p className="text-green-100 text-lg leading-relaxed">
                  Votre compte est maintenant activé et sécurisé. 
                  Vous pouvez commencer votre voyage linguistique dès maintenant !
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300" />
                    <span className="text-green-100">Email vérifié avec succès</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300" />
                    <span className="text-green-100">Compte entièrement activé</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300" />
                    <span className="text-green-100">Accès à toutes les fonctionnalités</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-green-200 text-sm">
                  "Le savoir des langues est la porte de la sagesse."<br />
                  <span className="italic">- Roger Bacon</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section de succès - Côté droit */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Email vérifié !
              </h2>
              <p className="text-gray-600 text-lg">{message}</p>
            </div>

            <div className="space-y-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">Compte sécurisé</p>
                    <p className="text-green-700 text-sm mt-1">
                      Votre compte est maintenant vérifié et protégé
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Vous serez redirigé automatiquement vers la page de connexion dans quelques secondes.
              </p>

              <Link
                href={`/${lang}/auth/login`}
                className="inline-flex items-center justify-center space-x-3 w-full bg-linear-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="font-semibold">Commencer maintenant</span>
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