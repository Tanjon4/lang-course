"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  getCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  Course as CourseType 
} from "../services/api";

export default function GestionCours() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  // Theme - SIMPLIFIEZ cette partie
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  // 🔹 Charger les cours
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des cours.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchCourses(); 
  }, []);

  // 🔹 Rechercher un cours
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm, courses]);

  // 🔹 Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // 🔹 Ouvrir la modale
  const openModal = (course?: CourseType) => {
    if (course) {
      setSelectedCourse(course);
      setNewTitle(course.title);
      setNewDescription(course.description);
    } else {
      setSelectedCourse(null);
      setNewTitle("");
      setNewDescription("");
    }
    setModalOpen(true);
  };

  // 🔹 Ajouter / Modifier un cours
  const saveCourse = async () => {
    if (!newTitle.trim()) {
      toast.error("Veuillez entrer un titre de cours.");
      return;
    }
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse.id, {
          title: newTitle,
          description: newDescription,
          language_code: selectedCourse.language_code || "fr",
          is_published: true,
        });
        toast.success("Cours modifié avec succès !");
      } else {
        await createCourse({
          title: newTitle,
          description: newDescription,
          language_code: "fr",
          is_published: true,
        });
        toast.success("Cours ajouté avec succès !");
      }
      setModalOpen(false);
      setSelectedCourse(null);
      setNewTitle("");
      setNewDescription("");
      fetchCourses();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du cours.");
      console.error(error);
    }
  };

  // 🔹 Supprimer un cours
  const handleDeleteCourse = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce cours ?")) return;
    try {
      await deleteCourse(id);
      toast.success("Cours supprimé avec succès !");
      fetchCourses();
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestion des Cours</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="text"
          placeholder="Rechercher un cours..."
          className="w-full sm:w-1/2 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Ajouter un cours
        </button>
      </div>

      {/* Theme buttons - SIMPLIFIE */}
      <div className="flex gap-2">
        {["light", "dark"].map((t) => (
          <button
            key={t}
            onClick={() => toggleTheme(t as "light" | "dark")}
            className={`px-3 py-1 rounded-md text-sm ${
              theme === t ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {t === "light" ? "Clair" : "Sombre"}
          </button>
        ))}
      </div>

      {/* Liste des cours */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Chargement...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">Aucun cours trouvé.</p>
        ) : (
          <ul className="space-y-3">
            {currentCourses.map((course) => (
              <motion.li
                key={course.id}
                layout
                className="flex justify-between items-center p-3 border-b dark:border-gray-700"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{course.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.description || "Pas de description"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(course)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      {filteredCourses.length > coursesPerPage && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modale */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[90%] max-w-md p-6"
            >
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                {selectedCourse ? "Modifier le cours" : "Ajouter un cours"}
              </h3>
              <input
                type="text"
                placeholder="Titre du cours"
                className="w-full p-2 border rounded-lg mb-3 dark:bg-gray-700 dark:text-white"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  onClick={saveCourse}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedCourse ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}