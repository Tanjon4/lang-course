"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Target, 
  Rocket, 
  Gem, 
  Building, 
  Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const About: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("section_histoire_title"),
      content: t("section_histoire_content"),
      icon: BookOpen,
    },
    {
      title: t("section_vision_title"),
      content: t("section_vision_content"),
      icon: Target,
    },
    {
      title: t("section_mission_title"),
      content: t("section_mission_content"),
      icon: Rocket,
    },
    {
      title: t("section_offres_title"),
      content: t("section_offres_content"),
      icon: Gem,
    },
    {
      title: t("section_organisation_title"),
      content: t("section_organisation_content"),
      icon: Building,
    },
    {
      title: t("section_role_title"),
      content: t("section_role_content"),
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-16 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("about_title")}
          </h1>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl font-normal">
            {t("about_description")}
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-white/80 shadow-lg hover:shadow-2xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-2 overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-3">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent">
                        {section.title}
                      </h2>
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
