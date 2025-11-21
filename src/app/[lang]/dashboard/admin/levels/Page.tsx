"use client";

import React, { useState, useEffect } from "react";
import { getCourses } from "@/app/[lang]/dashboard/admin/services/courseService";
import { addLevelToCourse, getLevelsByCourse, updateLevel, deleteLevel } from "@/app/[lang]/dashboard/admin/services/levelService";
import { useAuth } from "@/app/contexts/AuthContext";
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiCheck, FiClock, FiX, FiSave, FiList, FiBook, FiArchive, FiFolder, FiLayers, FiBarChart2, FiGrid } from "react-icons/fi";

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
  updatedAt?: string;
}

interface Course {
  id: number;
  title: string;
  levels?: Level[];
}

export default function LevelManager() {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingLevels, setLoadingLevels] = useState<number[]>([]);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [modificationHistory, setModificationHistory] = useState<Level[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editNumber, setEditNumber] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [titleColor, setTitleColor] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation de changement de couleur du titre
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleColor((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      const history = levels.slice(-5).reverse();
      setModificationHistory(history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLevels(prev => prev.filter(id => id !== courseId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return alert("Sélectionnez un cours !");
    if (!accessToken) return alert("Vous devez être connecté pour créer un niveau.");

    setSubmitting(true);
    try {
      await addLevelToCourse({ courseId: selectedCourse.id, number, title }, accessToken);
      setTitle("");
      setNumber(1);
      setShowAddModal(false);
      await fetchLevelsForCourse(selectedCourse.id);
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'ajout du niveau");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateLevel = async () => {
    if (!editingLevel || !accessToken) return;
    
    try {
      const updatedLevel = {
        ...editingLevel,
        title: editTitle,
        number: editNumber
      };
      
      await updateLevel(editingLevel.id, updatedLevel, accessToken);
      setEditingLevel(null);
      setEditTitle("");
      setEditNumber(1);
      if (selectedCourse) await fetchLevelsForCourse(selectedCourse.id);
    } catch (err: any) {
      alert(err.message || "Erreur lors de la mise à jour");
    }
  };

  const handleDeleteLevel = async (levelId: number) => {
    if (!accessToken) return;
    try {
      await deleteLevel(levelId, accessToken);
      setShowDeleteConfirm(null);
      if (selectedCourse) await fetchLevelsForCourse(selectedCourse.id);
    } catch (err: any) {
      alert(err.message || "Erreur lors de la suppression");
    }
  };

  const startEditing = (level: Level) => {
    setEditingLevel(level);
    setEditTitle(level.title);
    setEditNumber(level.number);
  };

  const cancelEditing = () => {
    setEditingLevel(null);
    setEditTitle("");
    setEditNumber(1);
  };

  // Calcul des statistiques pour les cercles
  const totalCourses = courses.length;
  const totalLevels = courses.reduce((total, course) => total + (course.levels?.length || 0), 0);
  const averageLevels = totalCourses > 0 ? (totalLevels / totalCourses).toFixed(1) : "0";

  const getTitleGradient = () => {
    switch(titleColor) {
      case 0: return "from-blue-500 to-cyan-400";
      case 1: return "from-purple-500 to-pink-500";
      case 2: return "from-green-500 to-emerald-400";
      case 3: return "from-gray-800 to-gray-600";
      default: return "from-blue-500 to-cyan-400";
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 w-12 h-12 border-4 border-purple-500 border-b-transparent rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header avec dégradé animé */}
      <div className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm rounded-xl p-6 -mx-6 mt-6 border border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="text-left space-y-2">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent font-sans animate-gradient-shift`}>
            Gestion des Niveaux
          </h1>
          <p className="text-gray-600 font-light animate-fade-in-delayed">
            Organisez et gérez les niveaux de vos cours avec précision
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-[600px] mt-8">

        {/* Colonne 1 : Liste des cours */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6 animate-float-in-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500 rounded-lg animate-pulse-gentle">
              <FiFolder className="text-white text-lg" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 font-sans">
              Cours Disponibles
            </h2>
          </div>

          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-bounce-soft" />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white font-sans animate-input-glow"
            />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-500 flex items-center gap-4 transform hover:scale-105 ${
                  selectedCourse?.id === course.id
                    ? "border-blue-500 bg-blue-50 shadow-lg animate-selected-pulse"
                    : "border-blue-100 hover:border-blue-300 hover:bg-blue-50"
                } animate-stagger-bounce`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSelectedCourse(course);
                  fetchLevelsForCourse(course.id);
                }}
              >
                <span className="text-xl animate-flag-wiggle">{courseFlags[course.title] || "📚"}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate font-sans">{course.title}</h3>
                  <p className="text-sm text-blue-600 font-sans">
                    {course.levels?.length || 0} niveau{course.levels?.length !== 1 ? 'x' : ''}
                  </p>
                </div>
                {selectedCourse?.id === course.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping-slow"></div>
                )}
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="text-center py-8 text-gray-500 animate-fade-in-up">
                <FiFolder className="text-4xl mx-auto mb-2 text-blue-300 animate-float-gentle" />
                <p className="font-sans">Aucun cours trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne 2 : Cours sélectionné et niveaux */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-6 animate-float-in-up">
          {selectedCourse ? (
            <div className="space-y-6">
              {/* En-tête du cours */}
              <div className="flex items-center justify-between pb-4 border-b border-green-200 animate-slide-in-right">
                <div className="flex items-center gap-4">
                  <span className="text-2xl animate-flag-spin">{courseFlags[selectedCourse.title] || "📚"}</span>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 font-sans animate-text-glow">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-green-600 font-sans">
                      {selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 transition-all duration-300 transform hover:scale-110 font-medium font-sans animate-pulse-soft"
                >
                  <FiPlus className="text-sm" /> Ajouter
                </button>
              </div>

              {/* Liste des niveaux */}
              <div>
                <div className="flex items-center gap-3 mb-4 animate-fade-in-delayed">
                  <div className="p-2 bg-green-500 rounded-lg animate-rotate-slow">
                    <FiLayers className="text-white text-lg" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 font-sans">
                    Niveaux Existants
                  </h3>
                </div>

                {loadingLevels.includes(selectedCourse.id) ? (
                  <div className="flex justify-center py-8">
                    <div className="relative animate-bounce-rotate">
                      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-2 w-8 h-8 border-4 border-emerald-400 border-b-transparent rounded-full animate-spin-reverse"></div>
                    </div>
                  </div>
                ) : selectedCourse.levels && selectedCourse.levels.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCourse.levels.sort((a,b)=>a.number-b.number).map((level, index) => (
                      <div 
                        key={level.id} 
                        className="border border-green-200 rounded-lg p-4 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-stagger-spring"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        {editingLevel?.id === level.id ? (
                          // Mode édition
                          <div className="space-y-3 animate-scale-spring">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700 font-sans">Niveau</span>
                              <input
                                type="number"
                                value={editNumber}
                                onChange={(e) => setEditNumber(Number(e.target.value))}
                                className="w-20 px-3 py-2 border border-green-300 rounded-lg text-sm font-sans animate-input-pop"
                              />
                            </div>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-3 py-2 border border-green-300 rounded-lg font-sans focus:ring-2 focus:ring-green-500 focus:border-green-500 animate-input-pop-delayed"
                              placeholder="Titre du niveau..."
                            />
                            <div className="flex gap-2">
                              <button 
                                onClick={handleUpdateLevel}
                                className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 text-sm font-medium font-sans hover:bg-green-600 animate-hover-lift"
                              >
                                <FiSave /> Sauvegarder
                              </button>
                              <button 
                                onClick={cancelEditing}
                                className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 text-sm font-medium font-sans hover:bg-gray-600 animate-hover-lift"
                              >
                                <FiX /> Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Mode affichage
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center font-medium font-sans animate-pulse-very-soft">
                                {level.number}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 font-sans animate-text-slide">{level.title}</h4>
                                <p className="text-sm text-green-600 font-sans">ID: {level.id}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => startEditing(level)} 
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-125 font-sans animate-hover-bounce"
                                title="Modifier"
                              >
                                <FiEdit />
                              </button>
                              <button 
                                onClick={() => setShowDeleteConfirm(level.id)} 
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-125 font-sans animate-hover-bounce"
                                title="Supprimer"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 animate-bounce-in-soft">
                    <FiLayers className="text-5xl mx-auto mb-3 text-green-300 animate-float-gentle" />
                    <p className="font-sans text-lg">Aucun niveau créé</p>
                    <p className="text-sm text-green-600 mt-1 font-sans">Ajoutez un niveau pour commencer</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 animate-pulse-very-soft">
              <FiGrid className="text-5xl mx-auto mb-3 text-green-300 animate-rotate-slow" />
              <h3 className="text-lg font-medium text-gray-700 mb-2 font-sans">Sélectionnez un Cours</h3>
              <p className="text-sm font-sans">Choisissez un cours dans la liste pour voir ses niveaux</p>
            </div>
          )}
        </div>

        {/* Colonne 3 : Historique des modifications avec cercles statistiques */}
        <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6 animate-float-in-right">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500 rounded-lg animate-pulse-gentle">
              <FiBarChart2 className="text-white text-lg" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 font-sans">
              Historique des Modifications
            </h2>
          </div>

          {modificationHistory.length > 0 ? (
            <div className="space-y-3 mb-8">
              {modificationHistory.map((level, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded-r-lg transform hover:scale-105 transition-all duration-300 animate-stagger-slide-in"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900 font-sans">{level.title}</h4>
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium font-sans">
                      Niv. {level.number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-purple-600 font-sans">
                    <span>ID: {level.id}</span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-purple-500 animate-pulse-very-soft" />
                      Modifié
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 animate-fade-in-up mb-8">
              <FiBarChart2 className="text-4xl mx-auto mb-3 text-purple-300 animate-float-gentle" />
              <p className="font-sans">Aucune modification récente</p>
              <p className="text-sm text-purple-600 mt-1 font-sans">L'historique apparaîtra ici</p>
            </div>
          )}

          {/* Cercles Statistiques avec Légende */}
          <div className="mt-8 pt-6 border-t border-purple-200">
            <h4 className="font-medium text-gray-800 mb-6 font-sans text-center">Statistiques Globales</h4>
            <div className="grid grid-cols-2 gap-6">
              {/* Cercle Cours */}
              <div className="text-center animate-scale-in">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="0"
                      className="animate-circle-draw"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600 font-sans">{totalCourses}</span>
                  </div>
                </div>
                <p className="text-xs text-blue-600 font-medium font-sans">Cours Total</p>
              </div>

              {/* Cercle Niveaux */}
              <div className="text-center animate-scale-in-delayed">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="0"
                      className="animate-circle-draw-delayed"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600 font-sans">{totalLevels}</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 font-medium font-sans">Niveaux Total</p>
              </div>
            </div>
            
            {/* Légende */}
            <div className="mt-6 space-y-2 animate-fade-in-up">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 font-sans">Cours créés</span>
                </div>
                <span className="font-medium text-blue-600 font-sans">{totalCourses}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 font-sans">Niveaux total</span>
                </div>
                <span className="font-medium text-green-600 font-sans">{totalLevels}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 font-sans">Moyenne/niveau</span>
                </div>
                <span className="font-medium text-purple-600 font-sans">{averageLevels}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout de niveau */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-blur">
          <div className="bg-white rounded-2xl shadow-2xl border border-green-200 max-w-md w-full p-6 animate-modal-pop">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 font-sans">Ajouter un Niveau</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-all duration-300 transform hover:scale-125"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Numéro</label>
                <input 
                  type="number" 
                  min="1" 
                  value={number} 
                  onChange={e => setNumber(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-sans animate-input-focus"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Titre</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Débutant, Intermédiaire..."
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-sans animate-input-focus"
                  required 
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-sans"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium font-sans"
                >
                  <FiPlus /> {submitting ? "Création..." : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-blur">
          <div className="bg-white rounded-2xl shadow-2xl border border-red-200 max-w-sm w-full p-6 animate-modal-shake">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-alert">
                <FiTrash2 className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2 font-sans">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6 text-sm font-sans">
                Êtes-vous sûr de vouloir supprimer ce niveau ? Cette action est irréversible.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 text-sm font-sans"
                >
                  Annuler
                </button>
                <button 
                  onClick={() => handleDeleteLevel(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 text-sm font-sans"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles CSS pour les animations extravagantes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInBlur {
          from { 
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatInLeft {
          from { 
            opacity: 0;
            transform: translateX(-50px) rotate(-5deg);
          }
          to { 
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
        }
        @keyframes floatInUp {
          from { 
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes floatInRight {
          from { 
            opacity: 0;
            transform: translateX(50px) rotate(5deg);
          }
          to { 
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes staggerBounce {
          0% { 
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          60% { 
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes staggerSpring {
          0% { 
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1) rotate(5deg);
          }
          100% { 
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes staggerSlideIn {
          from { 
            opacity: 0;
            transform: translateX(30px) skewX(-5deg);
          }
          to { 
            opacity: 1;
            transform: translateX(0) skewX(0deg);
          }
        }
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleSpring {
          0% { 
            transform: scale(0.5) rotate(-15deg);
            opacity: 0;
          }
          70% { 
            transform: scale(1.1) rotate(5deg);
            opacity: 1;
          }
          100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes modalPop {
          0% { 
            transform: scale(0.3) rotateX(45deg);
            opacity: 0;
          }
          70% { 
            transform: scale(1.05) rotateX(-5deg);
            opacity: 1;
          }
          100% { 
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        @keyframes modalShake {
          0%, 100% { transform: translateX(0) scale(1); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) scale(1.02); }
          20%, 40%, 60%, 80% { transform: translateX(5px) scale(1.02); }
        }
        @keyframes circleDraw {
          from { stroke-dashoffset: 251.2; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes inputGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        }
        @keyframes inputPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes inputFocus {
          0% { transform: scale(1); border-color: #d1d5db; }
          100% { transform: scale(1.01); border-color: #10b981; }
        }
        @keyframes selectedPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
        }
        @keyframes flagWiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(3deg) scale(1.05); }
          75% { transform: rotate(-3deg) scale(1.05); }
        }
        @keyframes flagSpin {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes bounceRotate {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        @keyframes hoverBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes hoverLift {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-2px) scale(1.05); }
        }
        @keyframes bounceInSoft {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pulseGentle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes pulseVerySoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes pulseAlert {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 0 rgba(59, 130, 246, 0); }
          50% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
        }
        @keyframes textSlide {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-fade-in-blur { animation: fadeInBlur 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out; }
        .animate-float-in-left { animation: floatInLeft 0.8s ease-out; }
        .animate-float-in-up { animation: floatInUp 0.8s ease-out; }
        .animate-float-in-right { animation: floatInRight 0.8s ease-out; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite; 
        }
        .animate-stagger-bounce { animation: staggerBounce 0.6s ease-out forwards; }
        .animate-stagger-spring { animation: staggerSpring 0.7s ease-out forwards; }
        .animate-stagger-slide-in { animation: staggerSlideIn 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.6s ease-out; }
        .animate-scale-spring { animation: scaleSpring 0.5s ease-out; }
        .animate-modal-pop { animation: modalPop 0.6s ease-out; }
        .animate-modal-shake { animation: modalShake 0.5s ease-in-out; }
        .animate-circle-draw { animation: circleDraw 1.5s ease-out forwards; }
        .animate-circle-draw-delayed { animation: circleDraw 1.5s ease-out 0.3s forwards; }
        .animate-input-glow { animation: inputGlow 2s ease-in-out infinite; }
        .animate-input-pop { animation: inputPop 0.3s ease-out; }
        .animate-input-pop-delayed { animation: inputPop 0.3s ease-out 0.1s; }
        .animate-input-focus { animation: inputFocus 0.3s ease-out; }
        .animate-selected-pulse { animation: selectedPulse 2s ease-in-out infinite; }
        .animate-flag-wiggle { animation: flagWiggle 2s ease-in-out infinite; }
        .animate-flag-spin { animation: flagSpin 3s linear infinite; }
        .animate-bounce-rotate { animation: bounceRotate 2s ease-in-out infinite; }
        .animate-hover-bounce { animation: hoverBounce 0.3s ease-out; }
        .animate-hover-lift { animation: hoverLift 0.3s ease-out; }
        .animate-bounce-in-soft { animation: bounceInSoft 0.8s ease-out; }
        .animate-bounce-soft { animation: bounceSoft 3s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulseGentle 2s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulseVerySoft 2s ease-in-out infinite; }
        .animate-pulse-very-soft { animation: pulseVerySoft 3s ease-in-out infinite; }
        .animate-pulse-alert { animation: pulseAlert 1s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotateSlow 4s linear infinite; }
        .animate-float-gentle { animation: floatGentle 3s ease-in-out infinite; }
        .animate-text-glow { animation: textGlow 2s ease-in-out infinite; }
        .animate-text-slide { animation: textSlide 0.5s ease-out; }
        .animate-spin-reverse { animation: spinReverse 1.5s linear infinite; }
        .animate-ping-slow { animation: pingSlow 2s ease-out infinite; }
        .animate-fade-in-delayed { animation: fadeIn 0.6s ease-out 0.3s forwards; }
        .animate-scale-in { animation: scaleSpring 0.5s ease-out; }
        .animate-scale-in-delayed { animation: scaleSpring 0.5s ease-out 0.2s forwards; }
      `}</style>
    </div>
  );
}