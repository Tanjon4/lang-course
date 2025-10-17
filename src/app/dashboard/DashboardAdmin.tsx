"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Layers, FileText, PlayCircle } from "lucide-react";

// Types
interface CourseGlobal {
  id: number;
  title: string;
  description: string;
  language_code: string;
  is_published: boolean;
}

interface Level {
  id: number;
  course_global: number;
  number: number;
  title: string;
}

interface Chapter {
  id: number;
  level: number;
  number: number;
  title: string;
}

interface Lesson {
  id: number;
  chapter: number;
  number: number;
  title: string;
  video_url?: string;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<CourseGlobal[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, levelsRes, chaptersRes, lessonsRes] = await Promise.all([
          fetch("/api/courses/"),
          fetch("/api/levels/"),
          fetch("/api/chapters/"),
          fetch("/api/lessons/"),
        ]);
        const [coursesData, levelsData, chaptersData, lessonsData] = await Promise.all([
          coursesRes.json(),
          levelsRes.json(),
          chaptersRes.json(),
          lessonsRes.json(),
        ]);

        setCourses(coursesData);
        setLevels(levelsData);
        setChapters(chaptersData);
        setLessons(lessonsData);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Tableau de bord des cours
      </motion.h1>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card icon={<BookOpen />} label="Cours globaux" value={courses.length} color="bg-blue-500" />
        <Card icon={<Layers />} label="Niveaux" value={levels.length} color="bg-green-500" />
        <Card icon={<FileText />} label="Chapitres" value={chapters.length} color="bg-yellow-500" />
        <Card icon={<PlayCircle />} label="Leçons" value={lessons.length} color="bg-purple-500" />
      </div>

      {/* Liste des cours */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-blue-500" /> {course.title}
            </h2>
            <p className="text-gray-500 mt-2">{course.description}</p>

            {/* Niveaux du cours */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levels
                .filter((lvl) => lvl.course_global === course.id)
                .map((level) => (
                  <motion.div
                    key={level.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-semibold text-gray-700">
                      Niveau {level.number}: {level.title}
                    </h3>

                    {/* Chapitres */}
                    <ul className="mt-2 space-y-1">
                      {chapters
                        .filter((ch) => ch.level === level.id)
                        .map((ch) => (
                          <li key={ch.id} className="text-sm text-gray-600">
                            • Chapitre {ch.number}: {ch.title}
                          </li>
                        ))}
                    </ul>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Card({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-2xl text-white shadow-md ${color} flex flex-col items-center justify-center`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-lg">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </motion.div>
  );
}
