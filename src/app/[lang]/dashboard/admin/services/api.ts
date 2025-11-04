import axios from "axios";
import { authService } from "@/services/authService";

// --------------------------------------------------------------------------
// 🔹 AXIOS INSTANCE 🔹
// --------------------------------------------------------------------------

const api = axios.create({
  baseURL: "https://lang-courses-api.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// --------------------------------------------------------------------------
// 🔹 INTERCEPTEURS DE REQUÊTES 🔹
// --------------------------------------------------------------------------

// Ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = authService.getAccessToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------------------------------------------------------
// 🔹 INTERCEPTEURS DE RÉPONSES 🔹
// --------------------------------------------------------------------------

// Rafraîchit automatiquement le token si 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = authService.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        // Rafraîchit le token
        const newToken = await authService.refreshToken(refreshToken);
        authService.setAccessToken(newToken.access);

        // Réessaie la requête avec le nouveau token
        originalRequest.headers["Authorization"] = `Bearer ${newToken.access}`;
        return api(originalRequest);
      } catch (err) {
        // Si échec → logout
        authService.clearTokens();
        if (typeof window !== "undefined") {
          const lang = window.location.pathname.split("/")[1] || "fr";
          window.location.href = `/${lang}/auth/login`;
        }
        return Promise.reject(err);
      }
    }

    // Gestion des autres erreurs
    if (status === 403) {
      console.error("🚫 Accès refusé : vous n’avez pas les permissions nécessaires");
    }

    return Promise.reject(error);
  }
);

// --------------------------------------------------------------------------
// 🔸 TYPES 🔸
// --------------------------------------------------------------------------

export type Course = { id: number; title: string; description: string; language_code: string; is_published: boolean; created_at: string; };
export type Level = { id: number; name: string; description: string; course_global: number; };
export type Chapter = { id: number; title: string; level: number; description: string; };
export type Lesson = { id: number; title: string; content: string; chapter: number; is_published: boolean; };
// export type User = { id: number; username: string; email: string; status: "active" | "suspendu"; role: string; created_at: string; };

// --------------------------------------------------------------------------
// 🔹 API ENDPOINTS 🔹
// --------------------------------------------------------------------------

// COURSES
export const getCourses = async () => api.get<Course[]>("/courses/");
export const getCourse = async (id: number) => api.get<Course>(`/courses/${id}/`);
export const createCourse = async (data: Omit<Course, "id" | "created_at">) => api.post("/courses/", data);
export const updateCourse = async (id: number, data: Partial<Course>) => api.put(`/courses/${id}/`, data);
export const deleteCourse = async (id: number) => api.delete(`/courses/${id}/`);

// LEVELS
export const getLevels = async () => api.get<Level[]>("/levels/");
export const createLevel = async (data: Omit<Level, "id">) => api.post("/levels/", data);
export const updateLevel = async (id: number, data: Partial<Level>) => api.put(`/levels/${id}/`, data);
export const deleteLevel = async (id: number) => api.delete(`/levels/${id}/`);

// CHAPTERS
export const getChapters = async () => api.get<Chapter[]>("/chapters/");
export const createChapter = async (data: Omit<Chapter, "id">) => api.post("/chapters/", data);
export const updateChapter = async (id: number, data: Partial<Chapter>) => api.put(`/chapters/${id}/`, data);
export const deleteChapter = async (id: number) => api.delete(`/chapters/${id}/`);

// LESSONS
export const getLessons = async () => api.get<Lesson[]>("/lessons/");
export const createLesson = async (data: Omit<Lesson, "id">) => api.post("/lessons/", data);
export const updateLesson = async (id: number, data: Partial<Lesson>) => api.put(`/lessons/${id}/`, data);
export const deleteLesson = async (id: number) => api.delete(`/lessons/${id}/`);
export const publishLesson = async (id: number) => api.patch(`/lessons/${id}/publish/`);
export const unpublishLesson = async (id: number) => api.patch(`/lessons/${id}/unpublish/`);


// USERS
// export const getUsers = async () => api.get<User[]>("/users/");

// export const updateUser = async (id: number, data: Partial<User>) =>
//   api.put(`/users/${id}/`, data);

// export const deleteUser = async (id: number) =>
//   api.delete(`/users/${id}/`);

// export const toggleUserStatus = async (
//   id: number,
//   status: "active" | "suspendu"
// ) => api.patch(`/users/${id}/`, { status });



// 🧱 Définition du type User selon la réponse API
export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";          // ✅ champ ajouté
  status: "active" | "suspendu";   // ✅ champ déjà existant
}


// 🎫 Intercepteur : ajoute automatiquement le token JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // récupéré via AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===================== 🧩 Requêtes API =====================

// ✅ Récupérer tous les utilisateurs
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users/");
  return response.data;
};

// ✅ Mettre à jour un utilisateur
export const updateUser = async (id: number, data: Partial<User>) => {
  const response = await api.put(`/users/${id}/`, data);
  return response.data;
};

// ✅ Supprimer un utilisateur
export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}/`);
  return response.data;
};

// ✅ Activer / suspendre un utilisateur
export const toggleUserStatus = async (id: number, newStatus: "active" | "suspendu") => {
  const response = await api.patch(`/users/${id}/`, { status: newStatus });
  return response.data;
};

export default api;