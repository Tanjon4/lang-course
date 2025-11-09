// components/courses/LanguageLearning.tsx - CORRIGÉ
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  BookOpen, 
  PlayCircle,
  ArrowLeft,
  Users,
  Clock,
  Star,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { courseService } from '@/services/courseService';
import { CourseGlobal, Level, Chapter, Lesson } from '@/types/course';

export default function LanguageLearning() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const [course, setCourse] = useState<CourseGlobal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set());
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  useEffect(() => {
    console.log("🔐 Auth state - isAuthenticated:", isAuthenticated, "user:", user);
    
    if (initialLoad) {
      const timer = setTimeout(() => {
        setInitialLoad(false);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (!isAuthenticated || !user) {
      setError('Veuillez vous connecter pour accéder au cours.');
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        console.log('🔄 Chargement du cours:', courseId);
        const courseData = await courseService.getCourse(Number(courseId));
        console.log('✅ Cours chargé:', courseData);
        
        setCourse(courseData);
        
        if (courseData.levels?.[0]?.id) {
          setExpandedLevels(new Set([courseData.levels[0].id]));
        }
      } catch (error: any) {
        console.error('❌ Erreur chargement cours:', error);
        setError('Erreur lors du chargement du cours: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, isAuthenticated, user, initialLoad]);

  const toggleLevel = (levelId: number) => {
    setExpandedLevels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(levelId)) {
        newSet.delete(levelId);
      } else {
        newSet.add(levelId);
      }
      return newSet;
    });
  };

  const handleLessonClick = (lesson: Lesson, levelIndex: number, chapterIndex: number, lessonIndex: number) => {
    if (!isLessonUnlocked(levelIndex, chapterIndex, lessonIndex)) {
      return;
    }
    
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lesson.id);
    setCompletedLessons(newCompleted);
    
    router.push(`/courses/${courseId}/lessons/${lesson.id}`);
  };

  // Système de déverrouillage progressif
  const isLevelUnlocked = (levelIndex: number): boolean => {
    if (levelIndex === 0) return true;
    
    const previousLevel = course?.levels[levelIndex - 1];
    if (!previousLevel) return false;
    
    return getLevelProgress(previousLevel).percentage === 100;
  };

  const isChapterUnlocked = (levelIndex: number, chapterIndex: number): boolean => {
    if (levelIndex === 0 && chapterIndex === 0) return true;
    
    if (chapterIndex > 0) {
      const previousChapter = course?.levels[levelIndex]?.chapters[chapterIndex - 1];
      if (!previousChapter) return false;
      return getChapterProgress(previousChapter).percentage === 100;
    }
    
    if (levelIndex > 0 && chapterIndex === 0) {
      return isLevelUnlocked(levelIndex);
    }
    
    return false;
  };

  const isLessonUnlocked = (levelIndex: number, chapterIndex: number, lessonIndex: number): boolean => {
    if (levelIndex === 0 && chapterIndex === 0 && lessonIndex === 0) return true;
    
    if (lessonIndex > 0) {
      const previousLesson = course?.levels[levelIndex]?.chapters[chapterIndex]?.lessons[lessonIndex - 1];
      if (!previousLesson) return false;
      return completedLessons.has(previousLesson.id);
    }
    
    if (lessonIndex === 0 && chapterIndex > 0) {
      return isChapterUnlocked(levelIndex, chapterIndex);
    }
    
    return false;
  };

  const isLessonCompleted = (lesson: Lesson): boolean => {
    return completedLessons.has(lesson.id);
  };

  const getCourseStatistics = () => {
    if (!course || !course.levels) return { totalLessons: 0, completedLessons: 0, overallProgress: 0 };
    
    const totalLessons = course.levels.reduce((total: number, level: Level) => {
      if (!level.chapters) return total;
      return total + level.chapters.reduce((chapTotal: number, chapter: Chapter) => {
        if (!chapter.lessons) return chapTotal;
        return chapTotal + chapter.lessons.length;
      }, 0);
    }, 0);

    const completedCount = completedLessons.size;
    const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return { totalLessons, completedLessons: completedCount, overallProgress };
  };

  const getLevelProgress = (level: Level) => {
    if (!level?.chapters) return { total: 0, completed: 0, percentage: 0 };
    
    const totalLessons = level.chapters.reduce((total: number, chapter: Chapter) => {
      if (!chapter.lessons) return total;
      return total + chapter.lessons.length;
    }, 0);

    const completedLessonsCount = level.chapters.reduce((total: number, chapter: Chapter) => {
      if (!chapter.lessons) return total;
      return total + chapter.lessons.filter(lesson => completedLessons.has(lesson.id)).length;
    }, 0);

    const percentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
    
    return { total: totalLessons, completed: completedLessonsCount, percentage };
  };

  const getChapterProgress = (chapter: Chapter) => {
    if (!chapter?.lessons) return { total: 0, completed: 0, percentage: 0 };
    
    const totalLessons = chapter.lessons.length;
    const completedLessonsCount = chapter.lessons.filter(lesson => completedLessons.has(lesson.id)).length;
    const percentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
    
    return { total: totalLessons, completed: completedLessonsCount, percentage };
  };

  const hasLevelContent = (level: Level) => {
    return level?.chapters && level.chapters.length > 0;
  };

  const hasChapterContent = (chapter: Chapter) => {
    return chapter?.lessons && chapter.lessons.length > 0;
  };

  // Conditions de rendu
  if (initialLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Connexion requise</h2>
          <p className="text-gray-500 mb-6">Veuillez vous connecter pour accéder à ce cours.</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du cours...</p>
        </div>
      </div>
    );
  }



  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <BookOpen className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cours non trouvé</h2>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retour aux cours
          </button>
        </div>
      </div>
    );
  }

  const { totalLessons, completedLessons: completedCount, overallProgress } = getCourseStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header avec statistiques élégantes */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/courses')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
                Retour aux cours
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {course.title}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Cartes de statistiques élégantes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Leçons totales</p>
                  <p className="text-2xl font-bold">{totalLessons}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Leçons terminées</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Progression</p>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                </div>
                <Star className="h-8 w-8 text-purple-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Niveaux</p>
                  <p className="text-2xl font-bold">{course.levels?.length || 0}</p>
                </div>
                <Users className="h-8 w-8 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          {totalLessons > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Votre progression dans le cours</span>
                <span className="text-sm font-bold text-blue-600">{overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!course.levels || course.levels.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Cours en préparation</h2>
            <p className="text-gray-500">Le cours "{course.title}" est en cours de développement.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {course.levels.map((level: Level, levelIndex: number) => {
              const levelStats = getLevelProgress(level);
              const isExpanded = expandedLevels.has(level.id);
              const hasContent = hasLevelContent(level);
              const levelUnlocked = isLevelUnlocked(levelIndex);

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: levelIndex * 0.1 }}
                  className={`rounded-2xl shadow-lg overflow-hidden border-2 ${
                    levelUnlocked 
                      ? 'bg-white border-blue-100 hover:border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  } transition-all duration-300 hover:shadow-xl`}
                >
                  <div 
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      levelUnlocked ? 'hover:bg-blue-50' : 'cursor-not-allowed'
                    }`}
                    onClick={() => levelUnlocked && toggleLevel(level.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${
                          levelUnlocked 
                            ? levelStats.percentage === 100 
                              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
                              : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          {levelUnlocked ? (
                            levelStats.percentage === 100 ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <PlayCircle className="h-6 w-6" />
                            )
                          ) : (
                            <Lock className="h-6 w-6" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-xl font-bold ${
                              levelUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              Niveau {level.number || level.order || levelIndex + 1}
                            </h3>
                            {!levelUnlocked && (
                              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                                Verrouillé
                              </span>
                            )}
                          </div>
                          <h4 className={`text-lg font-semibold mb-2 ${
                            levelUnlocked ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {level.title || 'Sans titre'}
                          </h4>
                          <p className={`text-sm ${
                            levelUnlocked ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {level.description || 'Aucune description'}
                          </p>
                          
                          {levelUnlocked && hasContent && (
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2 shadow-inner">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-1000 ${
                                      levelStats.percentage === 100 
                                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                    }`}
                                    style={{ width: `${levelStats.percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {levelStats.completed}/{levelStats.total} leçons
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {levelUnlocked && (
                        <ChevronRight 
                          className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                            isExpanded ? 'rotate-90 text-blue-500' : ''
                          }`} 
                        />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && levelUnlocked && hasContent && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white"
                      >
                        <div className="p-6">
                          <div className="grid gap-4">
                            {level.chapters.map((chapter: Chapter, chapterIndex: number) => {
                              if (!hasChapterContent(chapter)) return null;
                              
                              const chapterStats = getChapterProgress(chapter);
                              // ✅ CORRECTION: Variable renommée
                              const chapterUnlocked = isChapterUnlocked(levelIndex, chapterIndex);

                              return (
                                <motion.div
                                  key={chapter.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: chapterIndex * 0.05 }}
                                  className={`rounded-xl p-4 border-2 ${
                                    chapterUnlocked
                                      ? 'bg-white border-blue-100 hover:border-blue-200'
                                      : 'bg-gray-100 border-gray-200'
                                  } transition-all duration-300`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <h4 className={`font-bold ${
                                        chapterUnlocked ? 'text-gray-900' : 'text-gray-500'
                                      }`}>
                                        Chapitre {chapter.number || chapter.order || chapterIndex + 1}
                                      </h4>
                                      {!chapterUnlocked && (
                                        <Lock className="h-4 w-4 text-gray-400" />
                                      )}
                                    </div>
                                    <span className={`text-sm font-medium ${
                                      chapterUnlocked ? 'text-gray-700' : 'text-gray-400'
                                    }`}>
                                      {chapterStats.completed}/{chapterStats.total} terminées
                                    </span>
                                  </div>
                                  
                                  <h5 className={`font-semibold mb-2 ${
                                    chapterUnlocked ? 'text-gray-800' : 'text-gray-500'
                                  }`}>
                                    {chapter.title || 'Sans titre'}
                                  </h5>
                                  <p className={`text-sm mb-4 ${
                                    chapterUnlocked ? 'text-gray-600' : 'text-gray-400'
                                  }`}>
                                    {chapter.description || 'Aucune description'}
                                  </p>
                                  
                                  <div className="grid gap-2">
                                    {chapter.lessons.map((lesson: Lesson, lessonIndex: number) => {
                                      const lessonUnlocked = isLessonUnlocked(levelIndex, chapterIndex, lessonIndex);
                                      const isCompleted = isLessonCompleted(lesson);
                                      
                                      return (
                                        <motion.div
                                          key={lesson.id}
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: (chapterIndex * 0.1) + (lessonIndex * 0.05) }}
                                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 ${
                                            lessonUnlocked
                                              ? isCompleted
                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 cursor-pointer hover:shadow-md'
                                                : 'bg-white border-blue-100 hover:border-blue-200 cursor-pointer hover:shadow-md'
                                              : 'bg-gray-100 border-gray-200 cursor-not-allowed'
                                          }`}
                                          onClick={() => lessonUnlocked && handleLessonClick(lesson, levelIndex, chapterIndex, lessonIndex)}
                                        >
                                          <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                                            isCompleted
                                              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
                                              : lessonUnlocked
                                              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                                              : 'bg-gray-400 text-white'
                                          }`}>
                                            {isCompleted ? (
                                              <CheckCircle className="h-5 w-5" />
                                            ) : lessonUnlocked ? (
                                              <PlayCircle className="h-5 w-5" />
                                            ) : (
                                              <Lock className="h-5 w-5" />
                                            )}
                                          </div>
                                          
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                              <h6 className={`font-medium truncate ${
                                                lessonUnlocked ? 'text-gray-900' : 'text-gray-500'
                                              }`}>
                                                {lesson.number || lesson.order || lessonIndex + 1}. {lesson.title || 'Sans titre'}
                                              </h6>
                                              {lesson.duration && (
                                                <div className={`flex items-center gap-1 text-xs ${
                                                  lessonUnlocked ? 'text-gray-500' : 'text-gray-400'
                                                }`}>
                                                  <Clock className="h-3 w-3" />
                                                  {Math.ceil(lesson.duration / 60)} min
                                                </div>
                                              )}
                                            </div>
                                            <p className={`text-sm truncate ${
                                              lessonUnlocked ? 'text-gray-600' : 'text-gray-400'
                                            }`}>
                                              {lesson.description || 'Aucune description'}
                                            </p>
                                          </div>
                                          
                                          {lessonUnlocked && !isCompleted && (
                                            <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                                          )}
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}