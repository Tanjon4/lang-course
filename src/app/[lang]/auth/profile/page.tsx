'use client';
import React, { useEffect } from 'react';
import { User as UserIcon, Mail, Shield, Calendar, Edit, Star, Settings } from 'lucide-react';
import Layout from '@/components/layout/BaseLayout';
import { useAuth } from '@/app/contexts/AuthContext'
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const params = useParams();
  const lang = params.lng ;

  // Debug
  useEffect(() => {
    console.log('Profile Page - User:', user);
    console.log('Profile Page - isAuthenticated:', isAuthenticated);
    console.log('Profile Page - Loading:', loading);
  }, [user, isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-200"></div>
          <p className="text-amber-500 font-medium">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 border border-orange-100">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès requis</h2>
            <p className="text-gray-600 mb-6">Connectez-vous pour accéder à votre profil</p>
            <a 
              href="/auth/login"
              className="bg-gradient-to-r from-orange-200 to-amber-300 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium inline-block"
            >
              Se connecter
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <br /><br />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête du profil amélioré */}
          <div className="relative bg-gradient-to-r from-gray-200 to-zinc-500 rounded-3xl shadow-2xl overflow-hidden mb-8 border border-orange-300">
            {/* Effets décoratifs */}
            <div className="absolute inset-0 bg-orange-100/60"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-100 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative px-8 py-12 text-amber-500">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="h-28 w-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-lg">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.username}
                          className="h-24 w-24 rounded-full object-cover border-2 border-orange-400 shadow-md"
                        />
                      ) : (
                        <UserIcon className="h-12 w-12 " />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1 border-2 border-white">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
                    <div className="flex items-center space-x-2 text-zinc-700">
                      <Mail className="h-4 w-4" />
                      <p className="text-lg opacity-95">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="bg-white/20 hover:bg-white/30 p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105 group">
                    <Edit className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105 group">
                    <Settings className="h-6 w-6 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grille des informations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Informations personnelles */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Informations personnelles</h3>
              </div>
              <dl className="space-y-4">
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Nom d'utilisateur</dt>
                  <dd className="text-gray-900 font-medium text-lg">{user.username}</dd>
                </div>
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Email</dt>
                  <dd className="text-gray-900 font-medium">{user.email}</dd>
                </div>
              </dl>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Sécurité</h3>
              </div>
              <dl className="space-y-4">
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Statut du compte</dt>
                  <dd>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.is_email_verified 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {user.is_email_verified ? '✓ Vérifié' : '⏳ En attente'}
                    </span>
                  </dd>
                </div>
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Méthode d'authentification</dt>
                  <dd className="text-gray-900 font-medium capitalize">{user.provider || 'Email'}</dd>
                </div>
              </dl>
            </div>

            {/* Activité */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Activité</h3>
              </div>
              <dl className="space-y-4">
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Membre depuis</dt>
                  <dd className="text-gray-900 font-medium">
                    {user.date_joined ? new Date(user.date_joined).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </dd>
                </div>
                <div className="pb-3">
                  <dt className="text-sm font-medium text-gray-500 mb-1">Dernière connexion</dt>
                  <dd className="text-gray-900 font-medium">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString('fr-FR') : 'Maintenant'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Section statistiques supplémentaires */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl p-6 text-black shadow-lg">
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-zinc-600">Projets créés</div>
            </div>
            <div className="bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl p-6 text-black shadow-lg">
              <div className="text-3xl font-bold mb-2">47</div>
              <div className="text-zinc-600">Contributions</div>
            </div>
            <div className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl p-6 text-black shadow-lg">
              <div className="text-3xl font-bold mb-2">89%</div>
              <div className="text-zinc-600">Profil complété</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}