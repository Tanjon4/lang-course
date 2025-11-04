"use client";

import { Chapter } from "@/app/[lang]/dashboard/admin/chapters/types";

type Props = {
  chapters: Chapter[];
  onUpdate: (chapter: Chapter) => void;
  onDelete: (id: number) => void;
};

export default function ChapterList({ chapters, onUpdate, onDelete }: Props) {
  if (chapters.length === 0) return <p>Aucun chapitre trouvé.</p>;

  return (
    <table className="w-full border-collapse border mt-4">
      <thead>
        <tr>
          <th className="border p-2">Numéro</th>
          <th className="border p-2">Titre</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {chapters.map((ch) => (
          <tr key={ch.id}>
            <td className="border p-2">{ch.number}</td>
            <td className="border p-2">{ch.title}</td>
            <td className="border p-2">{ch.description}</td>
            <td className="border p-2 flex gap-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => onUpdate(ch)}>✏️</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onDelete(ch.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
