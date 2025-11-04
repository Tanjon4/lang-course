import axios from "axios";

const API_URL = "https://lang-courses-api.onrender.com/api";

export interface Level {
  id: number;
  number: number;
  title: string;
  courseId: number;
}

// Récupérer tous les niveaux d’un cours
export const getLevelsByCourse = async (courseId: number, token: string): Promise<Level[]> => {
  try {
    const response = await axios.get<Level[]>(`${API_URL}/levels/?course_global=${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: any) {
    console.error("Erreur récupération levels :", err.response?.data || err.message);
    return [];
  }
};


// Ajouter un niveau à un cours
export const addLevelToCourse = async (
  levelData: { courseId: number; number: number; title: string },
  token: string
) => {
  try {
    const payload = {
      title: levelData.title,
      number: levelData.number,
      order: levelData.number, // tu peux garder ce mapping simple
      course_global: levelData.courseId, // 🔥 clé attendue par le backend
    };

    const response = await axios.post(`${API_URL}/levels/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err: any) {
    console.error("Erreur ajout level :", err.response?.data || err.message);
    throw err;
  }
};


// Mettre à jour un niveau
export const updateLevel = async (levelId: number, levelData: Partial<Level>, token: string) => {
  try {
    await axios.put(`${API_URL}/levels/${levelId}/`, levelData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err: any) {
    console.error("Erreur update level :", err.response?.data || err.message);
    throw err;
  }
};

// Supprimer un niveau
export const deleteLevel = async (levelId: number, token: string) => {
  try {
    await axios.delete(`${API_URL}/levels/${levelId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err: any) {
    console.error("Erreur suppression level :", err.response?.data || err.message);
    throw err;
  }
};
