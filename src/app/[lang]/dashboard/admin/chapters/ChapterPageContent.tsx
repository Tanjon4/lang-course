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
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📚 Gestion des Chapitres</h1>

      <div className="flex items-center gap-2">
        <label className="font-semibold">Cours :</label>
        <select
          value={selectedCourse ?? ""}
          onChange={(e) => setSelectedCourse(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value="">-- Choisir un cours --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="flex items-center gap-2">
          <label className="font-semibold">Niveau :</label>
          <select
            value={selectedLevel ?? ""}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value="">-- Choisir un niveau --</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                Level {lvl.number} - {lvl.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLevel && (
        <>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => { setShowForm(true); setEditingChapter(null); }}
          >
            ➕ Nouveau Chapitre
          </button>

          {showForm && (
            <ChapterForm
              initialData={editingChapter}
              onSave={handleSaveChapter}
              onCancel={() => { setShowForm(false); setEditingChapter(null); }}
            />
          )}

          {loading ? <p>Chargement des chapitres...</p> : (
            <ChapterList
              chapters={chapters}
              onUpdate={handleEditChapter}
              onDelete={handleDeleteChapter}
            />
          )}
        </>
      )}
    </div>
  );
}
