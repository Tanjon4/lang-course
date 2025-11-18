"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Target, 
  Rocket, 
  Gem, 
  Building, 
  Sparkles,
  Users,
  Globe,
  Award,
  Heart,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Variants simplifiés pour éviter les problèmes TypeScript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface ValueCard {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  accent: string;
}

const About: React.FC = () => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCardExpansion = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const isDescriptionLong = (text: string) => {
    // Estimation: environ 4 lignes de texte
    return text.length > 200;
  };

  const values: ValueCard[] = [
    {
      title: t("section_histoire_title") || "Notre Histoire",
      description: t("section_histoire_content") || "Fondée avec une vision claire, notre entreprise a évolué pour devenir un leader dans son domaine grâce à notre engagement constant envers l'excellence et l'innovation. Nous croyons en la puissance de la transformation digitale pour créer un impact positif durable.",
      icon: BookOpen,
      gradient: "from-orange-500 to-amber-500",
      accent: "orange"
    },
    {
      title: t("section_vision_title") || "Notre Vision",
      description: t("section_vision_content") || "Nous aspirons à créer un impact positif et durable dans notre industrie et au-delà. Notre vision est de révolutionner l'apprentissage des langues en rendant l'éducation accessible à tous, partout dans le monde, grâce à des technologies innovantes et une approche humaine.",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      accent: "blue"
    },
    {
      title: t("section_mission_title") || "Notre Mission",
      description: t("section_mission_content") || "Offrir des solutions innovantes qui transforment la façon dont nos clients travaillent et réussissent. Nous nous engageons à fournir des expériences d'apprentissage exceptionnelles qui dépassent les attentes et créent une valeur réelle pour nos utilisateurs.",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      accent: "purple"
    },
    {
      title: t("section_offres_title") || "Nos Expertises",
      description: t("section_offres_content") || "Une gamme complète de services conçus pour répondre à tous vos besoins spécifiques. De l'apprentissage personnalisé aux solutions d'entreprise, nous offrons des parcours adaptés à chaque profil avec un accompagnement expert tout au long du processus.",
      icon: Gem,
      gradient: "from-emerald-500 to-teal-500",
      accent: "emerald"
    },
    {
      title: t("section_organisation_title") || "Notre Équipe",
      description: t("section_organisation_content") || "Des professionnels passionnés et expérimentés unis par des valeurs communes. Notre équipe multiculturelle combine expertise technique et pédagogique pour créer des solutions qui font la différence dans la vie de nos utilisateurs.",
      icon: Building,
      gradient: "from-red-500 to-orange-500",
      accent: "red"
    },
    {
      title: t("section_role_title") || "Notre Impact",
      description: t("section_role_content") || "Nous mesurons notre succès à l'aune de la réussite de nos clients et partenaires. Chaque jour, nous travaillons à créer un impact mesurable grâce à des résultats concrets et des témoignages inspirants qui démontrent la valeur de notre approche innovante.",
      icon: Sparkles,
      gradient: "from-amber-500 to-yellow-500",
      accent: "amber"
    },
  ];

  const stats = [
    { number: "50K+", label: t("actif_user"), icon: Users },
    { number: "120+", label: t("Pays_desservis"), icon: Globe },
    { number: "15", label: t("Ans_expérience"), icon: Award },
    { number: "98%", label: t("Satisfaction"), icon: Heart },
  ];

  const timeline = [
    { year: "2023", event: t("Fondation"), description: t("lancement") },
    { year: "2024", event: t("innovation_majeure"), description: t("dev") },
    { year: "2024", event: t("Expansion"), description: t("ouverture") },
    { year: "2025", event: t("Reconnaissance"), description: t("inno") },
    { year: "2025", event: t("aprentissage_langue"), description: t("pos")},
  ];

  // Fonction helper pour les couleurs
  const getColorClasses = (accent: string) => {
    const colorMap: Record<string, { text: string; border: string; bg: string; hover: string }> = {
      orange: { 
        text: "text-orange-600", 
        border: "border-orange-200", 
        bg: "bg-orange-500",
        hover: "hover:text-orange-700" 
      },
      blue: { 
        text: "text-blue-600", 
        border: "border-blue-200", 
        bg: "bg-blue-500",
        hover: "hover:text-blue-700" 
      },
      purple: { 
        text: "text-purple-600", 
        border: "border-purple-200", 
        bg: "bg-purple-500",
        hover: "hover:text-purple-700" 
      },
      emerald: { 
        text: "text-emerald-600", 
        border: "border-emerald-200", 
        bg: "bg-emerald-500",
        hover: "hover:text-emerald-700" 
      },
      red: { 
        text: "text-red-600", 
        border: "border-red-200", 
        bg: "bg-red-500",
        hover: "hover:text-red-700" 
      },
      amber: { 
        text: "text-amber-600", 
        border: "border-amber-200", 
        bg: "bg-amber-500",
        hover: "hover:text-amber-700" 
      }
    };
    return colorMap[accent] || colorMap.orange;
  };

  // Layout asymétrique pour les cartes
  const getCardLayout = (index: number) => {
    const layouts = [
      "col-span-1 md:col-span-2 lg:col-span-1", // Standard
      "col-span-1 md:col-span-2 lg:col-span-2", // Large
      "col-span-1 md:col-span-1 lg:col-span-1", // Standard
      "col-span-1 md:col-span-2 lg:col-span-2", // Large
      "col-span-1 md:col-span-2 lg:col-span-1", // Standard
      "col-span-1 md:col-span-1 lg:col-span-2", // Large
    ];
    return layouts[index % layouts.length];
  };

  const getCardHeight = (index: number) => {
    const heights = [
      "min-h-[280px]",
      "min-h-[320px]",
      "min-h-[260px]",
      "min-h-[300px]",
      "min-h-[280px]",
      "min-h-[340px]",
    ];
    return heights[index % heights.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-500 to-zinc-400 py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm uppercase tracking-wider">
                {t("depuis") || "Depuis 2024"}
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              {t("about_title") || "À Propos de Nous"}
            </h1>
            
            <p className="text-xl lg:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8">
              {t("about_description") || "Découvrez l'histoire, la mission et les valeurs qui nous animent depuis nos débuts."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-300 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                {t("Découvrir_services") || "Découvrir nos services"}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300">
                {t("Rencontrer") || "Rencontrer l'équipe"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-orange-200 to-amber-500 rounded-2xl shadow-lg">
                      <IconComponent className="w-8 h-8 text-zinc-500" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {t("notre")} <span className="bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">{t("Parcours")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("p_decouvrez")}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-300 to-amber-400"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-2xl font-black text-orange-300 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-200 rounded-full border-4 border-white shadow-lg"></div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section avec Layout Asymétrique */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-3 rounded-full border border-orange-200 mb-6">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
                  {t("valeur_title")}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                {t("h2_nous")} <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{t("span_d")}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("fondementaux")}
              </p>
            </motion.div>

            {/* Grid Asymétrique */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                const colors = getColorClasses(value.accent);
                const isExpanded = expandedCards.has(index);
                const isLongDescription = isDescriptionLong(value.description);
                const layoutClass = getCardLayout(index);
                const heightClass = getCardHeight(index);
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`group ${layoutClass}`}
                  >
                    <div className={`h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 flex flex-col ${heightClass}`}>
                      
                      {/* Icon */}
                      <div 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${value.gradient} bg-opacity-10 border ${colors.border} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl font-black text-gray-900 mb-4 ${colors.hover} transition-colors duration-300`}>
                        {value.title}
                      </h3>

                      {/* Description avec gestion "Voir plus/moins" */}
                      <div className="flex-1 flex flex-col">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={isExpanded ? 'expanded' : 'collapsed'}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1"
                          >
                            <p className={`text-gray-600 leading-relaxed ${
                              !isExpanded && isLongDescription ? 'line-clamp-4' : ''
                            }`}>
                              {value.description}
                            </p>
                          </motion.div>
                        </AnimatePresence>

                        {/* Bouton Voir plus/moins */}
                        {isLongDescription && (
                          <motion.button
                            onClick={() => toggleCardExpansion(index)}
                            className={`flex items-center gap-1 mt-4 ${colors.text} font-semibold text-sm hover:underline transition-all duration-300 self-start`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isExpanded ? (
                              <>
                                <span>{t("see_less")}</span>
                                <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>{t("see_more")}</span>
                                <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>

                      {/* Accent Bar */}
                      <div className={`mt-6 w-12 h-1 rounded-full bg-gradient-to-r ${value.gradient} transition-all duration-500 group-hover:w-20`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-400 to-orange-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              {t("h2_vision")}
            </h2>
            <p className="text-orange-100 text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              {t("p_rej")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                {t("start")}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300 text-lg">
                {t("contact_title")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;