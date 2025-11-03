// src/app/[lang]/dashboard/admin/services/levelService.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LevelData {
  courseId: number;
  number: number;
  title: string;
}

// Dans src/app/[lang]/dashboard/admin/services/levelService.ts
export const getLevelsByCourse = async (courseId: number, accessToken: string): Promise<any[]> => {
  try {
    const response = await fetch(`/api/courses/${courseId}/levels`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des niveaux');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching levels:', error);
    throw error;
  }
};

export const addLevelToCourse = async (levelData: LevelData, token: string) => {
  if (!token) {
    throw new Error("Vous devez être connecté pour créer un level.");
  }

  try {
    const response = await axios.post(
      `${API_URL}/levels/`,
      {
        course: levelData.courseId,
        number: levelData.number,
        title: levelData.title,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error("Token invalide ou expiré. Veuillez vous reconnecter.");
    }
    console.error("Erreur ajout level au cours :", err.response?.data || err.message);
    throw err;
  }
};
