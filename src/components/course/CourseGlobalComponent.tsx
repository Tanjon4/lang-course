// components/courses/CourseGlobalComponent.tsx - CODE COMPLET AMÉLIORÉ
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages, BookOpen, Users, Star, Clock, Award, Play, Lock } from "lucide-react";
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
  const { t } = useTranslation();

  // Cours de démonstration pour les utilisateurs non connectés
  const demoCourses: CourseGlobal[] = [
    {
      id: 1,
      title: t("demo_course_1_title", "Français Débutant"),
      description: t("demo_course_1_desc", "Maîtrisez les bases du français avec des leçons interactives et des exercices pratiques. Parfait pour les débutants."),
      language_code: "Français",
      thumbnail_url: "/images/french-course.jpg",
      levels: [],
      progress: undefined
    },
    {
      id: 2,
      title: t("demo_course_2_title", "English Intermediate"),
      description: t("demo_course_2_desc", "Améliorez votre anglais avec des conversations avancées, grammaire complexe et vocabulaire professionnel."),
      language_code: "Anglais",
      thumbnail_url: "/images/french-course.jpg",
      levels: [],
      progress: undefined

    },
    {
      id: 3,
      title: t("demo_course_3_title", "Español Básico"),
      description: t("demo_course_3_desc", "Découvrez la langue espagnole et la culture hispanique à travers des leçons dynamiques et immersives."),
      
      language_code: "Espagnol",
      thumbnail_url: "/images/french-course.jpg",
      levels: [],
      progress: undefined
    },
    {
      id: 4,
      title: t("demo_course_4_title", "Deutsch für Anfänger"),
      description: t("demo_course_4_desc", "Apprenez l'allemand desde zéro avec une méthode progressive et des exercices interactifs."),
      thumbnail_url: "/images/french-course.jpg",
      levels: [],
      progress: undefined,
      language_code: "Allemand",
      
    },
    {
      id: 5,
      title: t("demo_course_5_title", "Italiano Base"),
      description: t("demo_course_5_desc", "Plongez dans la langue italienne avec des leçons culturelles et une approche communicative."),
      thumbnail_url: "/images/french-course.jpg",
      levels: [],
      progress: undefined,
      language_code: "Italien",
      
    },
    {
      id: 6,
      title: t("demo_course_6_title", "Japanese Starter"),
      description: t("demo_course_6_desc", "Initiez-vous au japonais avec les hiragana, katakana et phrases de base pour voyager ou étudier."),
      
      language_code: "Japonais",
      thumbnail_url: "/images/french-course.jpg",
      levels: [],
      progress: undefined
    }
  ];

  // Fonction pour générer des dégradés de couleurs basés sur l'ID du cours
  const getCourseGradient = (courseId: number) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-blue-600",
      "from-orange-500 to-red-600",
      "from-purple-500 to-pink-600",
      "from-teal-500 to-green-600",
      "from-red-500 to-orange-600"
    ];
    return gradients[courseId % gradients.length];
  };

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
        
        // En cas d'erreur pour les non-connectés, utiliser les cours de démo
        if (!isAuthenticated) {
          setCourses(demoCourses);
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCourses();
    } else {
      // Pour les non-connectés, utiliser les cours de démonstration
      setTimeout(() => {
        setCourses(demoCourses);
        setLoading(false);
      }, 1000); // Simuler un temps de chargement
    }
  }, [user, isAuthenticated]);

  const handleEnroll = async (courseId: number) => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${courseId}`));
      return;
    }

    setEnrollingCourseId(courseId);
    
    try {
      console.log("🎯 Inscription cours:", courseId);
      
      try {
        await courseService.enroll(courseId);
        console.log("✅ Enrollment réussi");
      } catch (enrollError) {
        console.log("⚠️ Enrollment échoué (backend), mais on continue...");
      }
      
      router.push(`/courses/${courseId}`);
      
    } catch (error: any) {
      console.error("❌ Erreur inattendue:", error);
      router.push(`/courses/${courseId}`);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleSelectCourse = (course: CourseGlobal) => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${course.id}`));
      return;
    }
    router.push(`/courses/${course.id}`);
  };

  const handlePreviewCourse = (courseId: number) => {
    router.push(`/course-preview/${courseId}`);
  };

  // Composant pour les utilisateurs non connectés
  if (!isAuthenticated) {
    return (
      <section className="py-10 max-w-7xl mx-auto px-4">
        {/* Section Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Languages className="h-12 w-12 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-600 via-amber-400 to-zinc-600 bg-clip-text text-transparent">
              {t("langures", "Parlez Couramment")}
            </h1>
          </div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            {t("welcome_message", "Apprenez une nouvelle langue de manière interactive, amusante et efficace avec notre plateforme d'apprentissage innovante.")}
          </p>
        </motion.div>

        {/* Bannière de connexion requise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl border border-blue-200 shadow-lg mb-16"
        >
          <div className="max-w-2xl mx-auto px-6">
            <div className="bg-white w-20 h-20 rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6">
              <Lock className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("requise", "Débloquez l'Apprentissage Complet")}
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {t("text_suggestion", "Rejoignez notre communauté d'apprenants pour accéder à tous les cours, exercices interactifs, et suivre votre progression en temps réel.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push('/auth/register')}
                className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                {t("start_free", "Commencer Gratuitement")}
              </button>
              <button
                onClick={() => router.push('/auth/login')}
                className="border-2 border-orange-600 text-blue-600 px-10 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg"
              >
                {t("login", "Se connecter")}
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              {t("no_credit_card", "Aucune carte de crédit requise • Essai gratuit")}
            </p>
          </div>
        </motion.div>

        {/* Aperçu des cours disponibles */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("preview_courses", "Explorez Nos Cours de Langues")}
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t("preview_description", "Découvrez notre sélection complète de cours de langues. Inscrivez-vous pour accéder aux leçons interactives, exercices pratiques, et fonctionnalités avancées.")}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {demoCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Image du cours avec dégradé */}
                <div className={`h-48 bg-gradient-to-br ${getCourseGradient(course.id)} relative overflow-hidden`}>
                  <div className="absolute inset-0  group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-95 px-3 py-1 rounded-full shadow-md">
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {course.language_code}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white bg-opacity-95 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                      Débutant
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>10 + {t("students", "étudiants")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>4/5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">12</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      10 {t("lessons", "leçons")}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => router.push('/auth/register')}
                    className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group/btn"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Play className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      {t("start_learning", "Commencer à apprendre")}
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section avantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 mb-16 border border-gray-200"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t("why_join", "Pourquoi choisir notre plateforme ?")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">{t("interactive_lessons", "Leçons Interactives")}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t("interactive_desc", "Contenu engageant avec exercices pratiques et feedback immédiat")}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">{t("certificates", "Certificats Reconnus")}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t("certificates_desc", "Obtenez des certificats pour valider vos compétences et booster votre CV")}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">{t("progress_tracking", "Suivi Personnalisé")}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t("progress_desc", "Visualisez vos progrès et recevez des recommandations adaptées")}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Clock className="h-10 w-10 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">{t("flexible_learning", "Apprentissage Flexible")}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t("flexible_desc", "Apprenez à votre rythme, où que vous soyez, sur tous vos appareils")}</p>
            </div>
          </div>
        </motion.div>

        {/* Section statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-white rounded-3xl p-12 border border-gray-200 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            {t("join_community", "Rejoignez notre communauté d'apprenants")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 text-sm">{t("active_students", "Étudiants actifs")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600 text-sm">{t("languages", "Langues disponibles")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm">{t("success_rate", "Taux de réussite")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">{t("support", "Support disponible")}</div>
            </div>
          </div>
          
          
        </motion.div>
      </section>
    );
  }

  // États de chargement pour utilisateurs connectés
  if (loading) {
    return (
      <div className="py-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("langures", "Langues")}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-center text-gray-500 text-lg">{t("chargement", "Chargement de vos cours...")}</p>
      </div>
    );
  }

  // État d'erreur
  if (error && courses.length === 0) {
    return (
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
          <div className="text-red-600 text-lg font-semibold mb-2">{t("error", "Erreur")}</div>
          <div className="text-red-500 text-sm mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            {t("retry", "Réessayer")}
          </button>
        </div>
      </section>
    );
  }

  // Aucun cours disponible
  if (!courses.length) {
    return (
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="text-center py-12">
          <Languages className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">{t("no_courses", "Aucun cours disponible")}</h2>
          <p className="text-gray-500 mb-6">{t("no_courses_desc", "Aucun cours n'est disponible pour le moment.")}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t("refresh", "Rafraîchir")}
          </button>
        </div>
      </section>
    );
  }

  // Interface principale pour utilisateurs connectés
  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Languages className="h-10 w-10 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("langures", "Mes Cours de Langues")}
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {courses.length} {t("salutations", "cours disponibles")} {user?.username}
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
              // isEnrolling={enrollingCourseId === course.id}
            />
          </motion.div>
        ))}
      </div>

      {/* Section de recommandations */}
      {courses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {t("continue_learning", "Continuez votre apprentissage")}
          </h3>
          <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            {t("continue_desc", "Reprenez là où vous vous êtes arrêté ou découvrez de nouveaux cours pour élargir vos compétences linguistiques.")}
          </p>
        </motion.div>
      )}
    </section>
  );
}