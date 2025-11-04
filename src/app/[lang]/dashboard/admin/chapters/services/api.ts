"use client";

import { Chapter, Level, Course } from "@/app/[lang]/dashboard/admin/chapters/types";
import { useAuth } from "@/app/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useChapterApi() {
  const { accessToken } = useAuth();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  // Gestion des réponses JSON, ignore si vide (utile pour DELETE)
  const handleResponse = async (res: Response) => {
    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Réponse API :", text);
      throw new Error(text || "Erreur API");
    }

    // Si réponse vide (204 No Content), retourne null
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  };

  // ✅ Récupération des cours
  const getCourses = async (): Promise<Course[]> => {
    const res = await fetch(`${API_URL}/courses/`, { headers });
    return handleResponse(res);
  };

  // ✅ Récupération des niveaux
  const getLevels = async (courseId: number): Promise<Level[]> => {
    const res = await fetch(`${API_URL}/levels/?course=${courseId}`, { headers });
    return handleResponse(res);
  };

  // ✅ Récupération des chapitres
  const getChapters = async (levelId: number): Promise<Chapter[]> => {
    const res = await fetch(`${API_URL}/chapters/?level=${levelId}`, { headers });
    return handleResponse(res);
  };

  // ✅ Création d’un chapitre
  const createChapter = async (data: Partial<Chapter>): Promise<Chapter> => {
    const res = await fetch(`${API_URL}/chapters/`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  };

  // ✅ Mise à jour d’un chapitre
  const updateChapter = async (id: number, data: Partial<Chapter>): Promise<Chapter> => {
    const res = await fetch(`${API_URL}/chapters/${id}/`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  };

  // ✅ Suppression d’un chapitre (robuste)
  const deleteChapter = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/chapters/${id}/`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Erreur lors de la suppression");
    }

    // Pas besoin de parser JSON, DELETE renvoie souvent vide
    return;
  };

  return {
    getCourses,
    getLevels,
    getChapters,
    createChapter,
    updateChapter,
    deleteChapter,
  };
}
