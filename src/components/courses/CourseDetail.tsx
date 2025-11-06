// components/courses/CourseDetail.tsx
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  PlayCircle,
  Lock,
  CheckCircle,
  Clock,
  ChevronDown,
  FileText,
  Video,
  Star,
  Users,
  Award,
  BookOpen,
  Expand,
  Target,
  X,
} from 'lucide-react';
import { CourseGlobal, Level, Chapter, Lesson } from '@/types/course';
import { courseService } from '@/services/courseService';
import { useAuth } from '@/app/contexts/AuthContext';

interface CourseDetailProps {
  course: CourseGlobal;
  onBack: () => void;
  onEnroll: (courseId: number) => Promise<void>;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onEnroll }) => {
  const { user, isAuthenticated } = useAuth();
  const [expandedLevel, setExpandedLevel] = useState<number | false>(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [progress, setProgress] = useState(course.progress);
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<CourseGlobal>(course);

  useEffect(() => {
    loadCourseProgress();
    loadCourseDetails();
  }, [course.id]);

  const loadCourseDetails = async () => {
    try {
      const courseDetails = await courseService.getCourse(course.id);
      setCourseData(courseDetails);
    } catch (error) {
      console.error('Error loading course details:', error);
    }
  };

  const loadCourseProgress = async () => {
    try {
      if (!isAuthenticated) return;
      
      const progressData = await courseService.getCourseProgress(course.id);
      setProgress(progressData);
    } catch (error) {
      console.error('Error loading course progress:', error);
    }
  };

  const handleLevelChange = (levelId: number) => {
    setExpandedLevel(expandedLevel === levelId ? false : levelId);
  };

  const handleEnrollClick = async () => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour vous inscrire à ce cours');
      return;
    }

    setLoading(true);
    try {
      console.log('🎯 CourseDetail: Starting enrollment...');
      await onEnroll(course.id);
      console.log('✅ CourseDetail: Enrollment successful, loading progress...');
      await loadCourseProgress();
      await loadCourseDetails();
    } catch (error: any) {
      console.error('❌ CourseDetail: Enrollment failed:', error.message);
      alert(`Erreur lors de l'inscription: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = async (lesson: Lesson) => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour accéder aux leçons');
      return;
    }

    if (!lesson.is_published) {
      alert('Cette leçon n\'est pas encore disponible');
      return;
    }

    if (!lesson.progress?.unlocked) {
      try {
        await courseService.unlockLesson(lesson.id);
        await loadCourseProgress();
        await loadCourseDetails();
      } catch (error: any) {
        console.error('Error unlocking lesson:', error);
        alert(`Impossible de débloquer la leçon: ${error.message}`);
        return;
      }
    }

    setSelectedLesson(lesson);
    setVideoDialogOpen(true);
  };

  const handleCompleteLesson = async () => {
    if (!selectedLesson) return;

    try {
      const result = await courseService.completeLesson(selectedLesson.id);
      console.log('Lesson completed:', result);
      await loadCourseProgress();
      await loadCourseDetails();
      setVideoDialogOpen(false);
      
      if (result.next_content_unlocked) {
        alert('Félicitations ! Vous avez débloqué du nouveau contenu !');
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Erreur lors de la complétion de la leçon');
    }
  };

  const handleUnlockLevel = async (level: Level) => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour débloquer les niveaux');
      return;
    }

    try {
      await courseService.unlockLevel(level.id);
      await loadCourseProgress();
      await loadCourseDetails();
      alert('Niveau débloqué avec succès !');
    } catch (error: any) {
      console.error('Error unlocking level:', error);
      alert(`Impossible de débloquer le niveau: ${error.message}`);
    }
  };

  const getCompletionStatus = (level: Level) => {
    const totalLessons = level.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
    const completedLessons = level.chapters.reduce((total, chapter) => 
      total + chapter.lessons.filter(lesson => lesson.progress?.completed).length, 0
    );
    return { 
      completed: completedLessons, 
      total: totalLessons, 
      percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0 
    };
  };

  const isLevelUnlockable = (level: Level, levelIndex: number): boolean => {
    if (levelIndex === 0 && progress?.enrolled) return true;
    
    const previousLevel = courseData.levels.find(l => l.order === level.order - 1);
    if (!previousLevel) return true;
    
    const prevCompletion = getCompletionStatus(previousLevel);
    return prevCompletion.percentage === 100;
  };

  const isLevelUnlocked = (level: Level, levelIndex: number): boolean => {
    if (levelIndex === 0 && progress?.enrolled) return true;
    return level.progress?.unlocked || false;
  };

  const isLessonUnlocked = (lesson: Lesson, levelIndex: number, chapterIndex: number, lessonIndex: number): boolean => {
    if (levelIndex === 0 && chapterIndex === 0 && lessonIndex === 0 && progress?.enrolled) {
      return true;
    }
    return lesson.progress?.unlocked || false;
  };

  const ProgressBar = ({ value, className = "" }: { value: number; className?: string }) => (
    <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
      <div 
        className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-indigo-600 mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux cours
            </button>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-600 text-indigo-600 font-semibold text-sm mb-3">
                  {courseData.language_code.toUpperCase()}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {courseData.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4 max-w-3xl">
                  {courseData.description}
                </p>
                
                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-600 text-sm">
                      {courseData.levels.length} niveaux
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-600 text-sm">
                      {courseData.levels.reduce((total, level) => 
                        total + level.chapters.length, 0
                      )} chapitres
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-600 text-sm">
                      {courseData.levels.reduce((total, level) => 
                        total + level.chapters.reduce((chapTotal, chapter) => 
                          chapTotal + chapter.lessons.length, 0
                        ), 0
                      )} leçons
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Enrollment Section */}
              <div className="lg:w-80 mt-6 lg:mt-0">
                <div className="bg-white rounded-2xl shadow-lg border-0 p-6">
                  {progress?.enrolled ? (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">
                        Votre progression
                      </h3>
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 text-sm">
                            Complété
                          </span>
                          <span className="text-indigo-600 font-bold text-sm">
                            {progress?.progress_percentage || 0}%
                          </span>
                        </div>
                        <ProgressBar value={progress?.progress_percentage || 0} />
                      </div>
                      
                      {progress?.completed_course ? (
                        <button
                          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-semibold flex items-center justify-center transition-colors"
                        >
                          <Award className="h-5 w-5 mr-2" />
                          Cours Terminé 🎉
                        </button>
                      ) : (
                        <button
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-semibold flex items-center justify-center transition-colors"
                          onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          <PlayCircle className="h-5 w-5 mr-2" />
                          Continuer l'apprentissage
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-lg">
                        Commencez votre voyage
                      </h3>
                      <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center transition-all disabled:opacity-50"
                        onClick={handleEnrollClick}
                        disabled={loading || !isAuthenticated}
                      >
                        <Star className="h-5 w-5 mr-2" />
                        {loading ? 'Inscription...' : "S'inscrire au cours"}
                      </button>
                      <p className="text-gray-500 text-center mt-3 text-sm">
                        {isAuthenticated ? 'Accès immédiat • Progression sauvegardée' : 'Connectez-vous pour vous inscrire'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div id="curriculum">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Programme du cours
          </h2>

          {courseData.levels.map((level, levelIndex) => {
            const levelCompletion = getCompletionStatus(level);
            const isUnlocked = isLevelUnlocked(level, levelIndex);
            const canUnlock = isLevelUnlockable(level, levelIndex) && !isUnlocked;
            const isCompleted = levelCompletion.percentage === 100;

            return (
              <div
                key={level.id}
                className="mb-4 rounded-2xl shadow-lg border-0 overflow-hidden bg-white"
              >
                <button
                  onClick={() => handleLevelChange(level.id)}
                  className={`w-full p-6 hover:bg-gray-50 text-left transition-colors ${
                    expandedLevel === level.id ? 'bg-indigo-50 border-b border-indigo-100' : ''
                  } ${!isUnlocked ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600' 
                          : isUnlocked 
                            ? 'bg-indigo-100 text-indigo-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : isUnlocked ? (
                          <PlayCircle className="h-6 w-6" />
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          Niveau {level.order}: {level.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {level.description}
                        </p>
                        
                        {isUnlocked && (
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-gray-500 text-sm">
                              {levelCompletion.completed}/{levelCompletion.total} leçons
                            </span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  isCompleted ? 'bg-green-500' : 'bg-indigo-600'
                                }`}
                                style={{ width: `${levelCompletion.percentage}%` }}
                              />
                            </div>
                            <span className="text-indigo-600 font-semibold text-sm">
                              {Math.round(levelCompletion.percentage)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {!isUnlocked && canUnlock && isAuthenticated && (
                        <button
                          className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg flex items-center transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnlockLevel(level);
                          }}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Débloquer
                        </button>
                      )}

                      {!isUnlocked && !canUnlock && (
                        <span className="text-gray-500 italic text-sm">
                          Terminez le niveau précédent
                        </span>
                      )}

                      <ChevronDown 
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          expandedLevel === level.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {expandedLevel === level.id && (
                  <div className="bg-gray-50 p-4">
                    <div className="space-y-4">
                      {level.chapters.map((chapter, chapterIndex) => (
                        <div key={chapter.id} className="mb-4 last:mb-0">
                          <h4 className="font-semibold text-gray-900 mb-3 px-2 text-base">
                            Chapitre {chapterIndex + 1}: {chapter.title}
                          </h4>
                          
                          <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="space-y-2">
                              {chapter.lessons.map((lesson, lessonIndex) => {
                                const isLessonUnlockedValue = isLessonUnlocked(lesson, levelIndex, chapterIndex, lessonIndex);
                                const isLessonCompleted = lesson.progress?.completed;
                                
                                return (
                                  <div
                                    key={lesson.id}
                                    className={`rounded-lg p-4 transition-all ${
                                      isLessonUnlockedValue 
                                        ? 'cursor-pointer hover:bg-indigo-50 border border-transparent hover:border-indigo-100' 
                                        : 'opacity-60 cursor-not-allowed'
                                    } ${
                                      isLessonCompleted ? 'bg-green-50 border border-green-200' : ''
                                    }`}
                                    onClick={() => isLessonUnlockedValue && handleLessonClick(lesson)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        {isLessonCompleted ? (
                                          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                        ) : isLessonUnlockedValue ? (
                                          <PlayCircle className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                                        ) : (
                                          <Lock className="h-6 w-6 text-gray-400 flex-shrink-0" />
                                        )}
                                        
                                        <div>
                                          <div className="font-medium text-gray-900 flex items-center">
                                            {lesson.title}
                                            {!lesson.is_published && (
                                              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                                Non publié
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-gray-500 text-sm mt-1">
                                            {lesson.description}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-3">
                                        {lesson.video_url && (
                                          <Video className="h-4 w-4 text-gray-400" />
                                        )}
                                        {lesson.pdf_file && (
                                          <FileText className="h-4 w-4 text-gray-400" />
                                        )}
                                        {lesson.duration && (
                                          <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-500 text-sm">
                                              {Math.round(lesson.duration / 60)} min
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Dialog */}
      {videoDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {selectedLesson?.title}
              </h3>
              <button 
                onClick={() => setVideoDialogOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-gray-900 flex-1">
              {selectedLesson?.video_url ? (
                <div className="aspect-video bg-black">
                  <video
                    controls
                    className="w-full h-full"
                    src={selectedLesson.video_url}
                    onEnded={handleCompleteLesson}
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gray-800">
                  <span className="text-white text-lg">
                    Aucune vidéo disponible
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {selectedLesson?.description}
              </p>
              
              {selectedLesson?.pdf_file && (
                <button
                  className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg flex items-center transition-colors"
                  onClick={() => window.open(selectedLesson.pdf_file, '_blank')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger le PDF
                </button>
              )}
            </div>
            
            <div className="p-6 bg-gray-50 flex justify-end space-x-4">
              <button
                onClick={() => setVideoDialogOpen(false)}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 transition-colors"
              >
                Fermer
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                onClick={handleCompleteLesson}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marquer comme terminé
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;