// src/app/[lang]/dashboard/admin/services/api.ts
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                           🔹 CONFIGURATION AXIOS 🔹                        */
/* -------------------------------------------------------------------------- */

const api = axios.create({
  baseURL: "https://lang-courses-api.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Intercepteur pour ajouter le token Firebase à toutes les requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -------------------------------------------------------------------------- */
/*                                🔸 TYPES 🔸                                 */
/* -------------------------------------------------------------------------- */

export type Course = {
  id: number;
  title: string;
  description: string;
  language_code: string;
  is_published?: boolean;
};

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
};

/* -------------------------------------------------------------------------- */
/*                              🔸 COURSES API 🔸                              */
/* -------------------------------------------------------------------------- */

// GET all courses
export const getCourses = async (): Promise<Course[]> => {
  const res = await api.get("/courses/");
  return res.data;
};

// CREATE course
export const createCourse = async (data: Partial<Course>): Promise<Course> => {
  const res = await api.post("/courses/", data);
  return res.data;
};

// UPDATE course
export const updateCourse = async (id: number, data: Partial<Course>): Promise<Course> => {
  const res = await api.put(`/courses/${id}/`, data);
  return res.data;
};

// DELETE course
export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/courses/${id}/`);
};

/* -------------------------------------------------------------------------- */
/*                               🔸 USERS API 🔸                               */
/* -------------------------------------------------------------------------- */

// GET all users
export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users/");
  return res.data;
};

// CREATE user
export const createUser = async (data: Partial<User>): Promise<User> => {
  const res = await api.post("/users/", data);
  return res.data;
};

// UPDATE user
export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const res = await api.put(`/users/${id}/`, data);
  return res.data;
};

// DELETE user
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}/`);
};

// TOGGLE user activation
export const toggleUserStatus = async (id: number, isActive: boolean): Promise<User> => {
  const res = await api.patch(`/users/${id}/`, { is_active: isActive });
  return res.data;
};

export default api;
