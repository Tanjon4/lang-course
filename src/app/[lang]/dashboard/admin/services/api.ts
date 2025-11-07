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

// // 🧱 Définition du type User
// export interface User {
//   id: number;
//   username: string;
//   email: string;
//   role: "admin" | "user";
//   status: "active" | "suspendu";
// }

// // 🎫 Intercepteur Axios pour ajouter le token JWT
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // 🔹 Décoder JWT pour lire le payload
// const decodeToken = (token: string): any | null => {
//   try {
//     const payload = token.split(".")[1];
//     return JSON.parse(atob(payload));
//   } catch {
//     return null;
//   }
// };

// // 🔹 Vérifier si le token correspond à un admin
// const isAdminToken = (): boolean => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) return false;
//   const payload = decodeToken(token);
//   return payload?.role === "admin";
// };

// // 🔧 Gestion centralisée des erreurs API
// const handleApiError = (err: unknown): never => {
//   if (axios.isAxiosError(err)) {
//     if (err.response?.status === 403) {
//       throw new Error("Accès refusé : vous n'avez pas les permissions nécessaires.");
//     }
//     if (err.response?.data) {
//       const msg = (err.response.data as any).detail || JSON.stringify(err.response.data);
//       throw new Error(msg);
//     }
//   }
//   throw new Error("Erreur inconnue lors de la requête API");
// };

// // ===================== 🧩 Requêtes API =====================

// // Récupérer tous les utilisateurs
// export const getUsers = async (): Promise<User[]> => {
//   try {
//     const response = await api.get("/users/");
//     return response.data as User[];
//   } catch (err) {
//     console.error(err);
//     return []; // Retour par défaut pour TypeScript
//   }
// };

// // Mettre à jour un utilisateur (admin only)
// export const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
//   if (!isAdminToken()) {
//     console.error("Action réservée aux admins.");
//     return null;
//   }
//   try {
//     const response = await api.patch(`/users/${id}/update-user/`, data);
//     return response.data as User;
//   } catch (err: unknown) {
//     console.error(err);
//     return null;
//   }
// };

// // Supprimer un utilisateur
// export const deleteUser = async (id: number): Promise<boolean> => {
//   try {
//     await api.delete(`/users/${id}/`);
//     return true;
//   } catch (err: unknown) {
//     console.error(err);
//     return false;
//   }
// };

// // Activer / suspendre un utilisateur (admin only)
// export const toggleUserStatus = async (
//   id: number,
//   newStatus: "active" | "suspendu"
// ): Promise<User | null> => {
//   if (!isAdminToken()) {
//     console.error("Action réservée aux admins.");
//     return null;
//   }
//   try {
//     const response = await api.patch(`/users/${id}/`, { status: newStatus });
//     return response.data as User;
//   } catch (err: unknown) {
//     console.error(err);
//     return null;
//   }
// };

// export default api;

// 🧱 Type User
export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "suspendu";
}

// 🎫 Intercepteur Axios pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔹 Décoder JWT Base64 URL Safe
const decodeToken = (token: string): any | null => {
  try {
    let payloadBase64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padLength = 4 - (payloadBase64.length % 4);
    if (padLength < 4) payloadBase64 += "=".repeat(padLength);
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
};

// 🔹 Vérifier si le token est admin et non expiré
export const isAdminToken = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) return false;

  return payload.role === "admin";
};

// 🔧 Gestion des erreurs API
const handleApiError = (err: unknown): never => {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 403) {
      throw new Error("Accès refusé : permissions insuffisantes.");
    }
    if (err.response?.data) {
      const msg = (err.response.data as any).detail || JSON.stringify(err.response.data);
      throw new Error(msg);
    }
  }
  throw new Error("Erreur inconnue lors de la requête API");
};

// ===================== 🧩 Requêtes API =====================

// Récupérer tous les utilisateurs
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users/");
    return response.data as User[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Mettre à jour un utilisateur (admin seulement)
export const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
  if (!isAdminToken()) {
    console.error("Action réservée aux admins.");
    return null;
  }
  try {
    const response = await api.patch(`/users/${id}/update-user/`, data);
    return response.data as User;
  } catch (err: unknown) {
    console.error(err);
    return null;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/users/${id}/`);
    return true;
  } catch (err: unknown) {
    console.error(err);
    return false;
  }
};

// Activer / suspendre un utilisateur (admin seulement)
export const toggleUserStatus = async (
  id: number,
  newStatus: "active" | "suspendu"
): Promise<User | null> => {
  if (!isAdminToken()) {
    console.error("Action réservée aux admins.");
    return null;
  }
  try {
    const response = await api.patch(`/users/${id}/`, { status: newStatus });
    return response.data as User;
  } catch (err: unknown) {
    console.error(err);
    return null;
  }
};

export default api;
