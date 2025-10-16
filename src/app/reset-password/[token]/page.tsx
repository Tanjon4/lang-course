'use client';
import React, { useState } from 'react';
import { Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://lang-courses-api.onrender.com/api/users/reset-password/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, password2 }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Redirection automatique après 2 secondes
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(data.error || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur réseau. Réessayez.');
      console.error(err);
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
                Mot de passe réinitialisé !
              </h2>
              <p className="text-gray-600 mb-6">
                Votre mot de passe a été modifié avec succès.
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
                Réinitialiser le mot de passe
              </h2>
              <p className="text-gray-600">
                Entrez votre nouveau mot de passe pour continuer
              </p>
            </div>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
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
