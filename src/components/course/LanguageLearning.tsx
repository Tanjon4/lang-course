"use client";

import { useEffect, useState } from "react";
import { ChevronDown, BookOpen, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import { CourseGlobal, Level } from "@/types/course";

export default function LanguageLearning({ courseId }: { courseId: number }) {
  const [course, setCourse] = useState<CourseGlobal | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ Ampiasaina tsara ny courseService.getCourseById()
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourse(courseId);
        setCourse(data);
      } catch (error) {
        console.error("Erreur lors du chargement du cours:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return (
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Chargement du cours...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Titre du cours */}
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="text-blue-600" /> {course.title}
      </h1>

      {/* Description */}
      {course.description && (
        <p className="text-gray-600 mb-6">{course.description}</p>
      )}

      {/* Liste des niveaux */}
      {course.levels.map((level: Level, index) => (
        <motion.div
          key={level.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === index ? null : index)}
            className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-lg">{level.title}</span>
            <ChevronDown
              className={`transition-transform duration-300 ${
                expanded === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Chapitres du niveau */}
          {expanded === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-4 space-y-3"
            >
              {level.chapters.length === 0 && (
                <p className="text-sm text-gray-500">Aucun chapitre disponible.</p>
              )}

              {level.chapters.map((chap) => (
                <div
                  key={chap.id}
                  className="border-l-4 border-blue-200 pl-3 mt-2"
                >
                  <p className="font-medium text-gray-800">{chap.title}</p>
                  <ul className="ml-4 space-y-1 mt-2">
                    {chap.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() =>
                            router.push(
                              `/fr/courses/${course.id}/${level.id}/${chap.id}/${lesson.id}`
                            )
                          }
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                          <Play size={14} /> {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
