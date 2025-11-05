import { Course, Level, Chapter, Lesson } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Helper fetch avec token JWT
async function fetchWithToken(url: string, options: RequestInit, token: string | null) {
  if (!token) throw new Error("Utilisateur non authentifié");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Erreur API :", text);
    throw new Error(text || "Erreur API");
  }

  return res.json();
}

// 🔹 Récupérer tous les cours
export async function fetchCourses(token: string | null): Promise<Course[]> {
  return fetchWithToken(`${API_URL}/courses/`, { method: "GET" }, token);
}

// 🔹 Récupérer les niveaux par cours (query param)
export async function fetchLevels(courseId: number, token: string | null): Promise<Level[]> {
  return fetchWithToken(`${API_URL}/levels/?course=${courseId}`, { method: "GET" }, token);
}

// 🔹 Récupérer les chapitres par niveau (query param)
export async function fetchChapters(levelId: number, token: string | null): Promise<Chapter[]> {
  return fetchWithToken(`${API_URL}/chapters/?level=${levelId}`, { method: "GET" }, token);
}

// 🔹 Récupérer les leçons par chapitre (query param)
export async function fetchLessons(chapterId: number, token: string | null): Promise<Lesson[]> {
  return fetchWithToken(`${API_URL}/lessons/?chapter=${chapterId}`, { method: "GET" }, token);
}

// 🔹 Créer une leçon
export async function createLesson(chapterId: number, data: FormData, token: string | null): Promise<Lesson> {
  if (!token) throw new Error("Utilisateur non authentifié");

  // Ajouter chapter dans FormData (obligatoire pour DRF)
  data.append("chapter", chapterId.toString());

  const res = await fetch(`${API_URL}/lessons/`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Réponse API :", text);
    throw new Error(text || "Erreur lors de la création de la leçon");
  }

  return res.json();
}


// 🔹 Mettre à jour une leçon
export async function updateLesson(lessonId: number, data: FormData, token: string | null): Promise<Lesson> {
  return fetchWithToken(`${API_URL}/lessons/${lessonId}/`, { method: "PUT", body: data }, token);
}

// 🔹 Supprimer une leçon
export async function deleteLesson(lessonId: number, token: string | null): Promise<void> {
  await fetchWithToken(`${API_URL}/lessons/${lessonId}/`, { method: "DELETE" }, token);
}

