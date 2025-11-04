"use client";

import { Chapter, deleteChapter } from "../services/api";

interface Props {
  chapter: Chapter;
  setChapters: (chapters: Chapter[]) => void;
}

export default function ChapterItem({ chapter, setChapters }: Props) {
  const handleDelete = async () => {
    if (!confirm("Supprimer ce chapitre ?")) return;
    await deleteChapter(chapter.id);
    setChapters(prev => prev.filter(c => c.id !== chapter.id));
  };

  return (
    <div className="p-2 border rounded flex justify-between items-center">
      <div>
        <strong>{chapter.number} - {chapter.title}</strong>
        <p>{chapter.description}</p>
      </div>
      <button onClick={handleDelete} className="p-1 bg-red-500 text-white rounded">Supprimer</button>
    </div>
  );
}
