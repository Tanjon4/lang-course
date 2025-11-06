// components/courses/ProgressOverview.tsx - VERSION CORRIGÉE
import React from 'react';
import { Award, Target, Clock, TrendingUp } from 'lucide-react';
import { UserProgressOverview } from '@/types/course';

interface ProgressOverviewProps {
  progress: UserProgressOverview | null;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ progress }) => {
  // ✅ DONNÉES PAR DÉFAUT POUR ÉVITER LES "undefined" ET "NaN"
  const safeProgress = progress || {
    total_courses: 0,
    completed_courses: 0,
    in_progress_courses: 0,
    streak: 0,
    total_time_spent: 0,
    enrolled_courses: []
  };

  // ✅ CALCULS SÉCURISÉS
  const totalHours = Math.round((safeProgress.total_time_spent || 0) / 60);
  const displayHours = isNaN(totalHours) ? 0 : totalHours;

  const stats = [
    {
      icon: <Target className="h-6 w-6" />,
      label: 'Cours terminés',
      value: `${safeProgress.completed_courses || 0}/${safeProgress.total_courses || 0}`,
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: 'En progression',
      value: safeProgress.in_progress_courses || 0,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: <Award className="h-6 w-6" />,
      label: 'Jours consécutifs',
      value: `${safeProgress.streak || 0} jours`,
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: 'Temps total',
      value: `${displayHours}h`,
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  // ✅ CALCUL SÉCURISÉ DE LA PROGRESSION GLOBALE
  const globalProgress = safeProgress.total_courses > 0 
    ? (safeProgress.completed_courses / safeProgress.total_courses) * 100 
    : 0;

  // ✅ AFFICHAGE DU SKELETON PENDANT LE CHARGEMENT SI progress EST NULL
  if (!progress) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Vue d'ensemble de votre progression
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-lg border-0 p-6 animate-pulse">
              <div className="h-12 w-12 bg-gray-300 rounded-xl mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Vue d'ensemble de votre progression
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group">
            <div className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden relative transition-all duration-300 hover:shadow-xl">
              <div className="p-6 relative">
                <div className={`absolute inset-0 bg-linear-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Progress */}
      <div className="mt-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg border-0 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2">Progression globale</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-white bg-opacity-20 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(globalProgress)}%` }}
              ></div>
            </div>
            <div className="text-lg font-bold">
              {Math.round(globalProgress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;