'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageCircle,
  Users,
  Globe,
  Video,
  BookOpen,
  Star
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    language: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', language: '' });
    }, 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@langueapp.com',
      description: 'Nous répondons sous 24h',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+33 1 23 45 67 89',
      description: 'Lun-Ven 9h-18h',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: '123 Rue des Langues',
      description: '75001 Paris, France',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Support',
      content: '24/7 disponible',
      description: 'Chat en direct',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const languages = [
    'Anglais',
    'Espagnol', 
    'Français',
    'Allemand',
    'Italien',
    'Japonais',
    'Chinois',
    'Arabe',
    'Portugais',
    'Russe'
  ];

  const features = [
    {
      icon: Globe,
      title: 'Professeurs Natifs',
      description: 'Apprenez avec des experts de la langue'
    },
    {
      icon: Video,
      title: 'Cours en Visio',
      description: 'Sessions interactives en direct'
    },
    {
      icon: BookOpen,
      title: 'Ressources Illimitées',
      description: 'Accès à tous nos contenus'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={ref} id='contact' className="min-h-screen bg-linear-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-8 h-8 bg-blue-100 rounded-full opacity-50"
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-6 h-6 bg-purple-100 rounded-full opacity-50"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-green-100 rounded-full opacity-50"
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-linear-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Contactez-<span className="bg-linear-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">Nous</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Nous sommes là pour vous accompagner dans votre aventure linguistique. 
            Une question ? Un projet ? Parlons-en !
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="shrink-0">
                    <div className={`w-14 h-14 bg-linear-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-900 font-medium text-base">{item.content}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-yellow-200 to-orange-300 rounded-2xl p-6 text-white relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-8 h-8" />
                  <h3 className="font-bold text-lg">Communauté Dynamique</h3>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  Rejoignez plus de <span className="font-bold text-white">50,000 apprenants</span> passionnés 
                  qui maîtrisent déjà une nouvelle langue avec notre méthode innovante.
                </p>
                <div className="flex items-center space-x-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current text-yellow-300" />
                  ))}
                  <span className="text-blue-100 text-sm ml-2">4.9/5 (2.4k avis)</span>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-4">Pourquoi Nous Choisir ?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      <feature.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{feature.title}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Message Envoyé !
                    </h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                      Merci pour votre message. Notre équipe pédagogique vous répondra 
                      dans les plus brefs délais pour vous accompagner dans votre projet linguistique.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-orange-400 hover:text-amber-600 transition-all duration-300"
                    >
                      Nouveau message
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Parlons de Votre Projet
                      </h2>
                      <p className="text-gray-600 text-lg mb-8">
                        Remplissez le formulaire ci-dessous et notre équipe d'experts linguistiques 
                        vous contactera personnellement.
                      </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          whileFocus={{ scale: 1.02 }}
                          className="group"
                        >
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-300"
                            placeholder="Votre nom complet"
                          />
                        </motion.div>

                        <motion.div 
                          whileFocus={{ scale: 1.02 }}
                          className="group"
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-300"
                            placeholder="votre@email.com"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileFocus={{ scale: 1.02 }} className="group">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Sujet *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-300"
                            placeholder="Sujet de votre message"
                          />
                        </motion.div>

                        <motion.div whileFocus={{ scale: 1.02 }} className="group">
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                            Langue d'intérêt
                          </label>
                          <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-300 bg-white"
                          >
                            <option value="">Sélectionnez une langue</option>
                            {languages.map((lang) => (
                              <option key={lang} value={lang}>{lang}</option>
                            ))}
                          </select>
                        </motion.div>
                      </div>

                      <motion.div whileFocus={{ scale: 1.02 }} className="group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none group-hover:border-blue-300"
                          placeholder="Décrivez votre projet, vos objectifs linguistiques, ou toute question que vous pourriez avoir..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-linear-to-r from-orange-400 to-amber-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            <span>Envoyer le message</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Questions Fréquentes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "Quelles langues proposez-vous ?",
                    answer: "12 langues dont anglais, espagnol, français, allemand, italien, japonais, chinois, arabe, portugais, russe, et plus encore."
                  },
                  {
                    question: "Comment fonctionnent les cours en ligne ?",
                    answer: "Cours en visio avec professeurs natifs, plateforme interactive, exercices pratiques, et suivi personnalisé."
                  },
                  {
                    question: "Proposez-vous des essais gratuits ?",
                    answer: "Oui, profitez d'une séance d'essai gratuite avec un de nos professeurs pour découvrir notre méthode."
                  },
                  {
                    question: "Quelle est la durée des formations ?",
                    answer: "Formations flexibles de 1 à 12 mois, adaptées à vos objectifs et votre rythme d'apprentissage."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 group-hover:bg-orange-600 transition-colors duration-300" />
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {item.question}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}