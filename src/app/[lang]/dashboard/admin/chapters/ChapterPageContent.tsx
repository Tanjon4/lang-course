"use client";

import { useState, useEffect } from "react";
import { useChapterApi } from "./services/api";
import ChapterForm from "./components/ChapterForm";
import ChapterList from "./components/ChapterList";
import { Chapter, Course, Level } from "@/app/[lang]/dashboard/admin/chapters/types";

export default function ChapterPage() {
  const api = useChapterApi();

  const [courses, setCourses] = useState<Course[]>([]);
  const [allLevels, setAllLevels] = useState<Level[]>([]); // Tous les niveaux chargés
  const [filteredLevels, setFilteredLevels] = useState<Level[]>([]); // Niveaux filtrés par cours
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState({
    courses: false,
    levels: false,
    chapters: false
  });
  const [showForm, setShowForm] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Charger tous les cours au montage
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(prev => ({ ...prev, courses: true }));
      try {
        const coursesData = await api.getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error("Erreur lors du chargement des cours:", error);
        alert("Erreur lors du chargement des cours");
      } finally {
        setLoading(prev => ({ ...prev, courses: false }));
      }
    };

    loadCourses();
  }, []);

  // Construire la liste complète des niveaux depuis les cours (levels imbriqués)
  useEffect(() => {
    if (courses.length === 0) {
      setAllLevels([]);
      return;
    }

    setLoading(prev => ({ ...prev, levels: true }));
    setIsAnimating(true);

    try {
      const levels = courses.flatMap(course =>
        (course.levels || []).map(level => ({
          ...level,
          course: course.id // on ajoute course pour faciliter le filtrage
        }))
      );
      setAllLevels(levels);
    } catch (error) {
      console.error("Erreur lors de la construction des niveaux:", error);
      setAllLevels([]);
    } finally {
      setLoading(prev => ({ ...prev, levels: false }));
      setTimeout(() => setIsAnimating(false), 600);
    }
  }, [courses]);

  // Filtrer les niveaux quand un cours est sélectionné
  useEffect(() => {
    if (selectedCourse === null) {
      setFilteredLevels([]);
      setSelectedLevel(null);
      setChapters([]);
      return;
    }

    // Filtrer les niveaux pour n'afficher que ceux du cours sélectionné
    const levelsForCourse = allLevels.filter(level => level.course === selectedCourse);

    setFilteredLevels(levelsForCourse);
    setSelectedLevel(null);
    setChapters([]);

    // Animation de transition
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [selectedCourse, allLevels]);

  // Charger les chapitres quand un niveau est sélectionné
  useEffect(() => {
    if (selectedLevel === null) {
      setChapters([]);
      return;
    }

    setLoading(prev => ({ ...prev, chapters: true }));
    api.getChapters(selectedLevel)
      .then(setChapters)
      .catch(err => {
        console.error("Erreur lors du chargement des chapitres:", err);
        alert("Erreur lors du chargement des chapitres");
        setChapters([]);
      })
      .finally(() => setLoading(prev => ({ ...prev, chapters: false })));
  }, [selectedLevel]);

  const handleSaveChapter = async (data: Partial<Chapter>) => {
    if (!selectedLevel) return;

    try {
      if (!data.title || !data.number) {
        alert("Veuillez renseigner le titre et le numéro du chapitre");
        return;
      }

      if (editingChapter) {
        const updated = await api.updateChapter(editingChapter.id, {
          ...data,
          level: selectedLevel,
        });
        setChapters(prev => prev.map((ch) => (ch.id === updated.id ? updated : ch)));
      } else {
        const newChapter = await api.createChapter({
          ...data,
          level: selectedLevel,
        });
        setChapters(prev => [...prev, newChapter]);
      }

      setShowForm(false);
      setEditingChapter(null);
    } catch (err: any) {
      console.error("Erreur lors de la sauvegarde:", err);
      alert("Erreur lors de la sauvegarde : " + (err.message || "Erreur inconnue"));
    }
  };

  const handleEditChapter = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setShowForm(true);
  };

  const handleDeleteChapter = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce chapitre ?")) return;

    try {
      await api.deleteChapter(id);
      setChapters(prev => prev.filter((ch) => ch.id !== id));
    } catch (err: any) {
      console.error("Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression : " + (err.message || "Erreur inconnue"));
    }
  };

  const handleCourseChange = (courseId: number) => {
    setSelectedCourse(courseId);
    // reset sélection de niveau et chapitres (l'effet de filtrage les remettra à jour)
    setSelectedLevel(null);
    setChapters([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#f8fafc] to-[#ecfdf5] p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header avec animation spectaculaire */}
        <div className="text-left">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3BA1C5] via-[#2D8BAC] to-[#4ECDC4] bg-clip-text text-transparent animate-gradient-x">
            Gestion des Chapitres
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#3BA1C5] to-[#4ECDC4] rounded-full mt-2 animate-pulse"></div>
        </div>

        {/* Contenu principal avec animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Box de gauche - Cours et Niveaux */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
              {/* Section Cours */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#3BA1C5] rounded-full animate-bounce"></div>
                  <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Cours
                  </h2>
                  {loading.courses && (
                    <div className="w-4 h-4 border-2 border-[#3BA1C5] border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                <div className="space-y-3">
                  <select
                    value={selectedCourse ?? ""}
                    onChange={(e) => handleCourseChange(Number(e.target.value))}
                    disabled={loading.courses}
                    className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#3BA1C5] focus:ring-4 focus:ring-[#3BA1C5]/20 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 font-medium transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" className="text-gray-500 py-3">
                      {loading.courses ? '🔄 Chargement...' : '🎓 Sélectionner un cours'}
                    </option>
                    {courses.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}
                        className="py-3 transform transition-all duration-300 hover:bg-[#3BA1C5] hover:text-white"
                      >
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section Niveaux avec animation */}
              <div className={`transition-all duration-500 ${selectedCourse ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#4ECDC4] rounded-full animate-ping"></div>
                  <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Niveaux
                  </h2>
                  {selectedCourse && (
                    <span className="bg-[#4ECDC4] text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      {filteredLevels.length}
                    </span>
                  )}
                  {loading.levels && (
                    <div className="w-4 h-4 border-2 border-[#4ECDC4] border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                <div className="space-y-3">
                  <select
                    value={selectedLevel ?? ""}
                    onChange={(e) => setSelectedLevel(Number(e.target.value))}
                    disabled={selectedCourse === null || loading.levels || filteredLevels.length === 0}
                    className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-500 bg-white/90 backdrop-blur-sm text-gray-900 font-medium transform hover:scale-[1.02] shadow-lg ${
                      selectedCourse !== null && filteredLevels.length > 0 && !loading.levels
                        ? 'border-[#4ECDC4] focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/20 cursor-pointer'
                        : 'border-gray-200 cursor-not-allowed'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="" className="text-gray-500 py-3">
                      {loading.levels ? '🔄 Chargement...' :
                       selectedCourse === null ? '📚 Sélectionnez d\'abord un cours' :
                       filteredLevels.length === 0 ? '📭 Aucun niveau disponible' :
                       '📚 Sélectionner un niveau'}
                    </option>
                    {filteredLevels.map((lvl) => (
                      <option
                        key={lvl.id}
                        value={lvl.id}
                        className="py-3 transform transition-all duration-300 hover:bg-[#4ECDC4] hover:text-white"
                      >
                        🎯 Niveau {lvl.number} - {lvl.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Indicateurs visuels */}
                {selectedCourse !== null && filteredLevels.length === 0 && !loading.levels && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">!</span>
                      </div>
                      <p className="text-amber-700 text-sm">
                        Aucun niveau créé dans ce cours
                      </p>
                    </div>
                  </div>
                )}

                {selectedCourse !== null && filteredLevels.length > 0 && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <p className="text-emerald-700 text-sm text-center">
                      ✅ {filteredLevels.length} niveau{filteredLevels.length > 1 ? 'x' : ''} disponible{filteredLevels.length > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Box de droite - Chapitres avec animations */}
          <div className="lg:col-span-2">
            <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 transition-all duration-700 ${
              selectedLevel ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
            }`}>
              {/* Header avec bouton Ajouter */}
              <div className="flex items-center justify-between mb-6">
                <div className="transform transition-all duration-500 hover:scale-105">
                  <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Chapitres
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 transform transition-all duration-300">
                    {selectedLevel
                      ? `📚 ${chapters?.length || 0} chapitre${chapters?.length !== 1 ? 's' : ''} disponible${chapters?.length !== 1 ? 's' : ''}`
                      : "👆 Sélectionnez un niveau pour afficher les chapitres"
                    }
                  </p>
                </div>

                {selectedLevel && (
                  <button
                    className="group bg-gradient-to-r from-[#3BA1C5] to-[#4ECDC4] text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 hover:from-[#4ECDC4] hover:to-[#3BA1C5] animate-pulse hover:animate-none"
                    onClick={() => { setShowForm(true); setEditingChapter(null); }}
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="bg-white/20 px-2 py-1 rounded-lg">✨ Ajouter</span>
                    </span>
                  </button>
                )}
              </div>

              {/* Contenu des chapitres avec animations */}
              <div className="min-h-[500px] transform transition-all duration-500">
                {!selectedLevel ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400 transform transition-all duration-500 hover:scale-105">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-float">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg font-semibold text-center animate-pulse">
                      🎯 Veuillez sélectionner un cours et un niveau
                    </p>
                    <p className="text-gray-400 text-sm text-center mt-2">
                      pour afficher la liste des chapitres
                    </p>
                  </div>
                ) : loading.chapters ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center space-y-6 transform transition-all duration-300">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-[#3BA1C5] border-t-transparent rounded-full animate-spin shadow-2xl"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-[#4ECDC4] border-b-transparent rounded-full animate-spin reverse"></div>
                      </div>
                      <p className="text-gray-600 text-lg font-medium bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                        Chargement des chapitres...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="transform transition-all duration-700">
                    <ChapterList
                      chapters={chapters || []}
                      onUpdate={handleEditChapter}
                      onDelete={handleDeleteChapter}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal pour ajouter/modifier un chapitre avec animation spectaculaire */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-3xl max-w-2xl w-full mx-auto transform animate-scaleIn">
              <div className="border-b border-gray-200/50 px-8 py-6 bg-gradient-to-r from-gray-50 to-white rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-[#3BA1C5] to-[#4ECDC4] bg-clip-text text-transparent">
                    {editingChapter ? '✏️ Modifier le chapitre' : '✨ Ajouter un nouveau chapitre'}
                  </h3>
                  <button
                    onClick={() => { setShowForm(false); setEditingChapter(null); }}
                    className="text-gray-400 hover:text-red-500 transform hover:scale-125 hover:rotate-90 transition-all duration-300 p-2 rounded-full hover:bg-red-50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-white to-gray-50/50 rounded-b-3xl">
                <ChapterForm
                  initialData={editingChapter}
                  onSave={handleSaveChapter}
                  onCancel={() => { setShowForm(false); setEditingChapter(null); }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles d'animation CSS */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .animate-spin.reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}
