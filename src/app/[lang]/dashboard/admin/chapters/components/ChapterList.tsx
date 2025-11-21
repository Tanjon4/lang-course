"use client";

import { Chapter } from "@/app/[lang]/dashboard/admin/chapters/types";

type Props = {
  chapters: Chapter[];
  onUpdate: (chapter: Chapter) => void;
  onDelete: (id: number) => void;
};

export default function ChapterList({ chapters, onUpdate, onDelete }: Props) {
  if (chapters.length === 0)
    return (
      <p className="text-center text-gray-500 border p-4 rounded-xl bg-white shadow-sm">
        Aucun chapitre trouvé.
      </p>
    );

  return (
    <div className="mt-4 bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="p-3 text-left font-semibold">Numéro</th>
            <th className="p-3 text-left font-semibold">Titre</th>
            <th className="p-3 text-left font-semibold">Description</th>
            <th className="p-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {chapters.map((ch) => (
            <tr
              key={ch.id}
              className="border-b last:border-none hover:bg-gray-50 transition"
            >
              <td className="p-3">{ch.number}</td>
              <td className="p-3 font-medium text-gray-900">{ch.title}</td>
              <td className="p-3 text-gray-700">{ch.description}</td>

              <td className="p-3">
                <div className="flex gap-3">
                  <button
                    className="px-3 py-1 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
                    onClick={() => onUpdate(ch)}
                  >
                    Modifier
                  </button>

                  <button
                    className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                    onClick={() => onDelete(ch.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

