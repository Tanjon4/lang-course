"use client";
import React, { useState, useEffect } from "react";
import { Level } from "@/app/[lang]/dashboard/admin/types";

interface LevelFormProps {
  initialData?: Level | null;
  onSubmit: (data: Level) => void;
  courses: { id: number; title: string }[];
}

const LevelForm: React.FC<LevelFormProps> = ({ initialData, onSubmit, courses }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [number, setNumber] = useState(initialData?.number || 1);
  const [order, setOrder] = useState(initialData?.order || 1);
  const [description, setDescription] = useState(initialData?.description || "");
  const [courseId, setCourseId] = useState(initialData?.course || courses[0]?.id || 0);
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setNumber(initialData.number);
      setOrder(initialData.order);
      setDescription(initialData.description);
      setCourseId(initialData.course);
      setIsPublished(initialData.is_published);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      number,
      order,
      description,
      course: courseId,
      is_published: isPublished,
    } as Level);

    if (!initialData) {
      setTitle("");
      setNumber(1);
      setOrder(1);
      setDescription("");
      setCourseId(courses[0]?.id || 0);
      setIsPublished(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">{initialData ? "Modifier Niveau" : "Créer Niveau"}</h2>

      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="w-full border px-3 py-2 rounded" required />

      <input type="number" value={number} onChange={e => setNumber(Number(e.target.value))} placeholder="Numéro" className="w-full border px-3 py-2 rounded" required />

      <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} placeholder="Ordre" className="w-full border px-3 py-2 rounded" required />

      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full border px-3 py-2 rounded" />

      <select value={courseId} onChange={e => setCourseId(Number(e.target.value))} className="w-full border px-3 py-2 rounded">
        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} />
        Publié
      </label>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        {initialData ? "Modifier" : "Créer"}
      </button>
    </form>
  );
};

export default LevelForm;
