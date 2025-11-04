"use client";

import { useState } from "react";
import { Chapter } from "@/app/[lang]/dashboard/admin/chapters/types";

type Props = {
  initialData?: Chapter | null;
  onSave: (data: Partial<Chapter>) => void;
  onCancel: () => void;
};

export default function ChapterForm({ initialData, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [number, setNumber] = useState(initialData?.number || 1);
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, number, description });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2 bg-gray-50">
      <div>
        <label className="font-semibold">Numéro :</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="border p-1 rounded w-full"
          min={1}
        />
      </div>
      <div>
        <label className="font-semibold">Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1 rounded w-full"
        />
      </div>
      <div>
        <label className="font-semibold">Description :</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-1 rounded w-full"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          Enregistrer
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
          Annuler
        </button>
      </div>
    </form>
  );
}
