// import axios from "axios";

// /**
//  * 🔹 Instance Axios configurée
//  */
// const api = axios.create({
//   baseURL: "https://lang-courses-api.onrender.com/api",
//   headers: { "Content-Type": "application/json" },
// });

// /* -------------------------------------------------------------------------- */
// /*                                🔸 COURSES 🔸                               */
// /* -------------------------------------------------------------------------- */
// export type Course = {
//   id: number;
//   title: string;
//   description: string;
//   language_code: string;
//   is_published: boolean;
//   created_at: string;
// };

// // GET /api/courses/
// export const getCourses = async () => api.get<Course[]>("/courses/");

// // GET /api/courses/{id}/
// export const getCourse = async (id: number) => api.get<Course>(`/courses/${id}/`);

// // POST /api/courses/
// export const createCourse = async (data: Omit<Course, "id" | "created_at">) =>
//   api.post("/courses/", data);

// // PUT /api/courses/{id}/
// export const updateCourse = async (id: number, data: Partial<Course>) =>
//   api.put(`/courses/${id}/`, data);

// // DELETE /api/courses/{id}/
// export const deleteCourse = async (id: number) => api.delete(`/courses/${id}/`);

// /* -------------------------------------------------------------------------- */
// /*                                 🔸 LEVELS 🔸                               */
// /* -------------------------------------------------------------------------- */
// export type Level = {
//   id: number;
//   name: string;
//   description: string;
//   course_global: number;
// };

// // GET /api/levels/
// export const getLevels = async () => api.get<Level[]>("/levels/");

// // POST /api/levels/
// export const createLevel = async (data: Omit<Level, "id">) => api.post("/levels/", data);

// // PUT /api/levels/{id}/
// export const updateLevel = async (id: number, data: Partial<Level>) =>
//   api.put(`/levels/${id}/`, data);

// // DELETE /api/levels/{id}/
// export const deleteLevel = async (id: number) => api.delete(`/levels/${id}/`);

// /* -------------------------------------------------------------------------- */
// /*                               🔸 CHAPTERS 🔸                               */
// /* -------------------------------------------------------------------------- */
// export type Chapter = {
//   id: number;
//   title: string;
//   level: number;
//   description: string;
// };

// // GET /api/chapters/
// export const getChapters = async () => api.get<Chapter[]>("/chapters/");

// // POST /api/chapters/
// export const createChapter = async (data: Omit<Chapter, "id">) =>
//   api.post("/chapters/", data);

// // PUT /api/chapters/{id}/
// export const updateChapter = async (id: number, data: Partial<Chapter>) =>
//   api.put(`/chapters/${id}/`, data);

// // DELETE /api/chapters/{id}/
// export const deleteChapter = async (id: number) => api.delete(`/chapters/${id}/`);

// /* -------------------------------------------------------------------------- */
// /*                                🔸 LESSONS 🔸                               */
// /* -------------------------------------------------------------------------- */
// export type Lesson = {
//   id: number;
//   title: string;
//   content: string;
//   chapter: number;
//   is_published: boolean;
// };

// // GET /api/lessons/
// export const getLessons = async () => api.get<Lesson[]>("/lessons/");

// // POST /api/lessons/
// export const createLesson = async (data: Omit<Lesson, "id">) =>
//   api.post("/lessons/", data);

// // PUT /api/lessons/{id}/
// export const updateLesson = async (id: number, data: Partial<Lesson>) =>
//   api.put(`/lessons/${id}/`, data);

// // DELETE /api/lessons/{id}/
// export const deleteLesson = async (id: number) => api.delete(`/lessons/${id}/`);

// // PATCH /api/lessons/{id}/publish/
// export const publishLesson = async (id: number) => api.patch(`/lessons/${id}/publish/`);

// // PATCH /api/lessons/{id}/unpublish/
// export const unpublishLesson = async (id: number) => api.patch(`/lessons/${id}/unpublish/`);

// /* -------------------------------------------------------------------------- */
// /*                                 🔸 USERS 🔸                                */
// /* -------------------------------------------------------------------------- */
// export type User = {
//   id: number;
//   username: string;
//   email: string;
//   status: "active" | "suspendu";
//   created_at: string;
// };

// // GET /api/users/
// export const getUsers = async () => api.get<User[]>("/users/");

// // POST /api/users/
// export const createUser = async (data: Omit<User, "id" | "created_at">) =>
//   api.post("/users/", data);

// // PUT /api/users/{id}/
// export const updateUser = async (id: number, data: Partial<User>) =>
//   api.put(`/users/${id}/`, data);

// // DELETE /api/users/{id}/
// export const deleteUser = async (id: number) => api.delete(`/users/${id}/`);

// // PATCH /api/users/{id}/ (toggle status)
// export const toggleUserStatus = async (id: number, status: "active" | "suspendu") =>
//   api.patch(`/users/${id}/`, { status });

// /* -------------------------------------------------------------------------- */

// export default api;

import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                             🔹 AXIOS INSTANCE 🔹                            */
/* -------------------------------------------------------------------------- */

const api = axios.create({
  baseURL: "https://lang-courses-api.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // ✅ nécessaire pour CORS + cookies
});

/* -------------------------------------------------------------------------- */
/*                         🔹 INTERCEPTEURS DE REQUÊTES 🔹                    */
/* -------------------------------------------------------------------------- */

// ➤ Ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/*                         🔹 INTERCEPTEURS DE RÉPONSES 🔹                    */
/* -------------------------------------------------------------------------- */

// ➤ Gestion automatique des erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 🔒 Si le token est expiré ou invalide → redirige vers /login
    if (status === 401) {
      console.warn("🔒 Token invalide ou expiré, redirection vers /auth/login");
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // on détecte la langue dans l’URL pour garder la cohérence
        const currentLang = window.location.pathname.split("/")[1] || "en";
        window.location.href = `/${currentLang}/auth/login`;
      }
    }

    // 🚫 Gestion d'autres erreurs globales (facultatif)
    if (status === 403) {
      console.error("🚫 Accès refusé : vous n’avez pas les permissions nécessaires");
    }

    return Promise.reject(error);
  }
);

/* -------------------------------------------------------------------------- */
/*                                   🔸 TYPES 🔸                               */
/* -------------------------------------------------------------------------- */

export type Course = {
  id: number;
  title: string;
  description: string;
  language_code: string;
  is_published: boolean;
  created_at: string;
};

export type Level = {
  id: number;
  name: string;
  description: string;
  course_global: number;
};

export type Chapter = {
  id: number;
  title: string;
  level: number;
  description: string;
};

export type Lesson = {
  id: number;
  title: string;
  content: string;
  chapter: number;
  is_published: boolean;
};

export type User = {
  id: number;
  username: string;
  email: string;
  status: "active" | "suspendu";
  created_at: string;
};

/* -------------------------------------------------------------------------- */
/*                               🔹 API ENDPOINTS 🔹                           */
/* -------------------------------------------------------------------------- */

// COURSES
export const getCourses = async () => api.get<Course[]>("/courses/");
export const getCourse = async (id: number) => api.get<Course>(`/courses/${id}/`);
export const createCourse = async (data: Omit<Course, "id" | "created_at">) =>
  api.post("/courses/", data);
export const updateCourse = async (id: number, data: Partial<Course>) =>
  api.put(`/courses/${id}/`, data);
export const deleteCourse = async (id: number) => api.delete(`/courses/${id}/`);

// LEVELS
export const getLevels = async () => api.get<Level[]>("/levels/");
export const createLevel = async (data: Omit<Level, "id">) => api.post("/levels/", data);
export const updateLevel = async (id: number, data: Partial<Level>) =>
  api.put(`/levels/${id}/`, data);
export const deleteLevel = async (id: number) => api.delete(`/levels/${id}/`);

// CHAPTERS
export const getChapters = async () => api.get<Chapter[]>("/chapters/");
export const createChapter = async (data: Omit<Chapter, "id">) => api.post("/chapters/", data);
export const updateChapter = async (id: number, data: Partial<Chapter>) =>
  api.put(`/chapters/${id}/`, data);
export const deleteChapter = async (id: number) => api.delete(`/chapters/${id}/`);

// LESSONS
export const getLessons = async () => api.get<Lesson[]>("/lessons/");
export const createLesson = async (data: Omit<Lesson, "id">) => api.post("/lessons/", data);
export const updateLesson = async (id: number, data: Partial<Lesson>) =>
  api.put(`/lessons/${id}/`, data);
export const deleteLesson = async (id: number) => api.delete(`/lessons/${id}/`);
export const publishLesson = async (id: number) => api.patch(`/lessons/${id}/publish/`);
export const unpublishLesson = async (id: number) => api.patch(`/lessons/${id}/unpublish/`);

// USERS
export const getUsers = async () => api.get<User[]>("/users/");
export const createUser = async (data: Omit<User, "id" | "created_at">) => api.post("/users/", data);
export const updateUser = async (id: number, data: Partial<User>) =>
  api.put(`/users/${id}/`, data);
export const deleteUser = async (id: number) => api.delete(`/users/${id}/`);
export const toggleUserStatus = async (id: number, status: "active" | "suspendu") =>
  api.patch(`/users/${id}/`, { status });

export default api;
