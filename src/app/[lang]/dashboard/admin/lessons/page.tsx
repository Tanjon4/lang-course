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

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  // 🔄 Charger les cours
  useEffect(() => {
    if (!accessToken) return;
    fetchCourses(accessToken).then(setCourses).catch(console.error);
  }, [accessToken]);

  // 🔄 Charger les niveaux quand course change
  useEffect(() => {
    if (!selectedCourse || !accessToken) return setLevels([]);
    fetchLevels(selectedCourse, accessToken).then(setLevels).catch(console.error);
  }, [selectedCourse, accessToken]);

  // 🔄 Charger les chapitres quand level change
  useEffect(() => {
    if (!selectedLevel || !accessToken) return setChapters([]);
    fetchChapters(selectedLevel, accessToken).then(setChapters).catch(console.error);
  }, [selectedLevel, accessToken]);

  // 🔄 Charger les leçons quand chapter change
  useEffect(() => {
    if (!selectedChapter || !accessToken) return setLessons([]);
    fetchLessons(selectedChapter, accessToken).then(setLessons).catch(console.error);
  }, [selectedChapter, accessToken]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des leçons</h1>

      {/* Dropdown Cours */}
      <select
        value={selectedCourse ?? ""}
        onChange={(e) => setSelectedCourse(Number(e.target.value))}
        className="border p-2"
      >
        <option value="">Sélectionnez un cours</option>
        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>

      {/* Dropdown Niveaux */}
      <select
        value={selectedLevel ?? ""}
        onChange={(e) => setSelectedLevel(Number(e.target.value))}
        className="border p-2"
        disabled={!levels.length}
      >
        <option value="">Sélectionnez un niveau</option>
        {levels.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
      </select>

      {/* Dropdown Chapitres */}
      <select
        value={selectedChapter ?? ""}
        onChange={(e) => setSelectedChapter(Number(e.target.value))}
        className="border p-2"
        disabled={!chapters.length}
      >
        <option value="">Sélectionnez un chapitre</option>
        {chapters.map(ch => <option key={ch.id} value={ch.id}>{ch.title}</option>)}
      </select>

      {/* Formulaire d'ajout */}
      {selectedChapter && <LessonForm chapterId={selectedChapter} refresh={() => fetchLessons(selectedChapter, accessToken).then(setLessons)} />}

      {/* Liste des leçons */}
      <LessonList lessons={lessons} />
    </div>
  );
}
