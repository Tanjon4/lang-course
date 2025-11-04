import axios from "axios";
import { Level } from "./levelService"; // Raiso Level interface avy amin'ny levelService

const API_URL = "https://lang-courses-api.onrender.com/api";

export interface Course {
  id: number;
  title: string;
  levels?: Level[];
}

// Récupérer toutes les courses
export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get<Course[]>(`${API_URL}/courses/`);
    return response.data;
  } catch (err: any) {
    console.error("Erreur récupération courses :", err.response?.data || err.message);
    return [];
  }
};
