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
  Calendar,
  User,
  ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};

const About: React.FC = () => {
  const { t } = useTranslation();

  const featuredArticles = [
    {
      title: t("section_histoire_title"),
      content: t("section_histoire_content"),
      icon: BookOpen,
      category: "Heritage",
      readTime: "4 min",
      author: "Équipe Éditoriale",
      featured: true,
      layout: "horizontal",
      size: "large"
    },
    {
      title: t("section_vision_title"),
      content: t("section_vision_content"),
      icon: Target,
      category: "Stratégie",
      readTime: "3 min",
      author: "Direction Générale",
      featured: false,
      layout: "vertical",
      size: "medium"
    },
    {
      title: t("section_mission_title"),
      content: t("section_mission_content"),
      icon: Rocket,
      category: "Engagement",
      readTime: "5 min",
      author: "Comité Exécutif",
      featured: true,
      layout: "vertical",
      size: "medium"
    },
    {
      title: t("section_offres_title"),
      content: t("section_offres_content"),
      icon: Gem,
      category: "Expertise",
      readTime: "2 min",
      author: "Équipe Innovation",
      featured: false,
      layout: "horizontal",
      size: "small"
    },
    {
      title: t("section_organisation_title"),
      content: t("section_organisation_content"),
      icon: Building,
      category: "Structure",
      readTime: "6 min",
      author: "Ressources Humaines",
      featured: true,
      layout: "full",
      size: "large"
    },
    {
      title: t("section_role_title"),
      content: t("section_role_content"),
      icon: Sparkles,
      category: "Impact",
      readTime: "3 min",
      author: "Équipe Communication",
      featured: false,
      layout: "vertical",
      size: "medium"
    },
  ];

  const getArticleLayout = (layout: string, size: string) => {
    switch (layout) {
      case "horizontal":
        return "md:col-span-2";
      case "full":
        return "md:col-span-3";
      case "vertical":
        return size === "large" ? "md:col-span-2" : "md:col-span-1";
      default:
        return "md:col-span-1";
    }
  };

  const getArticleHeight = (layout: string) => {
    switch (layout) {
      case "horizontal":
        return "min-h-[200px]";
      case "full":
        return "min-h-[400px]";
      case "vertical":
        return "min-h-[350px]";
      default:
        return "min-h-[300px]";
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 py-20 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 " />
      
      {/* Accent Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20 mix-blend-multiply" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-red-200 to-orange-200 rounded-full blur-3xl opacity-30 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Magazine Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20 border-b border-orange-200/50 pb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-transparent" />
              <span className="text-orange-600 font-semibold tracking-widest text-sm uppercase">
                Édition Spéciale
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent leading-tight">
              {t("about_title")}
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-red-400 rounded-full mx-auto mb-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-light mb-8 italic">
              {t("about_description")}
            </p>
            
            {/* Magazine Metadata */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>{new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="w-1 h-1 bg-orange-300 rounded-full" />
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                <span>Rédaction Collective</span>
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* Magazine Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {featuredArticles.map((article, index) => {
            const IconComponent = article.icon;
            const layoutClass = getArticleLayout(article.layout, article.size);
            const heightClass = getArticleHeight(article.layout);
            
            return (
              <motion.article
                key={index}
                
                className={`${layoutClass} ${heightClass} group cursor-pointer`}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className={`
                  h-full bg-white/80 backdrop-blur-sm rounded-2xl 
                  border border-orange-100/70 shadow-lg
                  hover:shadow-2xl transition-all duration-500 ease-out
                  overflow-hidden relative
                  ${article.featured ? 'ring-2 ring-orange-200/50' : ''}
                `}>
                  
                  {/* Featured Badge */}
                  
                  {/* Article Header */}
                  <div className="p-6 md:p-8 border-b border-orange-100/50 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-200/50">
                          <IconComponent className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">
                          {article.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h2 className={`
                      font-bold text-gray-900 leading-tight
                      ${article.layout === 'full' ? 'text-3xl md:text-4xl' : 
                        article.size === 'large' ? 'text-2xl md:text-3xl' : 
                        'text-xl md:text-2xl'}
                      group-hover:text-orange-700 transition-colors duration-300
                    `}>
                      {article.title}
                    </h2>

                    {/* Author Line */}
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <User className="w-3 h-3" />
                      <span>Par {article.author}</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 md:p-8">
                    <p className={`
                      text-gray-700 leading-relaxed
                      ${article.layout === 'full' ? 'text-lg md:text-xl' : 
                        article.size === 'large' ? 'text-base md:text-lg' : 'text-sm md:text-base'}
                      line-clamp-4
                    `}>
                      {article.content}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-orange-100/50">
                      {/* <button className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        Lire la suite
                        <ArrowRight className="w-4 h-4" />
                      </button> */}
                      
                      {/* Social Metrics */}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>📖 {article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 rounded-2xl transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-amber-500/5" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Magazine Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center border-t border-orange-200/50 pt-12"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
              />
            ))}
          </div>
          
          <p className="text-gray-600 text-sm uppercase tracking-widest">
            Continuez votre lecture • Édition {new Date().getFullYear()}
          </p>
          
          <div className="w-24 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto mt-4" />
        </motion.footer>
      </div>
    </section>
  );
};

export default About;