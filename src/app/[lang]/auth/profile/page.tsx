'use client';
import React, { useEffect } from 'react';
import { User as UserIcon, Mail, Shield, Calendar, Edit } from 'lucide-react';
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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Utilisateur non connecté</p>
            <a 
              href="/auth/login"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
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
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

          {/* En-tête du profil */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-12 w-12 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <p className="text-indigo-100 opacity-90">{user.email}</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors backdrop-blur-sm">
                <Edit className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Informations du profil */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Informations personnelles */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <UserIcon className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                </div>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nom d'utilisateur</dt>
                    <dd className="text-gray-900">{user.username}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-gray-900">{user.email}</dd>
                  </div>
                </dl>
              </div>

              {/* Sécurité */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Sécurité</h3>
                </div>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Statut du compte</dt>
                    <dd>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.is_email_verified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.is_email_verified ? 'Vérifié' : 'En attente'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Méthode d'authentification</dt>
                    <dd className="text-gray-900 capitalize">{user.provider || 'Email'}</dd>
                  </div>
                </dl>
              </div>

              {/* Activité */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Activité</h3>
                </div>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Membre depuis</dt>
                    <dd className="text-gray-900">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString('fr-FR') : 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}