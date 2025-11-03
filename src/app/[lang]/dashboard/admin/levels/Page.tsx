"use client";

import React, { useState, useEffect } from "react";
import { getCourses } from "@/app/[lang]/dashboard/admin/services/courseService";
import { addLevelToCourse, getLevelsByCourse } from "@/app/[lang]/dashboard/admin/services/levelService";
import { useAuth } from "@/app/contexts/AuthContext"; 

// Mapping des langues/cours vers les drapeaux
const courseFlags: Record<string, string> = {
  Japanese: "🇯🇵",
  Russian: "🇷🇺",
  English: "🇺🇸",
  Italian: "🇮🇹",
  Espagnol: "🇪🇸",
  Music: "🎵",
  Italien: "🇮🇹",
  Korean: "🇰🇷",
  Allemand: "🇩🇪",
};

interface Level {
  id: number;
  number: number;
  title: string;
  courseId: number;
}

interface Course {
  id: number;
  title: string;
  levels?: Level[];
}

export default function AddLevelForm() {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingLevels, setLoadingLevels] = useState<number[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const fetchLevelsForCourse = async (courseId: number) => {
    if (!accessToken) return;
    
    setLoadingLevels(prev => [...prev, courseId]);
    try {
      const levels = await getLevelsByCourse(courseId, accessToken);
      setCourses(prev => prev.map(course => 
        course.id === courseId ? { ...course, levels } : course
      ));
    } catch (err) {
      console.error("Erreur lors du chargement des niveaux:", err);
    } finally {
      setLoadingLevels(prev => prev.filter(id => id !== courseId));
    }
  };

  const toggleCourseExpansion = async (courseId: number) => {
    const isExpanded = expandedCourses.includes(courseId);
    if (isExpanded) {
      setExpandedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      setExpandedCourses(prev => [...prev, courseId]);
      // Charger les niveaux si pas déjà chargés
      const course = courses.find(c => c.id === courseId);
      if (course && !course.levels) {
        await fetchLevelsForCourse(courseId);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return alert("Sélectionnez un cours !");
    if (!accessToken) return alert("Vous devez être connecté pour créer un level.");

    setSubmitting(true);
    try {
      await addLevelToCourse({ courseId: selectedCourse, number, title }, accessToken);
      alert("Level ajouté au cours !");
      setTitle("");
      setNumber(1);
      setShowForm(false);
      
      // Recharger les niveaux du cours
      if (expandedCourses.includes(selectedCourse)) {
        await fetchLevelsForCourse(selectedCourse);
      }
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'ajout du level");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des niveaux</h1>
        <p className="text-gray-600">Sélectionnez un cours pour ajouter un nouveau niveau ou voir la liste existante</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id} 
            className={`bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden border-2 ${
              selectedCourse === course.id 
                ? "border-blue-500 shadow-lg transform scale-105" 
                : "border-gray-200 hover:shadow-lg hover:border-gray-300"
            }`}
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => {
                setSelectedCourse(course.id);
                setShowForm(true);
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{courseFlags[course.title] || "🏳️"}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  selectedCourse === course.id ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Cliquez pour ajouter un niveau</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCourseExpansion(course.id);
                  }}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>{expandedCourses.includes(course.id) ? 'Masquer' : 'Voir'} les niveaux</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${expandedCourses.includes(course.id) ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Liste des niveaux */}
            {expandedCourses.includes(course.id) && (
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Niveaux ({course.levels?.length || 0})
                </h4>
                
                {loadingLevels.includes(course.id) ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : course.levels && course.levels.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {course.levels
                      .sort((a, b) => a.number - b.number)
                      .map(level => (
                        <div 
                          key={level.id} 
                          className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                {level.number}
                              </div>
                              <span className="font-medium text-gray-800">{level.title}</span>
                            </div>
                            <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                              ID: {level.id}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                    </svg>
                    <p>Aucun niveau créé pour ce cours</p>
                    <p className="text-sm mt-1">Ajoutez le premier niveau !</p>
                  </div>
                )}
              </div>
            )}

            {/* Formulaire d'ajout de niveau */}
            {selectedCourse === course.id && showForm && (
              <div className="border-t border-gray-200 bg-blue-50 p-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouveau niveau
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro du niveau
                    </label>
                    <input 
                      type="number" 
                      value={number} 
                      onChange={e => setNumber(Number(e.target.value))}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du niveau
                    </label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Débutant, Intermédiaire..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Ajout en cours...
                      </span>
                    ) : "Ajouter le niveau"}
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {courses.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Aucun cours disponible</h3>
          <p className="text-gray-500">Les cours apparaîtront ici une fois créés.</p>
        </div>
      )}
    </div>
  );
}