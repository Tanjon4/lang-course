import { useAuth } from "@/app/contexts/AuthContext"; // pour récupérer le token
import { Lesson } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createLessonWithAuth(
  chapterId: number,
  data: FormData,
  accessToken: string | null
) {
  if (!accessToken) throw new Error("Utilisateur non authentifié");

  const res = await fetch(`${API_URL}/api/chapters/${chapterId}/lessons/`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Réponse API :", text);
    throw new Error(text || "Erreur lors de la création de la leçon");
  }

  return res.json() as Promise<Lesson>;
}
