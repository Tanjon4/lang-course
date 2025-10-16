// app/forgot-password/page.tsx
'use client';
import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Email envoyé !
              </h2>
              <p className="text-gray-600 mb-6">
                Un lien de réinitialisation a été envoyé à {email}. 
                Vérifiez votre boîte de réception.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-500 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à la connexion</span>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Mot de passe oublié
              </h2>
              <p className="text-gray-600">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Envoi...' : 'Envoyer le lien'}
              </button>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="inline-flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour à la connexion</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}