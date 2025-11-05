"use client";

import { useState, FormEvent } from "react";
import { createLesson } from "../services/api";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";

interface LessonFormProps {
  chapterId: number;
  refresh: () => void; // pour recharger la liste après ajout
}

export default function LessonForm({ chapterId, refresh }: LessonFormProps) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("number", number.toString());
      formData.append("video_url", videoUrl);
      formData.append("content", content);
      formData.append("chapter", chapterId.toString()); // obligatoire
      if (pdfFile) formData.append("pdf_file", pdfFile);

      await createLesson(chapterId, formData, accessToken);

      toast.success("Leçon ajoutée avec succès !");
      setTitle("");
      setNumber(number + 1);
      setVideoUrl("");
      setPdfFile(null);
      setContent("");

      refresh(); // recharge la liste des leçons
    } catch (err: any) {
      toast.error("Erreur : " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        type="number"
        placeholder="Numéro de la leçon"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Titre de la leçon"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="url"
        placeholder="Lien vidéo (YouTube/Vimeo)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Contenu de la leçon"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        disabled={isSubmitting || !accessToken}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Ajout en cours..." : "Ajouter la leçon"}
      </button>
    </form>
  );
}
