// app/[lng]/profile/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Calendar, 
  Edit, 
  Star, 
  Settings, 
  Award, 
  Trophy,
  Zap,
  Flame,
  FileText,
  Target,
  BarChart3,
  Clock,
  GraduationCap
} from 'lucide-react';
import Layout from '@/components/layout/BaseLayout';
import { useAuth } from '@/app/contexts/AuthContext';
import { useParams } from 'next/navigation';
import { courseService } from '@/services/courseService';
import { UserProgressOverview, CourseGlobal } from '@/types/course';
import { useTranslation } from 'react-i18next';

// Types pour les données utilisateur étendues
interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  certificatesCount: number;
  currentRank: string;
  nextRank: string;
  progressToNextRank: number;
  completedLevels: number;
  totalLevels: number;
  currentLevelProgress: number;
}

interface LevelProgress {
  levelId: number;
  levelNumber: number;
  levelTitle: string;
  completed: boolean;
  progress: number;
  totalChapters: number;
  completedChapters: number;
}

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const params = useParams();
  const lang = params.lng;
  const { t } = useTranslation();
  const [overviewProgress, setOverviewProgress] = useState<UserProgressOverview | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [courses, setCourses] = useState<CourseGlobal[]>([]);
  const [levelProgress, setLevelProgress] = useState<LevelProgress[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    console.log('Profile Page - User:', user);
    console.log('Profile Page - isAuthenticated:', isAuthenticated);
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    }
  }, [isAuthenticated, user]);

  const loadUserData = async () => {
    if (!isAuthenticated) {
      console.log('👤 User not authenticated, skipping data load');
      return;
    }
    
    try {
      setCoursesLoading(true);
      console.log('📊 Loading user data...');
      
      // Charger les cours et progrès
      const [coursesData, progressData] = await Promise.all([
        courseService.getCourses(),
        courseService.getUserProgressOverview()
      ]);
      
      console.log('✅ Courses loaded:', coursesData.length);
      console.log('✅ Progress overview loaded:', progressData);
      
      setCourses(coursesData);
      setOverviewProgress(progressData);
      
      // Calculer les statistiques basées sur la progression réelle
      const stats = await calculateUserStats(coursesData, progressData);
      setUserStats(stats);
      
    } catch (err) {
      console.error('Error loading user data:', err);
      setUserStats(getFallbackStats());
    } finally {
      setCoursesLoading(false);
    }
  };

  const calculateUserStats = async (coursesData: CourseGlobal[], progressData: UserProgressOverview): Promise<UserStats> => {
    // Calculer la progression par niveau
    const levelProgressData = await calculateLevelProgress(coursesData);
    setLevelProgress(levelProgressData);

    // Compter les niveaux complétés
    const completedLevels = levelProgressData.filter(level => level.completed).length;
    const totalLevels = levelProgressData.length;

    // Déterminer le rang basé sur les niveaux complétés
    const { currentRank, nextRank, progressToNextRank } = calculateRank(completedLevels, totalLevels);
    
    // Calculer XP basé sur la progression (exemple: 100 XP par niveau complété + 10 XP par cours)
    const xpFromLevels = completedLevels * 100;
    const xpFromCourses = (progressData.completed_courses || 0) * 10;
    const totalXP = xpFromLevels + xpFromCourses;

    // Calculer le niveau basé sur XP (exemple: 100 XP par niveau)
    const level = Math.floor(totalXP / 100) + 1;
    const xpToNextLevel = 100 - (totalXP % 100);

    // Compter les certificats (un par niveau complété)
    const certificatesCount = completedLevels;

    return {
      level,
      xp: totalXP,
      xpToNextLevel,
      streak: progressData.streak || 0,
      certificatesCount,
      currentRank,
      nextRank,
      progressToNextRank,
      completedLevels,
      totalLevels,
      currentLevelProgress: completedLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0
    };
  };

  const calculateLevelProgress = async (coursesData: CourseGlobal[]): Promise<LevelProgress[]> => {
    // Cette fonction devrait interroger l'API pour obtenir la progression par niveau
    // Pour l'instant, on simule avec les données des cours
    const levelProgress: LevelProgress[] = [];

    coursesData.forEach(course => {
      // Supposons que chaque cours a des niveaux (à adapter selon votre structure réelle)
      if (course.levels && course.levels.length > 0) {
        course.levels.forEach(level => {
          // Vérifier si le niveau est complété (basé sur la progression du cours)
          const isCompleted = course.progress?.completed_course || false;
          const progress = course.progress?.progress_percentage || 0;
          
          levelProgress.push({
            levelId: level.id,
            levelNumber: level.number,
            levelTitle: level.title,
            completed: isCompleted,
            progress: progress,
            totalChapters: level.chapters?.length || 0,
            completedChapters: Math.floor((progress / 100) * (level.chapters?.length || 1))
          });
        });
      }
    });

    return levelProgress;
  };

  const calculateRank = (completedLevels: number, totalLevels: number) => {
    const progressPercentage = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;
    
    if (progressPercentage < 25) {
      return {
        currentRank: t('ranks.beginner'),
        nextRank: t('ranks.intermediate'),
        progressToNextRank: Math.round((progressPercentage / 25) * 100)
      };
    } else if (progressPercentage < 50) {
      return {
        currentRank: t('ranks.intermediate'),
        nextRank: t('ranks.advanced'),
        progressToNextRank: Math.round(((progressPercentage - 25) / 25) * 100)
      };
    } else if (progressPercentage < 75) {
      return {
        currentRank: t('ranks.advanced'),
        nextRank: t('ranks.expert'),
        progressToNextRank: Math.round(((progressPercentage - 50) / 25) * 100)
      };
    } else {
      return {
        currentRank: t('ranks.expert'),
        nextRank: t('ranks.master'),
        progressToNextRank: Math.round(((progressPercentage - 75) / 25) * 100)
      };
    }
  };

  const getFallbackStats = (): UserStats => ({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    streak: 0,
    certificatesCount: 0,
    currentRank: t('ranks.beginner'),
    nextRank: t('ranks.intermediate'),
    progressToNextRank: 0,
    completedLevels: 0,
    totalLevels: 0,
    currentLevelProgress: 0
  });

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100 border-green-200';
      case 'intermediate': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'advanced': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'expert': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'master': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getLevelRequirements = (currentRank: string) => {
    switch (currentRank.toLowerCase()) {
      case 'beginner':
        return t('rankRequirements.beginner');
      case 'intermediate':
        return t('rankRequirements.intermediate');
      case 'advanced':
        return t('rankRequirements.advanced');
      case 'expert':
        return t('rankRequirements.expert');
      default:
        return t('rankRequirements.default');
    }
  };

  if (loading || coursesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
          <p className="text-amber-600 font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Layout>
        <br /><br />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-orange-100">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('accessRequired')}</h2>
            <p className="text-gray-600 mb-6">{t('loginToAccess')}</p>
            <a 
              href="/auth/login"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium inline-block w-full sm:w-auto"
            >
              {t('loginButton')}
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <br /><br />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-4 sm:py-8 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête du profil avec niveau et XP */}
          <div className="relative bg-gradient-to-r from-gray-800 to-zinc-600 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden mb-6 sm:mb-8 border border-orange-200">
            <div className="absolute inset-0 bg-orange-100/20"></div>
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-orange-100/30 rounded-full -translate-y-20 translate-x-20 sm:-translate-y-32 sm:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-amber-100/30 rounded-full translate-y-16 -translate-x-16 sm:translate-y-24 sm:-translate-x-24"></div>
            
            <div className="relative px-4 sm:px-8 py-6 sm:py-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
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
                    {userStats && (
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-2 border-2 border-white shadow-lg">
                        <div className="text-xs font-bold whitespace-nowrap">
                          {t('level')} {userStats.level}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-white">{user.username}</h1>
                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-white/90 mb-3">
                      <Mail className="h-4 w-4" />
                      <p className="text-sm sm:text-lg opacity-95">{user.email}</p>
                    </div>
                    {userStats && (
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRankColor(userStats.currentRank)}`}>
                          <Trophy className="h-3 w-3 mr-1" />
                          {userStats.currentRank}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500 text-white border border-amber-600">
                          <Zap className="h-3 w-3 mr-1" />
                          {userStats.xp} {t('xp')}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white border border-green-600">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {userStats.completedLevels}/{userStats.totalLevels} {t('levels')}
                        </span>
                      </div>
                    )}
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

              {/* Barre de progression du rang */}
              {userStats && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{t('progressTo')} {userStats.nextRank}</span>
                    <span className="text-sm font-bold">{userStats.progressToNextRank}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-amber-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${userStats.progressToNextRank}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-white/80">
                    <span>{userStats.currentRank}</span>
                    <span>{userStats.nextRank}</span>
                  </div>
                  <p className="text-xs text-white/70 mt-2 text-center">
                    {getLevelRequirements(userStats.currentRank)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Niveaux complétés */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <GraduationCap className="h-8 w-8" />
                <span className="text-2xl font-bold">{userStats?.completedLevels || 0}</span>
              </div>
              <h3 className="font-semibold text-white/90">{t('levels')}</h3>
              <p className="text-sm text-white/70 mt-1">{t('completed')}</p>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <Flame className="h-8 w-8" />
                <span className="text-2xl font-bold">{userStats?.streak || 0}</span>
              </div>
              <h3 className="font-semibold text-white/90">{t('days')}</h3>
              <p className="text-sm text-white/70 mt-1">{t('currentStreak')}</p>
            </div>

            {/* Certificats */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8" />
                <span className="text-2xl font-bold">{userStats?.certificatesCount || 0}</span>
              </div>
              <h3 className="font-semibold text-white/90">{t('certificates')}</h3>
              <p className="text-sm text-white/70 mt-1">{t('obtained')}</p>
            </div>

            {/* Cours complétés */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8" />
                <span className="text-2xl font-bold">{overviewProgress?.completed_courses || 0}</span>
              </div>
              <h3 className="font-semibold text-white/90">{t('courses')}</h3>
              <p className="text-sm text-white/70 mt-1">{t('completed')}</p>
            </div>
          </div>

          {/* Grille des informations détaillées */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Progression et niveau */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t('progressAndLevel')}</h3>
              </div>
              <div className="space-y-4">
                {userStats ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{t('currentLevel')}</span>
                      <span className="text-lg font-bold text-gray-900">{t('level')} {userStats.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{t('totalXP')}</span>
                      <span className="text-lg font-bold text-amber-600">{userStats.xp} {t('xp')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{t('nextLevel')}</span>
                      <span className="text-sm font-medium text-gray-900">{userStats.xpToNextLevel} {t('xpRequired')}</span>
                    </div>
                    <div className="pt-4 border-t border-orange-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">{t('currentRank')}</span>
                        <span className={`text-sm font-bold px-2 py-1 rounded ${getRankColor(userStats.currentRank)}`}>
                          {userStats.currentRank}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${userStats.progressToNextRank}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {getLevelRequirements(userStats.currentRank)}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    {t('loadingStats')}
                  </div>
                )}
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t('personalInfo')}</h3>
              </div>
              <dl className="space-y-4">
                <div className="pb-4 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-2">{t('username')}</dt>
                  <dd className="text-gray-900 font-medium text-lg">{user.username}</dd>
                </div>
                <div className="pb-4 border-b border-orange-50">
                  <dt className="text-sm font-medium text-gray-500 mb-2">{t('email')}</dt>
                  <dd className="text-gray-900 font-medium text-base break-words">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">{t('memberSince')}</dt>
                  <dd className="text-gray-900 font-medium text-base">
                    {user.date_joined ? new Date(user.date_joined).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Progression des niveaux */}
            {levelProgress.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl transition-all duration-300 group lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t('levelProgress')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {levelProgress.slice(0, 6).map((level) => (
                    <div key={level.levelId} className="border border-orange-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{t('level')} {level.levelNumber}</span>
                        {level.completed ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Award className="h-3 w-3 mr-1" />
                            {t('completed')}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            {level.completedChapters}/{level.totalChapters} {t('chapters')}
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            level.completed 
                              ? 'bg-green-500' 
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${level.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{level.levelTitle}</p>
                    </div>
                  ))}
                </div>
                {levelProgress.length > 6 && (
                  <p className="text-center text-gray-500 mt-4">
                    +{levelProgress.length - 6} {t('moreLevels')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}