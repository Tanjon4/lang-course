// src/app/[lang]/courses/[courseId]/level/[levelId]/chapter/[chapterId]/lessons/[lessonId]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, PlayCircle, CheckCircle, Star, Download, Video, FileText } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { courseService } from '@/services/courseService';
import { Lesson } from '@/types/course';

export default function LessonPage() {
  const { courseId, levelId, chapterId, lessonId } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { currentCourse, refreshCourseData } = useCourseProgress();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [nextLesson, setNextLesson] = useState<{ 
    courseId: number; 
    levelId: number; 
    chapterId: number; 
    lessonId: number;
    exists: boolean;
  } | null>(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError('Veuillez vous connecter pour accéder à cette leçon.');
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        console.log('🔄 Chargement de la leçon:', lessonId);
        
        if (!currentCourse) {
          setError('Cours non chargé');
          setLoading(false);
          return;
        }
        
        // Trouver la leçon dans la structure du cours
        const foundLesson = currentCourse.levels
          ?.find(level => level.id === Number(levelId))
          ?.chapters?.find(chapter => chapter.id === Number(chapterId))
          ?.lessons?.find(lesson => lesson.id === Number(lessonId));

        if (foundLesson) {
          setLesson(foundLesson);
          findNextLesson(currentCourse);
        } else {
          setError('Leçon non trouvée');
        }
      } catch (error: any) {
        console.error('❌ Erreur chargement leçon:', error);
        setError('Erreur lors du chargement de la leçon: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, levelId, chapterId, lessonId, isAuthenticated, user, currentCourse]);

  const findNextLesson = (courseData: any) => {
    const currentLevelIndex = courseData.levels?.findIndex((level: any) => level.id === Number(levelId)) ?? -1;
    const currentChapterIndex = courseData.levels?.[currentLevelIndex]?.chapters?.findIndex((chapter: any) => chapter.id === Number(chapterId)) ?? -1;
    const currentLessonIndex = courseData.levels?.[currentLevelIndex]?.chapters?.[currentChapterIndex]?.lessons?.findIndex((lesson: any) => lesson.id === Number(lessonId)) ?? -1;

    if (currentLevelIndex === -1 || currentChapterIndex === -1 || currentLessonIndex === -1) {
      setNextLesson({ 
        courseId: Number(courseId), 
        levelId: Number(levelId), 
        chapterId: Number(chapterId), 
        lessonId: Number(lessonId), 
        exists: false 
      });
      return;
    }

    const currentLevel = courseData.levels![currentLevelIndex];
    const currentChapter = currentLevel.chapters![currentChapterIndex];
    const currentLessons = currentChapter.lessons || [];

    // Essayer de trouver la leçon suivante dans le même chapitre
    if (currentLessonIndex < currentLessons.length - 1) {
      const nextLessonInChapter = currentLessons[currentLessonIndex + 1];
      setNextLesson({
        courseId: Number(courseId),
        levelId: Number(levelId),
        chapterId: Number(chapterId),
        lessonId: nextLessonInChapter.id,
        exists: true
      });
      return;
    }

    // Essayer de trouver le chapitre suivant dans le même niveau
    const currentChapters = currentLevel.chapters || [];
    if (currentChapterIndex < currentChapters.length - 1) {
      const nextChapter = currentChapters[currentChapterIndex + 1];
      const firstLessonInNextChapter = nextChapter.lessons?.[0];
      if (firstLessonInNextChapter) {
        setNextLesson({
          courseId: Number(courseId),
          levelId: Number(levelId),
          chapterId: nextChapter.id,
          lessonId: firstLessonInNextChapter.id,
          exists: true
        });
        return;
      }
    }

    // Essayer de trouver le niveau suivant
    if (currentLevelIndex < courseData.levels!.length - 1) {
      const nextLevel = courseData.levels![currentLevelIndex + 1];
      const firstChapterInNextLevel = nextLevel.chapters?.[0];
      const firstLessonInNextChapter = firstChapterInNextLevel?.lessons?.[0];
      
      if (firstLessonInNextChapter) {
        setNextLesson({
          courseId: Number(courseId),
          levelId: nextLevel.id,
          chapterId: firstChapterInNextLevel!.id,
          lessonId: firstLessonInNextChapter.id,
          exists: true
        });
        return;
      }
    }

    // Aucune leçon suivante trouvée - c'est la dernière leçon
    setNextLesson({
      courseId: Number(courseId),
      levelId: Number(levelId),
      chapterId: Number(chapterId),
      lessonId: Number(lessonId),
      exists: false
    });
  };

  const handleBack = () => {
    router.push(`/courses/${courseId}`);
  };

  const handleCompleteLesson = async () => {
    if (!lesson) return;
    
    try {
      setCompleting(true);
      console.log('✅ Marquage de la leçon comme terminée:', lessonId);

      // Appeler l'API
      const result = await courseService.completeLesson(lesson.id);
      
      console.log('📊 Résultat complétion:', result);
      
      // Rafraîchir les données du cours
      await refreshCourseData();
      
      // Message de succès
      alert('Félicitations! Vous avez terminé cette leçon.');
      
      // Navigation automatique - LOGIQUE VAOVAO
      if (result.next_content_unlocked && result.next_content) {
        // Utiliser les infos du next_content retourné par l'API
        const next = result.next_content;
        console.log('➡️ Navigation vers:', next);
        
        if (next.type === 'lesson') {
          router.push(`/courses/${courseId}/level/${levelId}/chapter/${chapterId}/lessons/${next.id}`);
        } else {
          // Si c'est un chapitre/niveau différent, recalculer le chemin
          handleBack(); // Retour au cours pour l'instant
        }
      } else if (nextLesson && nextLesson.exists) {
        // Utiliser la logique frontend de calcul
        router.push(`/courses/${nextLesson.courseId}/level/${nextLesson.levelId}/chapter/${nextLesson.chapterId}/lessons/${nextLesson.lessonId}`);
      } else {
        // TSY MISY LESONA MANARAKA - MANDEHANY ANY AMIN'NY EXAMEN
        console.log('🎯 Toutes les leçons terminées - redirection vers l\'examen');
        router.push(`/courses/${courseId}/examen`);
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de la complétion:', error);
      alert('Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setCompleting(false);
    }
  };

  const handleNavigateToNextLesson = () => {
    if (nextLesson && nextLesson.exists) {
      router.push(
        `/courses/${nextLesson.courseId}/level/${nextLesson.levelId}/chapter/${nextLesson.chapterId}/lessons/${nextLesson.lessonId}`
      );
    } else {
      // Mandeha any amin'ny pejy examen raha tsy misy lesona manaraka
      router.push(`/courses/${courseId}/examen`);
    }
  };

  const handleNavigateToPreviousLesson = () => {
    handleBack();
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPdf = (url: string) => {
    window.open(url, '_blank');
  };

  const getYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-2xl font-bold text-gray-600 mb-2">Connexion requise</div>
          <button
            onClick={() => router.push('/login')}
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
          <p className="text-gray-600">Chargement de la leçon...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-2xl font-bold text-gray-800 mb-2">Erreur</div>
          <p className="text-gray-600 mb-4">{error || 'Leçon non trouvée'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retour au cours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
                Retour au cours
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-gray-600 mt-2">{lesson.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {lesson.duration && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                  <PlayCircle className="h-4 w-4" />
                  <span>{Math.ceil(lesson.duration / 60)} min</span>
                </div>
              )}
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Video Section */}
        {lesson.video_url && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Video className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Vidéo de la leçon</h2>
            </div>
            
            <div className="relative bg-black rounded-xl overflow-hidden">
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Chargement de la vidéo...</p>
                  </div>
                </div>
              )}
              
              <div className="aspect-w-16 aspect-h-9">
                {lesson.video_url.includes('youtube.com') || lesson.video_url.includes('youtu.be') ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(lesson.video_url)}`}
                    title={lesson.title}
                    className="w-full h-96 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleVideoLoad}
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-96 rounded-lg"
                    onLoadedData={handleVideoLoad}
                  >
                    <source src={lesson.video_url} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDownload(lesson.video_url!, `${lesson.title}.mp4`)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                <Download className="h-4 w-4" />
                Télécharger la vidéo
              </button>
            </div>
          </div>
        )}

        {/* PDF Section */}
        {lesson.pdf_file && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Document PDF</h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenPdf(lesson.pdf_file!)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FileText className="h-4 w-4" />
                  Ouvrir le PDF
                </button>
                <button
                  onClick={() => handleDownload(lesson.pdf_file!, `${lesson.title}.pdf`)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
                >
                  <Download className="h-4 w-4" />
                  Télécharger
                </button>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">{lesson.title}.pdf</p>
              <p className="text-sm text-gray-500">
                Cliquez sur "Ouvrir le PDF" pour visualiser le document
              </p>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson.content || '<p>Contenu de la leçon en cours de développement...</p>' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleNavigateToPreviousLesson}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour au cours
          </button>
          
          <button
            onClick={handleCompleteLesson}
            disabled={completing}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-5 w-5" />
            {completing ? 'Sauvegarde...' : (nextLesson && nextLesson.exists ? 'Terminer et continuer' : 'Terminer et passer à l\'examen')}
          </button>

          <button
            onClick={handleNavigateToNextLesson}
            disabled={!nextLesson || !nextLesson.exists}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {nextLesson && nextLesson.exists ? 'Leçon suivante' : 'Passer à l\'examen'}
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </button>
        </div>

        {/* Progress Info */}
        {nextLesson && (
          <div className="text-center mt-4 text-sm text-gray-600">
            {nextLesson.exists ? (
              <p>Prochaine leçon disponible après complétion</p>
            ) : (
              <p>Félicitations! Vous avez terminé tous les contenus. Vous allez être redirigé vers l'examen final.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}