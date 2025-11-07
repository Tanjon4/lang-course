"use client";

import { useState, useEffect } from "react";
import { useChapterApi } from "./services/api";
import ChapterForm from "./components/ChapterForm";
import ChapterList from "./components/ChapterList";
import { Chapter, Course, Level } from "@/app/[lang]/dashboard/admin/chapters/types";

export default function ChapterPage() {
  const api = useChapterApi();

  const [courses, setCourses] = useState<Course[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    api.getCourses().then(setCourses);
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    api.getLevels(selectedCourse).then(setLevels);
  }, [selectedCourse]);

  useEffect(() => {
    if (!selectedLevel) return;
    setLoading(true);
    api.getChapters(selectedLevel)
      .then(setChapters)
      .finally(() => setLoading(false));
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
        setChapters(chapters.map((ch) => (ch.id === updated.id ? updated : ch)));
      } else {
        const newChapter = await api.createChapter({
          ...data,
          level: selectedLevel,
        });
        setChapters([...chapters, newChapter]);
      }

      setShowForm(false);
      setEditingChapter(null);
    } catch (err: any) {
      alert("Erreur lors de la sauvegarde : " + err.message);
    }
  };

  const handleEditChapter = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setShowForm(true);
  };

  const handleDeleteChapter = async (id: number) => {
    if (!confirm("Supprimer ce chapitre ?")) return;
    try {
      await api.deleteChapter(id);
      setChapters(chapters.filter((ch) => ch.id !== id));
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-2">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Gestion des Chapitres
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Organisez et structurez votre contenu pédagogique avec élégance
          </p>
        </div>

        {/* Course and Level Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
              📖 Cours
            </label>
            <select
              value={selectedCourse ?? ""}
              onChange={(e) => setSelectedCourse(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 text-slate-700 font-medium"
            >
              <option value="" className="text-slate-400">Choisir un cours</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id} className="py-2">{c.title}</option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
              <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                🎯 Niveau
              </label>
              <select
                value={selectedLevel ?? ""}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 text-slate-700 font-medium"
              >
                <option value="" className="text-slate-400">Choisir un niveau</option>
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id} className="py-2">
                    Niveau {lvl.number} - {lvl.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Chapters Section */}
        {selectedLevel && (
          <div className="animate-fade-in-up">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Chapitres</h2>
                <p className="text-slate-600 mt-1">
                  {chapters.length} chapitre{chapters.length !== 1 ? 's' : ''} disponible{chapters.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                onClick={() => { setShowForm(true); setEditingChapter(null); }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">+</span>
                  Nouveau Chapitre
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto transform animate-scale-in">
                  <ChapterForm
                    initialData={editingChapter}
                    onSave={handleSaveChapter}
                    onCancel={() => { setShowForm(false); setEditingChapter(null); }}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-pulse flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full animate-spin"></div>
                  <p className="text-slate-600 font-medium">Chargement des chapitres...</p>
                </div>
              </div>
            ) : (
              <ChapterList
                chapters={chapters}
                onUpdate={handleEditChapter}
                onDelete={handleDeleteChapter}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}