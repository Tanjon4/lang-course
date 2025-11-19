"use client";

import React, { useState, useEffect } from "react";
import { getCourses } from "@/app/[lang]/dashboard/admin/services/courseService";
import { addLevelToCourse, getLevelsByCourse, updateLevel, deleteLevel } from "@/app/[lang]/dashboard/admin/services/levelService";
import { useAuth } from "@/app/contexts/AuthContext";
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiCheck } from "react-icons/fi";

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
      await fetchLevelsForCourse(selectedCourse.id);
      alert("Niveau ajouté avec succès !");
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'ajout du niveau");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateLevel = async (level: Level) => {
    if (!accessToken) return;
    try {
      await updateLevel(level.id, level, accessToken);
      setEditingLevel(null);
      if (selectedCourse) await fetchLevelsForCourse(selectedCourse.id);
      alert("Niveau mis à jour !");
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
      alert("Niveau supprimé !");
    } catch (err: any) {
      alert(err.message || "Erreur lors de la suppression");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gestion des Niveaux
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ajoutez, modifiez ou supprimez les niveaux de vos cours facilement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiSearch className="text-blue-600" /> Cours
            </h2>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    selectedCourse?.id === course.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedCourse(course);
                    fetchLevelsForCourse(course.id);
                  }}
                >
                  <span className="text-2xl">{courseFlags[course.title] || "🏳️"}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.levels?.length || 0} niveau{course.levels?.length !== 1 ? 'x' : ''}</p>
                  </div>
                  {selectedCourse?.id === course.id && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
              ))}
              {filteredCourses.length === 0 && <p className="text-gray-500 text-center py-8">Aucun cours trouvé</p>}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-8">
          {selectedCourse ? (
            <>
              {/* En-tête du cours */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{courseFlags[selectedCourse.title] || "🏳️"}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                    <p className="text-gray-600">{selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-mono">#{selectedCourse.id}</span>
              </div>

              {/* Formulaire de création */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FiPlus className="text-green-600" /> Ajouter un Nouveau Niveau
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numéro *</label>
                    <input type="number" min="1" value={number} onChange={e => setNumber(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                      placeholder="Ex: Débutant, Intermédiaire..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="col-span-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus /> {submitting ? "Création..." : "Créer le Niveau"}
                  </button>
                </form>
              </div>

              {/* Liste des niveaux en grille */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FiCheck className="text-blue-600" /> Niveaux Existants
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''}
                  </span>
                </div>

                {loadingLevels.includes(selectedCourse.id) ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                  </div>
                ) : selectedCourse.levels && selectedCourse.levels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {selectedCourse.levels.sort((a,b)=>a.number-b.number).map(level => (
                      <div key={level.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer relative">
                        
                        <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-lg shadow-md">
                          {level.number}
                        </div>

                        <h4 className="font-semibold text-gray-800 text-lg mt-3">{level.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">ID: {level.id}</p>

                        <div className="flex gap-2 mt-4">
                          <button 
                            onClick={() => setEditingLevel(level)} 
                            className="flex-1 p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 transition-colors"
                          >
                            <FiEdit /> Modifier
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(level.id)} 
                            className="flex-1 p-2 text-white bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center gap-2 transition-colors"
                          >
                            <FiTrash2 /> Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    <div className="text-7xl mb-4">📚</div>
                    <p className="text-lg">Aucun niveau créé. Ajoutez-en un pour commencer !</p>
                  </div>
                )}
              </div>

            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Sélectionnez un Cours</h3>
              <p className="text-gray-500 max-w-md mx-auto">Choisissez un cours dans la liste de gauche pour commencer à gérer ses niveaux.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
