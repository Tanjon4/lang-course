// src/app/[lang]/dashboard/admin/services/courseService.ts
import axios from "axios";

const API_URL = "https://lang-courses-api.onrender.com/api";

// Récupérer toutes les courses publiques
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses/`);
    return response.data;
  } catch (err: any) {
    console.error("Erreur récupération courses :", err.response?.data || err.message);
    return [];
  }
};
