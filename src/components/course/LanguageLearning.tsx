// src/components/course/LanguageLearning.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { PlayCircle, Lock, CheckCircle, ChevronRight, BookOpen, Video, FileText } from 'lucide-react';

interface LanguageLearningProps {
  courseId: number;
}

export default function LanguageLearning({ courseId }: LanguageLearningProps) {
  const router = useRouter();
  const { currentCourse } = useCourseProgress();
  
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set());
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

  // Fonction pour naviguer vers une leçon
  const navigateToLesson = (levelId: number, chapterId: number, lessonId: number) => {
    router.push(`/courses/${courseId}/level/${levelId}/chapter/${chapterId}/lessons/${lessonId}`);
  };

  // Fonction pour toggle l'expansion des niveaux
  const toggleLevel = (levelId: number) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId);
    } else {
      newExpanded.add(levelId);
    }
    setExpandedLevels(newExpanded);
  };

  // Fonction pour toggle l'expansion des chapitres
  const toggleChapter = (chapterId: number) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  // Vérifier si une leçon est débloquée (logique simplifiée)
  const isLessonUnlocked = (lesson: any, levelIndex: number, chapterIndex: number, lessonIndex: number) => {
    // La première leçon du premier chapitre du premier niveau est toujours débloquée
    if (levelIndex === 0 && chapterIndex === 0 && lessonIndex === 0) {
      return true;
    }
    
    // Pour les autres leçons, on considère qu'elles sont débloquées si la précédente est complétée
    // ou si la leçon est déjà marquée comme complétée
    if (lesson.completed) {
      return true;
    }
    
    // Logique de déblocage progressive - à adapter selon vos règles métier
    return true;
  };

  // Calculer la progression d'une liste de leçons
  const calculateProgress = (lessons: any[]) => {
    if (!lessons || lessons.length === 0) return 0;
    const completedLessons = lessons.filter(lesson => lesson.completed).length;
    return (completedLessons / lessons.length) * 100;
  };

  // Calculer la progression globale du cours
  const calculateGlobalProgress = () => {
    if (!currentCourse?.levels) return 0;
    
    const allLessons = currentCourse.levels.flatMap(level => 
      level.chapters?.flatMap(chapter => chapter.lessons || []) || []
    );
    
    return calculateProgress(allLessons);
  };

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const globalProgress = calculateGlobalProgress();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* En-tête du cours */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentCourse.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{currentCourse.description}</p>
        
        {/* Progression globale */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progression globale</span>
            <span className="text-sm text-gray-600">{Math.round(globalProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${globalProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Structure des niveaux */}
      <div className="space-y-6">
        {currentCourse.levels?.map((level, levelIndex) => {
          const levelLessons = level.chapters?.flatMap(chapter => chapter.lessons || []) || [];
          const levelProgress = calculateProgress(levelLessons);
          
          return (
            <div key={level.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* En-tête du niveau */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleLevel(level.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      levelProgress === 100 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {levelProgress === 100 ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <BookOpen className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{level.title}</h2>
                      <p className="text-gray-600">{level.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Progression du niveau */}
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">
                        {levelLessons.filter(lesson => lesson.completed).length} / {levelLessons.length} leçons
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${levelProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`h-6 w-6 text-gray-400 transition-transform ${
                        expandedLevels.has(level.id) ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Contenu du niveau (chapitres) */}
              {expandedLevels.has(level.id) && (
                <div className="border-t border-gray-200">
                  {level.chapters?.map((chapter, chapterIndex) => {
                    const chapterProgress = calculateProgress(chapter.lessons || []);
                    
                    return (
                      <div key={chapter.id} className="border-b border-gray-100 last:border-b-0">
                        {/* En-tête du chapitre */}
                        <div 
                          className="p-6 cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                chapterProgress === 100 ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                              }`}>
                                {chapterProgress === 100 ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <BookOpen className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">{chapter.title}</h3>
                                <p className="text-gray-600 text-sm">{chapter.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm text-gray-600 mb-1">
                                  {(chapter.lessons?.filter(lesson => lesson.completed).length || 0)} / 
                                  {(chapter.lessons?.length || 0)} leçons
                                </div>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${chapterProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <ChevronRight 
                                className={`h-5 w-5 text-gray-400 transition-transform ${
                                  expandedChapters.has(chapter.id) ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Leçons du chapitre */}
                        {expandedChapters.has(chapter.id) && (
                          <div className="bg-gray-50 p-6">
                            <div className="grid gap-3">
                              {chapter.lessons?.map((lesson, lessonIndex) => {
                                const unlocked = isLessonUnlocked(lesson, levelIndex, chapterIndex, lessonIndex);
                                
                                return (
                                  <div
                                    key={lesson.id}
                                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition ${
                                      unlocked
                                        ? lesson.completed
                                          ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                                        : 'bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed'
                                    }`}
                                    onClick={() => {
                                      if (unlocked) {
                                        navigateToLesson(level.id, chapter.id, lesson.id);
                                      }
                                    }}
                                  >
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                      lesson.completed 
                                        ? 'bg-green-100 text-green-600' 
                                        : unlocked
                                          ? 'bg-blue-100 text-blue-600'
                                          : 'bg-gray-200 text-gray-400'
                                    }`}>
                                      {lesson.completed ? (
                                        <CheckCircle className="h-4 w-4" />
                                      ) : unlocked ? (
                                        lesson.video_url ? (
                                          <Video className="h-4 w-4" />
                                        ) : lesson.pdf_file ? (
                                          <FileText className="h-4 w-4" />
                                        ) : (
                                          <PlayCircle className="h-4 w-4" />
                                        )
                                      ) : (
                                        <Lock className="h-4 w-4" />
                                      )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-gray-900 truncate">
                                        {lesson.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 truncate">
                                        {lesson.description}
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      {lesson.duration && (
                                        <span className="text-sm text-gray-500 whitespace-nowrap">
                                          {Math.ceil(lesson.duration / 60)} min
                                        </span>
                                      )}
                                      <ChevronRight className="h-4 w-4 text-gray-400" />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}