'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login avec email/password backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('https://lang-courses-api.onrender.com/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        console.log('Connexion réussie:', data);
        // router.push('/dashboard')
      } else {
        const err = await res.json();
        console.error('Erreur login:', err);
      }
    } catch (error) {
      console.error('Erreur login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login avec Google Firebase
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Firebase Google User:', user);

      // Alefa any backend raha mila JWT
      const token = await user.getIdToken();
      const res = await fetch('https://lang-courses-api.onrender.com/api/users/login/firebase/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        console.log('Login Google backend réussi:', data);
      } else {
        const err = await res.json();
        console.error('Erreur login Google backend:', err);
      }
    } catch (error) {
      console.error('Erreur login Google Firebase:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Connectez-vous à votre compte</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Votre mot de passe"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>{isLoading ? 'Connexion...' : 'Se connecter'}</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                </div>
              </div>

              {/* Google Firebase Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full  bg-gray-400 py-3 px-4 rounded-lg hover:bg-red-200 focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Se connecter avec Google</span>
              </button>

              {/* Register link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Pas de compte ?{' '}
                  <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                    S'inscrire
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
