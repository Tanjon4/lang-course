"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Lesson {
  id: number;
  title: string;
}

interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Level {
  id: number;
  title: string;
  chapters: Chapter[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  is_published: boolean;
  levels: Level[];
}

const API_BASE = "https://lang-courses-api.onrender.com/api";

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<{ [key: number]: boolean }>({});
  const [expandedChapters, setExpandedChapters] = useState<{ [key: number]: boolean }>({});
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formType, setFormType] = useState<"course" | "level" | "chapter" | "lesson">("course");
  const [parentIds, setParentIds] = useState<{ courseId?: number; levelId?: number; chapterId?: number }>({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/courses/`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLevel = (id: number) => setExpandedLevels((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleChapter = (id: number) => setExpandedChapters((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleOpenForm = (type: any, item: any = null, parents: any = {}) => {
    setFormType(type);
    setEditing(item);
    setParentIds(parents);
    setOpenForm(true);
  };

  const handleCloseForm = (saved = false) => {
    setOpenForm(false);
    setEditing(null);
    setParentIds({});
    if (saved) fetchCourses();
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ?")) return;
    await fetch(`${API_BASE}/${type}/${id}/`, { method: "DELETE" });
    fetchCourses();
  };

  const handleTogglePublish = async (course: Course) => {
    await fetch(`${API_BASE}/courses/${course.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !course.is_published }),
    });
    fetchCourses();
  };

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎓 Gestion des cours</h1>
        <button
          onClick={() => handleOpenForm("course")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          + Créer un cours
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            layout
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenForm("course", course)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleTogglePublish(course)}
                  className={`text-sm px-2 py-1 rounded ${
                    course.is_published
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {course.is_published ? "Dépublier" : "Publier"}
                </button>
                <button
                  onClick={() => handleDelete("courses", course.id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-2">{course.description}</p>

            {course.levels.map((level) => (
              <div key={level.id} className="mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{level.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenForm("level", level, { courseId: course.id })}
                      className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 px-2 py-1 rounded"
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => handleDelete("levels", level.id)}
                      className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Suppr.
                    </button>
                    <button
                      onClick={() => toggleLevel(level.id)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition"
                    >
                      {expandedLevels[level.id] ? "−" : "+"}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedLevels[level.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-3 space-y-3"
                    >
                      {level.chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className="bg-white dark:bg-gray-600 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-500"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{chapter.title}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenForm("chapter", chapter, { levelId: level.id })}
                                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                              >
                                Éditer
                              </button>
                              <button
                                onClick={() => handleDelete("chapters", chapter.id)}
                                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                              >
                                Suppr.
                              </button>
                              <button
                                onClick={() => toggleChapter(chapter.id)}
                                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
                              >
                                {expandedChapters[chapter.id] ? "−" : "+"}
                              </button>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedChapters[chapter.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 ml-4 space-y-2"
                              >
                                {chapter.lessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                                  >
                                    <span>{lesson.title}</span>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() =>
                                          handleOpenForm("lesson", lesson, { chapterId: chapter.id })
                                        }
                                        className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                                      >
                                        Éditer
                                      </button>
                                      <button
                                        onClick={() => handleDelete("lessons", lesson.id)}
                                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                      >
                                        Suppr.
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={() => handleOpenForm("lesson", null, { chapterId: chapter.id })}
                                  className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded transition"
                                >
                                  + Ajouter une leçon
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                      <button
                        onClick={() => handleOpenForm("chapter", null, { levelId: level.id })}
                        className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded transition"
                      >
                        + Ajouter un chapitre
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <button
              onClick={() => handleOpenForm("level", null, { courseId: course.id })}
              className="mt-3 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded transition"
            >
              + Ajouter un niveau
            </button>
          </motion.div>
        ))}
      </div>

      {openForm && (
        <FormModal
          type={formType}
          item={editing}
          parentIds={parentIds}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

// 🧩 Modal de création / édition
function FormModal({ type, item, parentIds, onClose }: any) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");

  const saveItem = async () => {
    const urlBase = `${API_BASE}/${type}s/`;
    let url = urlBase;
    let method: "POST" | "PATCH" = "POST";

    const body: any = { title };
    if (description) body.description = description;

    if (!item) {
      if (type === "level") body.course = parentIds.courseId;
      if (type === "chapter") body.level = parentIds.levelId;
      if (type === "lesson") body.chapter = parentIds.chapterId;
    } else {
      method = "PATCH";
      url += `${item.id}/`;
    }

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    onClose(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">
          {item ? `Éditer ${type}` : `Créer ${type}`}
        </h2>

        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
          />
          {(type === "course" || type === "chapter") && (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Annuler
          </button>
          <button
            onClick={saveItem}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Sauvegarder
          </button>
        </div>
      </motion.div>
    </div>
  );
}
