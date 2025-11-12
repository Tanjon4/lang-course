// components/courses/CourseGlobalComponent.tsx - CODE FINAL
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/contexts/AuthContext';
import { courseService } from "@/services/courseService";
import { CourseGlobal } from "@/types/course";
import CourseCard from "./CourseCard";
import { useTranslation } from "react-i18next";

export default function CourseGlobalComponent() {
  const [courses, setCourses] = useState<CourseGlobal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState<number | null>(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {t} = useTranslation()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("🔄 Chargement des cours...");
        const data = await courseService.getCourses();
        console.log("✅ Cours chargés:", data.length, "cours");
        setCourses(data);
        setError(null);
      } catch (error: any) {
        console.error("❌ Erreur chargement cours:", error);
        setError("Erreur de chargement: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCourses();
    } else {
      setLoading(false);
      setError("Veuillez vous connecter pour accéder aux cours.");
    }
  }, [user, isAuthenticated]);

  const handleEnroll = async (courseId: number) => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    setEnrollingCourseId(courseId);
    
    try {
      console.log("🎯 Inscription cours:", courseId);
      
      // Essayer l'enrollment (mais continuer même en cas d'erreur)
      try {
        await courseService.enroll(courseId);
        console.log("✅ Enrollment réussi");
      } catch (enrollError) {
        console.log("⚠️ Enrollment échoué (backend), mais on continue...");
      }
      
      // Redirection garantie vers le cours
      console.log("🚀 Redirection vers cours:", courseId);
      router.push(`/courses/${courseId}`);
      
    } catch (error: any) {
      console.error("❌ Erreur inattendue:", error);
      // Redirection de fallback
      router.push(`/courses/${courseId}`);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleSelectCourse = (course: CourseGlobal) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    router.push(`/courses/${course.id}`);
  };

  if (!isAuthenticated) {
    return (
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="text-center py-12 bg-yellow-50 rounded-2xl border border-yellow-200">
          <Languages className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">{t("requise")}</h2>
          <p className="text-yellow-600 mb-6">{("text_suggestion")}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            {t("login")}
          </button>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <div className="py-10 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
        </div>
        <p className="text-center text-gray-500 text-lg">{t("chargement")}</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <section className="py-10 max-w-7xl mx-auto px-4">
  //       <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
  //         <div className="text-red-600 text-lg font-semibold mb-2">Erreur</div>
  //         <div className="text-red-500 text-sm mb-4">{error}</div>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
  //         >
  //           Réessayer
  //         </button>
  //       </div>
  //     </section>
  //   );
  // }

  if (!courses.length) {
    return (
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="text-center py-12">
          <Languages className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Aucun cours disponible</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t("Rafraîchir")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Languages className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("langures")}
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {courses.length} {t("salutations") }{user?.username}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <CourseCard
              course={course}
              onSelect={handleSelectCourse}
              onEnroll={handleEnroll}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}