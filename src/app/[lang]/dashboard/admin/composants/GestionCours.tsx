"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  Course,
} from "@/app/[lang]/dashboard/admin/services/api";

/* ---------------- ICONS ---------------- */
const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

/* ---------------- PAGE ---------------- */
export default function GestionCours() {
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [languageCode, setLanguageCode] = useState("fr");
  const [isPublished, setIsPublished] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- FETCH COURSES ---------------- */
  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des cours.");
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") fetchCourses();
  }, [user]);

  /* ---------------- FILTER ---------------- */
  useEffect(() => {
    const filtered = courses.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm, courses]);

  /* ---------------- PAGINATION ---------------- */
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  /* ---------------- OPEN MODAL ---------------- */
  const openModal = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
      setNewTitle(course.title);
      setNewDescription(course.description || "");
      setLanguageCode(course.language_code || "fr");
      setIsPublished(course.is_published);
    } else {
      setSelectedCourse(null);
      setNewTitle("");
      setNewDescription("");
      setLanguageCode("fr");
      setIsPublished(true);
    }
    setModalOpen(true);
  };

  /* ---------------- SAVE COURSE ---------------- */
  const saveCourse = async () => {
    if (!newTitle.trim()) {
      toast.error("Veuillez entrer un titre.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: newTitle,
        description: newDescription,
        language_code: languageCode,
        is_published: isPublished,
      };

      if (selectedCourse) {
        await updateCourse(selectedCourse.id, payload);
        toast.success("Cours modifié !");
      } else {
        await createCourse(payload);
        toast.success("Cours ajouté !");
      }

      fetchCourses();
      setModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- DELETE COURSE ---------------- */
  const handleDeleteCourse = async (id: number) => {
    if (!confirm("Supprimer ce cours ?")) return;
    try {
      await deleteCourse(id);
      toast.success("Cours supprimé.");
      fetchCourses();
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  /* ---------------- LOADING / ACCESS ---------------- */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="w-10 h-10 border-4 border-t-transparent border-turquoise-400 rounded-full animate-spin" />
      </div>
    );

  if (!user || user.role !== "admin")
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">Accès refusé</h3>
          <p className="text-gray-600">Vous n'avez pas la permission.</p>
        </div>
      </div>
    );

  /* ---------------- RENDER PAGE ---------------- */
  return (
    <div className="min-h-screen bg-blue-50 transition-colors">
      <Toaster position="top-right" />

      <div className="max-w-full px-2 py-4">

        {/* HEADER + ADD */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-turquoise-600">Gestion des cours</h1>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-turquoise-500 text-white rounded-xl shadow"
          >
            <PlusIcon /> Nouveau cours
          </motion.button>
        </div>

        {/* SEARCH */}
        <div className="relative mb-4 max-w-md">
          <SearchIcon />
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-turquoise-400 transition"
          />
        </div>

        {/* ---------------- GRID COMPACT ---------------- */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence>
            {currentCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ rotateX: 2, rotateY: -2, scale: 1.03 }}
                className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-5 flex flex-col justify-between transition-transform duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-4">{course.description || "Aucune description"}</p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">
                    Créé le {new Date(course.created_at).toLocaleDateString()}
                  </span>
                  <motion.span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      course.is_published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {course.is_published ? "Publié" : "Brouillon"}
                  </motion.span>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onClick={() => openModal(course)}
                    className="p-2 bg-white/60 rounded-xl hover:bg-white/80 transition shadow"
                  >
                    <EditIcon />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 bg-red-50 rounded-xl hover:bg-red-100 transition shadow"
                  >
                    <DeleteIcon />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === i + 1 ? "bg-turquoise-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ------------------- MODAL ------------------- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl overflow-hidden"
            >
              {/* HEADER */}
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedCourse ? "Modifier le cours" : "Créer un cours"}
                </h3>
              </div>

              {/* FORM */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre du cours *</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-turquoise-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-turquoise-400 transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                  <select
                    value={languageCode}
                    onChange={(e) => setLanguageCode(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-turquoise-400 transition"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="ru">Russe</option>
                    <option value="de">Allemand</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Publier le cours</span>
                  <button
                    type="button"
                    onClick={() => setIsPublished(!isPublished)}
                    className={`relative w-12 h-6 rounded-full transition ${isPublished ? "bg-turquoise-500" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isPublished ? "translate-x-6" : ""}`} />
                  </button>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-white/50">
                <button
                  disabled={isSubmitting}
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={saveCourse}
                  className="px-6 py-2 bg-turquoise-500 text-white rounded-xl hover:bg-turquoise-600 transition shadow"
                >
                  {isSubmitting ? (selectedCourse ? "Modification..." : "Création...") : (selectedCourse ? "Enregistrer" : "Créer")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
