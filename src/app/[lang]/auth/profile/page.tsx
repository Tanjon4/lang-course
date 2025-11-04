'use client';
import React, { useEffect } from 'react';
import { User as UserIcon, Mail, Shield, Calendar, Edit, Star, Settings, Award, Folder, Users } from 'lucide-react';
import Layout from '@/components/layout/BaseLayout';
import { useAuth } from '@/app/contexts/AuthContext'
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const params = useParams();
  const lang = params.lng;

  // Debug
  useEffect(() => {
    console.log('Profile Page - User:', user);
    console.log('Profile Page - isAuthenticated:', isAuthenticated);
    console.log('Profile Page - Loading:', loading);
  }, [user, isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
          <p className="text-amber-600 font-medium">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-orange-100">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès requis</h2>
            <p className="text-gray-600 mb-6">Connectez-vous pour accéder à votre profil</p>
            <a 
              href="/auth/login"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium inline-block w-full sm:w-auto"
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-4 sm:py-8 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête du profil */}
          <div className="relative bg-gradient-to-r from-gray-800 to-zinc-600 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden mb-6 sm:mb-8 border border-orange-200">
            <div className="absolute inset-0 bg-orange-100/20"></div>
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-orange-100/30 rounded-full -translate-y-20 translate-x-20 sm:-translate-y-32 sm:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-amber-100/30 rounded-full translate-y-16 -translate-x-16 sm:translate-y-24 sm:-translate-x-24"></div>
            
            <div className="relative px-4 sm:px-8 py-6 sm:py-12 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                  <div className="relative">
                    <div className="h-20 w-20 sm:h-28 sm:w-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-lg">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.username}
                          className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-orange-400 shadow-md"
                        />
                      ) : (
                        <UserIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-amber-400 rounded-full p-1 border-2 border-white">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-white">{user.username}</h1>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-white/90">
                      <Mail className="h-4 w-4" />
                      <p className="text-sm sm:text-lg opacity-95">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 sm:space-x-4">
                  <button className="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105 group">
                    <Edit className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105 group">
                    <Settings className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grille des informations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Informations personnelles */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Informations personnelles</h3>
              </div>
              <dl className="space-y-3 sm:space-y-4">
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Nom d'utilisateur</dt>
                  <dd className="text-gray-900 font-medium text-base sm:text-lg">{user.username}</dd>
                </div>
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Email</dt>
                  <dd className="text-gray-900 font-medium text-sm sm:text-base break-words">{user.email}</dd>
                </div>
              </dl>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Sécurité</h3>
              </div>
              <dl className="space-y-3 sm:space-y-4">
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Statut du compte</dt>
                  <dd>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.is_email_verified 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {user.is_email_verified ? '✓ Vérifié' : '⏳ En attente'}
                    </span>
                  </dd>
                </div>
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Méthode d'authentification</dt>
                  <dd className="text-gray-900 font-medium capitalize text-sm sm:text-base">{user.provider || 'Email'}</dd>
                </div>
              </dl>
            </div>

            {/* Activité */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Activité</h3>
              </div>
              <dl className="space-y-3 sm:space-y-4">
                <div className="pb-3 border-b border-orange-50">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Membre depuis</dt>
                  <dd className="text-gray-900 font-medium text-sm sm:text-base">
                    {user.date_joined ? new Date(user.date_joined).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </dd>
                </div>
                <div className="pb-3">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Dernière connexion</dt>
                  <dd className="text-gray-900 font-medium text-sm sm:text-base">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString('fr-FR') : 'Maintenant'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Section statistiques */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <Folder className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-700" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">12</div>
                  <div className="text-xs sm:text-sm text-zinc-600">Projets créés</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-700" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">47</div>
                  <div className="text-xs sm:text-sm text-zinc-600">Contributions</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-700" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">89%</div>
                  <div className="text-xs sm:text-sm text-zinc-600">Profil complété</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section actions rapides pour mobile */}
          <div className="mt-6 sm:hidden">
            <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 bg-orange-50 hover:bg-orange-100 p-3 rounded-lg transition-colors duration-200">
                  <Edit className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Modifier</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-amber-50 hover:bg-amber-100 p-3 rounded-lg transition-colors duration-200">
                  <Settings className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">Paramètres</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}