// components/courses/CourseGlobalComponent.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { courseService } from "@/services/courseService";
import { CourseGlobal } from "@/types/course";
import CourseCard from "./CourseCard";

export default function CourseGlobalComponent() {
  const [courses, setCourses] = useState<CourseGlobal[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des cours :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: number) => {
    setEnrollingCourseId(courseId);
    try {
      await courseService.enroll(courseId);
      // Rafraîchir les données du cours après inscription
      const updatedCourses = await courseService.getCourses();
      setCourses(updatedCourses);
      
      // Rediriger vers la page du cours
      router.push(`/courses/${courseId}`);
    } catch (error: any) {
      console.error("❌ Erreur lors de l'inscription :", error);
      alert(`Erreur lors de l'inscription: ${error.message}`);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleSelectCourse = (course: CourseGlobal) => {
    router.push(`/courses/${course.id}`);
  };

  if (loading) {
    return (
      <div className="py-10 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-center text-gray-500 text-lg">Chargement des cours...</p>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="text-center py-12">
          <Languages className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Aucun cours disponible</h2>
          <p className="text-gray-500">Revenez plus tard pour découvrir nos nouvelles langues.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      {/* En-tête avec animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Languages className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nos Langues Disponibles
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Découvrez notre sélection de cours de langues et commencez votre voyage linguistique dès aujourd'hui
        </p>
      </motion.div>

      {/* Grille des cours avec animations échelonnées */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <CourseCard
              course={course}
              onSelect={handleSelectCourse}
              onEnroll={handleEnroll}
            />
          </motion.div>
        ))}
      </div>

      {/* Message d'information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
      >
        <p className="text-gray-700 text-sm">
          <span className="font-semibold text-blue-600">{courses.length} langues</span> disponibles • 
          Choisissez votre cours et commencez à apprendre immédiatement
        </p>
      </motion.div>
    </section>
  );
}