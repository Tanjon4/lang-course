"use client";

import React, { useState } from "react";
import { Lesson } from "../services/types";
import { deleteLesson, updateLesson } from "../services/api";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";

interface LessonListProps {
  lessons: Lesson[];
  refresh?: () => void; // fonction pour recharger la liste après modification
}

export default function LessonList({ lessons, refresh }: LessonListProps) {
  const { accessToken } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedNumber, setEditedNumber] = useState(1);

  const startEdit = (lesson: Lesson) => {
    setEditingId(lesson.id);
    setEditedTitle(lesson.title);
    setEditedNumber(lesson.number);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (lesson: Lesson) => {
    if (!accessToken) return toast.error("Utilisateur non authentifié");
    const formData = new FormData();
    formData.append("title", editedTitle);
    formData.append("number", editedNumber.toString());

    try {
      await updateLesson(lesson.id, formData, accessToken);
      toast.success("Leçon mise à jour !");
      setEditingId(null);
      refresh?.();
    } catch (err: any) {
      toast.error("Erreur : " + err.message);
    }
  };

  const handleDelete = async (lesson: Lesson) => {
    if (!accessToken) return toast.error("Utilisateur non authentifié");
    if (!confirm(`Supprimer la leçon "${lesson.title}" ?`)) return;

    try {
      await deleteLesson(lesson.id, accessToken);
      toast.success("Leçon supprimée !");
      refresh?.();
    } catch (err: any) {
      toast.error("Erreur : " + err.message);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">📚 Liste des leçons</h2>
      {lessons.length === 0 ? (
        <p>Aucune leçon disponible.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Titre</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td className="border p-2 text-center">{lesson.number}</td>
                <td className="border p-2">
                  {editingId === lesson.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    lesson.title
                  )}
                </td>
                <td className="border p-2 text-center space-x-2">
                  {editingId === lesson.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(lesson)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        💾
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(lesson)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(lesson)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
