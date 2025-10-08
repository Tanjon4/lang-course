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
  Laptop,
  Mail
} from "lucide-react";

// Définition des types pour les variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const sections = [
  {
    title: "Histoire",
    content: "Lancée fin août 2025 par une équipe passionnée, Hoavi est née de l'ambition de rendre l'éducation linguistique et scolaire utile, moderne et accessible — avec des certificats concrets qui ouvrent des portes académiques et professionnelles.",
    icon: BookOpen,
  },
  {
    title: "Vision",
    content: "Être la référence mondiale d'un modèle éducatif hybride où apprendre rime avec accréditation : des parcours alignés sur des référentiels internationaux (ex. CEFR pour les langues) et reconnus par des partenaires académiques et entreprises, préparant les apprenants à des carrières réelles.",
    icon: Target,
  },
  {
    title: "Mission",
    content: `• Proposer des parcours certifiants, personnalisés et mesurables (en ligne, présentiel, mobile, VR)  
• Fournir des compétences transférables : langue + savoir-faire métier  
• Délivrer des certificats vérifiables (examens, portfolios, badges numériques) utiles pour études et emploi  
• Étendre l'offre de cours certifiants à l'international d'ici 2026`,
    icon: Rocket,
  },
  {
    title: "Offres & Projet Stratégique",
    content: `• Parcours certifiants linguistiques : modules progressifs, évaluations continues, examen final, certificat numérique (aligné CEFR A1→C2 si souhaité)  
• Présentiel (collèges & lycées) : cursus intégrés avec délivrance de certificats internes et articulation avec certifications nationales/partenaires  
• Technologie : site → app mobile → plateforme VR pour simulations immersives et évaluations pratiques  
• Expansion mondiale : déploiement des parcours certifiants en plusieurs pays d'ici 2026  
• Qualité & accréditation : cellule qualité dédiée, conventions avec universités/organismes, processus d'accréditation`,
    icon: Gem,
  },
  {
    title: "Organisation & Ressources",
    content: `• Équipe Pédagogique : designers de cours et évaluateurs  
• Bureau Certification & Qualité : création de référentiels, jurys d'examen, délivrance  
• Relations Institutionnelles : partenariats, accréditations  
• Tech & Produit : système de gestion des examens, badges numériques, vérification blockchain-ready  
• Support & Carrières : aide à la valorisation du certificat auprès d'employeurs et d'institutions`,
    icon: Building,
  },
  {
    title: "Rôle de Hoavi",
    content: "Hoavi conçoit, met en œuvre, évalue et délivre des certifications utiles et vérifiables, tout en accompagnant les apprenants pour rendre ces certificats opérationnels sur le marché du travail.",
    icon: Sparkles,
  },
];

const About: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Qui sommes-nous ?
          </h1>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl font-normal">
            Hoavi est une startup edtech qui réinvente l'apprentissage des langues
            en combinant cours en ligne, formations présentielle (collège → lycée)
            et technologies immersives (mobile, VR).  
            Nos parcours sont certifiants : chaque apprenant peut obtenir des certificats
            et badges numériques vérifiables attestant de compétences linguistiques et professionnelles.
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