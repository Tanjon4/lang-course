// import axios from "axios";

// // Axios instance
// const api = axios.create({
//   baseURL: "https://lang-courses-api.onrender.com/api", // 🔹 Base URL de l'API
//   headers: { "Content-Type": "application/json" },
// });

// // TypeScript type pour User
// export type User = {
//   id: number;
//   username: string;
//   email: string;
//   status: "active" | "suspendu";
//   created_at: string;
// };

// // 🔹 CRUD Users
// // GET all users
// export const getUsers = async () => {
//   return api.get<User[]>("/users/");
// };

// // POST create user
// export const createUser = async (data: Omit<User, "id" | "created_at">) => {
//   return api.post("/users/", data);
// };

// // PUT update user
// export const updateUser = async (id: number, data: Partial<Omit<User, "id" | "created_at">>) => {
//   return api.put(`/users/${id}/`, data);
// };

// // DELETE user
// export const deleteUser = async (id: number) => {
//   return api.delete(`/users/${id}/`);
// };

// // PATCH suspend/reactivate user
// export const toggleUserStatus = async (id: number, status: "active" | "suspendu") => {
//   return api.patch(`/users/${id}/`, { status });
// };


// // TypeScript type for Course
// export type Course = {
//   id: number;
//   title: string;
//   description: string;
//   language_code: string;
//   is_published: boolean;
//   created_at: string;
// };

// // CRUD functions
// export const getCourses = async () => {
//   return api.get<Course[]>("/courses");
// };

// export const createCourse = async (data: Omit<Course, "id" | "created_at">) => {
//   return api.post("/courses", data);
// };

// export const updateCourse = async (id: number, data: Partial<Omit<Course, "id" | "created_at">>) => {
//   return api.put(`/courses/${id}`, data);
// };

// export const deleteCourse = async (id: number) => {
//   return api.delete(`/courses/${id}`);
// };

// // Export the Axios instance in case you need it directly
// export default api;


import axios from "axios";

/**
 * 🔹 Instance Axios configurée
 */
const api = axios.create({
  baseURL: "https://lang-courses-api.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

/* -------------------------------------------------------------------------- */
/*                                🔸 COURSES 🔸                               */
/* -------------------------------------------------------------------------- */
export type Course = {
  id: number;
  title: string;
  description: string;
  language_code: string;
  is_published: boolean;
  created_at: string;
};

// GET /api/courses/
export const getCourses = async () => api.get<Course[]>("/courses/");

// GET /api/courses/{id}/
export const getCourse = async (id: number) => api.get<Course>(`/courses/${id}/`);

// POST /api/courses/
export const createCourse = async (data: Omit<Course, "id" | "created_at">) =>
  api.post("/courses/", data);

// PUT /api/courses/{id}/
export const updateCourse = async (id: number, data: Partial<Course>) =>
  api.put(`/courses/${id}/`, data);

// DELETE /api/courses/{id}/
export const deleteCourse = async (id: number) => api.delete(`/courses/${id}/`);

/* -------------------------------------------------------------------------- */
/*                                 🔸 LEVELS 🔸                               */
/* -------------------------------------------------------------------------- */
export type Level = {
  id: number;
  name: string;
  description: string;
  course_global: number;
};

// GET /api/levels/
export const getLevels = async () => api.get<Level[]>("/levels/");

// POST /api/levels/
export const createLevel = async (data: Omit<Level, "id">) => api.post("/levels/", data);

// PUT /api/levels/{id}/
export const updateLevel = async (id: number, data: Partial<Level>) =>
  api.put(`/levels/${id}/`, data);

// DELETE /api/levels/{id}/
export const deleteLevel = async (id: number) => api.delete(`/levels/${id}/`);

/* -------------------------------------------------------------------------- */
/*                               🔸 CHAPTERS 🔸                               */
/* -------------------------------------------------------------------------- */
export type Chapter = {
  id: number;
  title: string;
  level: number;
  description: string;
};

// GET /api/chapters/
export const getChapters = async () => api.get<Chapter[]>("/chapters/");

// POST /api/chapters/
export const createChapter = async (data: Omit<Chapter, "id">) =>
  api.post("/chapters/", data);

// PUT /api/chapters/{id}/
export const updateChapter = async (id: number, data: Partial<Chapter>) =>
  api.put(`/chapters/${id}/`, data);

// DELETE /api/chapters/{id}/
export const deleteChapter = async (id: number) => api.delete(`/chapters/${id}/`);

/* -------------------------------------------------------------------------- */
/*                                🔸 LESSONS 🔸                               */
/* -------------------------------------------------------------------------- */
export type Lesson = {
  id: number;
  title: string;
  content: string;
  chapter: number;
  is_published: boolean;
};

// GET /api/lessons/
export const getLessons = async () => api.get<Lesson[]>("/lessons/");

// POST /api/lessons/
export const createLesson = async (data: Omit<Lesson, "id">) =>
  api.post("/lessons/", data);

// PUT /api/lessons/{id}/
export const updateLesson = async (id: number, data: Partial<Lesson>) =>
  api.put(`/lessons/${id}/`, data);

// DELETE /api/lessons/{id}/
export const deleteLesson = async (id: number) => api.delete(`/lessons/${id}/`);

// PATCH /api/lessons/{id}/publish/
export const publishLesson = async (id: number) => api.patch(`/lessons/${id}/publish/`);

// PATCH /api/lessons/{id}/unpublish/
export const unpublishLesson = async (id: number) => api.patch(`/lessons/${id}/unpublish/`);

/* -------------------------------------------------------------------------- */
/*                                 🔸 USERS 🔸                                */
/* -------------------------------------------------------------------------- */
export type User = {
  id: number;
  username: string;
  email: string;
  status: "active" | "suspendu";
  created_at: string;
};

// GET /api/users/
export const getUsers = async () => api.get<User[]>("/users/");

// POST /api/users/
export const createUser = async (data: Omit<User, "id" | "created_at">) =>
  api.post("/users/", data);

// PUT /api/users/{id}/
export const updateUser = async (id: number, data: Partial<User>) =>
  api.put(`/users/${id}/`, data);

// DELETE /api/users/{id}/
export const deleteUser = async (id: number) => api.delete(`/users/${id}/`);

// PATCH /api/users/{id}/ (toggle status)
export const toggleUserStatus = async (id: number, status: "active" | "suspendu") =>
  api.patch(`/users/${id}/`, { status });

/* -------------------------------------------------------------------------- */

export default api;
