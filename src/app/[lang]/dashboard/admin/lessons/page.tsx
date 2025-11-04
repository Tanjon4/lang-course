"use client";

import { useParams } from "next/navigation";
import LessonForm from "@/app/[lang]/dashboard/admin/lessons/components/LessonForm";

export default function GestionCours() {
  const params = useParams();
  const chapterId = Number(params.chapterId);

  if (isNaN(chapterId)) return <p>⚠️ Chapter ID invalide</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Ajouter une leçon</h1>
      <LessonForm chapterId={chapterId} />
    </div>
  );
}
