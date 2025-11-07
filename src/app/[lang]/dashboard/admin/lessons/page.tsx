"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Course, Level, Chapter, Lesson } from "./services/types";
import { fetchCourses, fetchLevels, fetchChapters, fetchLessons } from "./services/api";
import LessonForm from "./components/LessonForm";
import LessonList from "./components/LessonList";

export default function GestionLessons() {
  const { accessToken } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState({
    courses: false,
    levels: false,
    chapters: false,
    lessons: false
  });

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  // 🔄 Charger les cours
  useEffect(() => {
    if (!accessToken) return;
    setIsLoading(prev => ({...prev, courses: true}));
    fetchCourses(accessToken)
      .then(setCourses)
      .catch(console.error)
      .finally(() => setIsLoading(prev => ({...prev, courses: false})));
  }, [accessToken]);

  // 🔄 Charger les niveaux quand course change
  useEffect(() => {
    if (!selectedCourse || !accessToken) return setLevels([]);
    setIsLoading(prev => ({...prev, levels: true}));
    setSelectedLevel(null);
    setSelectedChapter(null);
    fetchLevels(selectedCourse, accessToken)
      .then(setLevels)
      .catch(console.error)
      .finally(() => setIsLoading(prev => ({...prev, levels: false})));
  }, [selectedCourse, accessToken]);

  // 🔄 Charger les chapitres quand level change
  useEffect(() => {
    if (!selectedLevel || !accessToken) return setChapters([]);
    setIsLoading(prev => ({...prev, chapters: true}));
    setSelectedChapter(null);
    fetchChapters(selectedLevel, accessToken)
      .then(setChapters)
      .catch(console.error)
      .finally(() => setIsLoading(prev => ({...prev, chapters: false})));
  }, [selectedLevel, accessToken]);

  // 🔄 Charger les leçons quand chapter change
  useEffect(() => {
    if (!selectedChapter || !accessToken) return setLessons([]);
    setIsLoading(prev => ({...prev, lessons: true}));
    fetchLessons(selectedChapter, accessToken)
      .then(setLessons)
      .catch(console.error)
      .finally(() => setIsLoading(prev => ({...prev, lessons: false})));
  }, [selectedChapter, accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 font-['Inter']">
            Gestion des Leçons
          </h1>
          <p className="text-slate-600 text-lg font-light font-['Inter']">
            Organisez et gérez votre contenu pédagogique
          </p>
        </div>

        {/* Navigation en cascade */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cours Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 font-['Inter'] flex items-center gap-2">
                <span>📚</span>
                Cours
              </label>
              <div className="relative">
                <select
                  value={selectedCourse ?? ""}
                  onChange={(e) => setSelectedCourse(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white shadow-sm hover:shadow-md font-['Inter'] cursor-pointer"
                >
                  <option value="">Sélectionnez un cours</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  ▼
                </div>
                {isLoading.courses && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Niveaux Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 font-['Inter'] flex items-center gap-2">
                <span>📊</span>
                Niveau
              </label>
              <div className="relative">
                <select
                  value={selectedLevel ?? ""}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 appearance-none shadow-sm font-['Inter'] cursor-pointer ${
                    !levels.length 
                      ? 'border-slate-200 bg-slate-50 text-slate-400' 
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:shadow-md'
                  }`}
                  disabled={!levels.length}
                >
                  <option value="">Sélectionnez un niveau</option>
                  {levels.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                </select>
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  !levels.length ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  ▼
                </div>
                {isLoading.levels && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Chapitres Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 font-['Inter'] flex items-center gap-2">
                <span>📑</span>
                Chapitre
              </label>
              <div className="relative">
                <select
                  value={selectedChapter ?? ""}
                  onChange={(e) => setSelectedChapter(Number(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 appearance-none shadow-sm font-['Inter'] cursor-pointer ${
                    !chapters.length 
                      ? 'border-slate-200 bg-slate-50 text-slate-400' 
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white hover:shadow-md'
                  }`}
                  disabled={!chapters.length}
                >
                  <option value="">Sélectionnez un chapitre</option>
                  {chapters.map(ch => <option key={ch.id} value={ch.id}>{ch.title}</option>)}
                </select>
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  !chapters.length ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  ▼
                </div>
                {isLoading.chapters && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Indicateur de progression */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            {[selectedCourse, selectedLevel, selectedChapter].map((selected, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selected ? 'bg-green-500 scale-110' : 'bg-slate-300'
                }`} />
                {index < 2 && (
                  <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                  [selectedCourse, selectedLevel][index] ? 'bg-green-500' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-1">
            {selectedChapter && (
              <div className="animate-fade-in">
                <LessonForm 
                  chapterId={selectedChapter} 
                  refresh={() => fetchLessons(selectedChapter, accessToken).then(setLessons)} 
                />
              </div>
            )}
          </div>

          {/* Liste des leçons */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 font-['Inter']">
                  Leçons {lessons.length > 0 && `(${lessons.length})`}
                </h2>
                {isLoading.lessons && (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                )}
              </div>
              
              {lessons.length === 0 && !isLoading.lessons ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2 font-['Inter']">
                    Aucune leçon trouvée
                  </h3>
                  <p className="text-slate-500 font-['Inter']">
                    {selectedChapter 
                      ? "Commencez par créer votre première leçon" 
                      : "Sélectionnez un chapitre pour afficher les leçons"}
                  </p>
                </div>
              ) : (
                <LessonList lessons={lessons} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        select {
          background-image: none;
        }
        
        select:focus {
          outline: none;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}