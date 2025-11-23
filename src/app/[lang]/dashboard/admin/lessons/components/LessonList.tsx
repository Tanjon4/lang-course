// "use client";

// import React, { useState } from "react";
// import { Lesson } from "../services/types";
// import { deleteLesson, updateLesson } from "../services/api";
// import { useAuth } from "@/app/contexts/AuthContext";
// import toast from "react-hot-toast";

// interface LessonListProps {
//   lessons: Lesson[];
//   refresh?: () => void; // fonction pour recharger la liste après modification
// }

// export default function LessonList({ lessons, refresh }: LessonListProps) {
//   const { accessToken } = useAuth();
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editedTitle, setEditedTitle] = useState("");
//   const [editedNumber, setEditedNumber] = useState(1);

//   const startEdit = (lesson: Lesson) => {
//     setEditingId(lesson.id);
//     setEditedTitle(lesson.title);
//     setEditedNumber(lesson.number);
//   };

//   const cancelEdit = () => setEditingId(null);

//   const saveEdit = async (lesson: Lesson) => {
//     if (!accessToken) return toast.error("Utilisateur non authentifié");
//     const formData = new FormData();
//     formData.append("title", editedTitle);
//     formData.append("number", editedNumber.toString());

//     try {
//       await updateLesson(lesson.id, formData, accessToken);
//       toast.success("Leçon mise à jour !");
//       setEditingId(null);
//       refresh?.();
//     } catch (err: any) {
//       toast.error("Erreur : " + err.message);
//     }
//   };

//   const handleDelete = async (lesson: Lesson) => {
//     if (!accessToken) return toast.error("Utilisateur non authentifié");
//     if (!confirm(`Supprimer la leçon "${lesson.title}" ?`)) return;

//     try {
//       await deleteLesson(lesson.id, accessToken);
//       toast.success("Leçon supprimée !");
//       refresh?.();
//     } catch (err: any) {
//       toast.error("Erreur : " + err.message);
//     }
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">📚 Liste des leçons</h2>
//       {lessons.length === 0 ? (
//         <p>Aucune leçon disponible.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">#</th>
//               <th className="border p-2">Titre</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {lessons.map((lesson) => (
//               <tr key={lesson.id}>
//                 <td className="border p-2 text-center">{lesson.number}</td>
//                 <td className="border p-2">
//                   {editingId === lesson.id ? (
//                     <input
//                       type="text"
//                       value={editedTitle}
//                       onChange={(e) => setEditedTitle(e.target.value)}
//                       className="border p-1 w-full"
//                     />
//                   ) : (
//                     lesson.title
//                   )}
//                 </td>
//                 <td className="border p-2 text-center space-x-2">
//                   {editingId === lesson.id ? (
//                     <>
//                       <button
//                         onClick={() => saveEdit(lesson)}
//                         className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
//                       >
//                         💾
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
//                       >
//                         ✖
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => startEdit(lesson)}
//                         className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         onClick={() => handleDelete(lesson)}
//                         className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                       >
//                         🗑️
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Lesson } from "../services/types";
import { deleteLesson, updateLesson } from "../services/api";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface LessonListProps {
  lessons: Lesson[];
  refresh?: () => void;
}

export default function LessonList({ lessons, refresh }: LessonListProps) {
  const { accessToken } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedNumber, setEditedNumber] = useState(1);

  const startEdit = (lesson: Lesson) => {
    setEditingId(lesson.id);
    setEditedTitle(lesson.title);
    setEditedNumber(lesson.number);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (lesson: Lesson) => {
    if (!accessToken) return toast.error("Utilisateur non authentifié");
    const formData = new FormData();
    formData.append("title", editedTitle);
    formData.append("number", editedNumber.toString());

    try {
      await updateLesson(lesson.id, formData, accessToken);
      toast.success("Leçon mise à jour !");
      setEditingId(null);
      refresh?.();
    } catch (err: any) {
      toast.error("Erreur : " + err.message);
    }
  };

  const handleDelete = async (lesson: Lesson) => {
    if (!accessToken) return toast.error("Utilisateur non authentifié");
    if (!confirm(`Supprimer la leçon "${lesson.title}" ?`)) return;

    try {
      await deleteLesson(lesson.id, accessToken);
      toast.success("Leçon supprimée !");
      refresh?.();
    } catch (err: any) {
      toast.error("Erreur : " + err.message);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📚 Liste des leçons</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-500">Aucune leçon disponible.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Titre</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {lessons.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                      {lesson.number}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors">
                    {editingId === lesson.id ? (
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      lesson.title
                    )}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    {editingId === lesson.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(lesson)}
                          className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
                          title="Enregistrer"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition"
                          title="Annuler"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(lesson)}
                          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(lesson)}
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
