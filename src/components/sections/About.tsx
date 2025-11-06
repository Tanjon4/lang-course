"use client";

import React from "react";
import { motion } from "framer-motion";
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
  ArrowRight
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

  const values: ValueCard[] = [
    {
      title: t("section_histoire_title") || "Notre Histoire",
      description: t("section_histoire_content") || "Fondée avec une vision claire, notre entreprise a évolué pour devenir un leader dans son domaine.",
      icon: BookOpen,
      gradient: "from-orange-500 to-amber-500",
      accent: "orange"
    },
    {
      title: t("section_vision_title") || "Notre Vision",
      description: t("section_vision_content") || "Nous aspirons à créer un impact positif et durable dans notre industrie et au-delà.",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      accent: "blue"
    },
    {
      title: t("section_mission_title") || "Notre Mission",
      description: t("section_mission_content") || "Offrir des solutions innovantes qui transforment la façon dont nos clients travaillent et réussissent.",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      accent: "purple"
    },
    {
      title: t("section_offres_title") || "Nos Expertises",
      description: t("section_offres_content") || "Une gamme complète de services conçus pour répondre à tous vos besoins spécifiques.",
      icon: Gem,
      gradient: "from-emerald-500 to-teal-500",
      accent: "emerald"
    },
    {
      title: t("section_organisation_title") || "Notre Équipe",
      description: t("section_organisation_content") || "Des professionnels passionnés et expérimentés unis par des valeurs communes.",
      icon: Building,
      gradient: "from-red-500 to-orange-500",
      accent: "red"
    },
    {
      title: t("section_role_title") || "Notre Impact",
      description: t("section_role_content") || "Nous mesurons notre succès à l'aune de la réussite de nos clients et partenaires.",
      icon: Sparkles,
      gradient: "from-amber-500 to-yellow-500",
      accent: "amber"
    },
  ];

  const stats = [
    { number: "50K+", label: "Utilisateurs actifs", icon: Users },
    { number: "120+", label: "Pays desservis", icon: Globe },
    { number: "15", label: "Ans d'expérience", icon: Award },
    { number: "98%", label: "Satisfaction clients", icon: Heart },
  ];

  const timeline = [
    { year: "2008", event: "Fondation de l'entreprise", description: "Lancement avec une petite équipe passionnée" },
    { year: "2012", event: "Première innovation majeure", description: "Développement de notre technologie propriétaire" },
    { year: "2016", event: "Expansion internationale", description: "Ouverture de nos premiers bureaux à l'étranger" },
    { year: "2020", event: "Reconnaissance industrielle", description: "Prix de l'innovation et croissance accélérée" },
    { year: "2024", event: "Leader du marché", description: "Positionnement consolidé avec de nouveaux services" },
  ];

  // Fonction helper pour les couleurs
  const getColorClasses = (accent: string) => {
    const colorMap: Record<string, { text: string; border: string; bg: string }> = {
      orange: { text: "text-orange-600", border: "border-orange-200", bg: "bg-orange-500" },
      blue: { text: "text-blue-600", border: "border-blue-200", bg: "bg-blue-500" },
      purple: { text: "text-purple-600", border: "border-purple-200", bg: "bg-purple-500" },
      emerald: { text: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-500" },
      red: { text: "text-red-600", border: "border-red-200", bg: "bg-red-500" },
      amber: { text: "text-amber-600", border: "border-amber-200", bg: "bg-amber-500" }
    };
    return colorMap[accent] || colorMap.orange;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-500  to-zinc-400 py-20 lg:py-32">
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
                Depuis 2008
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
                Découvrir nos services
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300">
                Rencontrer l'équipe
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
              Notre <span className="bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">Parcours</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les étapes clés qui ont marqué notre croissance et notre succès.
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

      {/* Values Section */}
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
                  Nos Valeurs
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Ce qui nous <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">distingue</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes fondamentaux qui guident chacune de nos actions et décisions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                const colors = getColorClasses(value.accent);
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="h-full bg-gradient-to-br from-white to-orange-50 rounded-3xl border border-orange-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105">
                      <div 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${value.gradient} bg-opacity-10 border ${colors.border} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      <h3 className={`text-2xl font-black text-gray-900 mb-4 group-hover:${colors.text} transition-colors duration-300`}>
                        {value.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed text-lg">
                        {value.description}
                      </p>
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
              Prêt à transformer votre vision en réalité ?
            </h2>
            <p className="text-orange-100 text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Rejoignez les milliers de clients qui nous font confiance pour leurs projets les plus ambitieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                Démarrer un projet
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300 text-lg">
                Contactez-nous
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;