"use client";

import React from "react";
import { Container, Typography, IconButton, Box, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, Mail, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-700 to-gray-650 border-t border-gray-800/40">
      {/* Background decorative elements - plus subtils */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-900/50 to-gray-900/80"></div>

      <Container maxWidth="xl" className="relative z-10">
        {/* Main footer content */}
        <Box className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 px-4">
          {/* Brand section */}
          <Box className="lg:col-span-5">
            <Typography 
              variant="h4" 
              className="font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent tracking-tight"
            >
              {t("coursLang")}
            </Typography>
            <Typography variant="body1" className="text-zinc-200 leading-relaxed max-w-lg text-lg font-light">
              {t("textFooter")}
            </Typography>
            
            {/* Newsletter subscription */}
            <Box className="mt-8">
              <Typography variant="subtitle1" className="text-white mb-3 font-medium">
                {t("newsletter", "Restez informé")}
              </Typography>
              <Box className="flex gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder={t("emailPlaceholder", "Votre email")}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/30 text-white placeholder-gray-400 transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25">
                  {t("subscribe", "S'abonner")}
                </button>
              </Box>
            </Box>
          </Box>

          {/* Quick links */}
          <Box className="lg:col-span-3 lg:col-start-7">
            <Typography variant="h6" className="mb-8 font-semibold relative inline-block text-white">
              {t("lienRappide")}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transform origin-left scale-x-75"></span>
            </Typography>
            <ul className="space-y-4">
              {[
                { href: "/", label: t("home") },
                { href: "/courses", label: t("cours") },
                { href: "/about", label: t("apropos") },
                { href: "/contact", label: t("contact") },
                { href: "/blog", label: t("blog", "Blog") }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300/80 hover:text-amber-300 transition-all duration-300 hover:translate-x-2 flex items-center group font-light"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          {/* Contact & Social */}
          <Box className="lg:col-span-4 lg:col-start-10">
            <Typography variant="h6" className="mb-8 font-semibold relative inline-block text-white">
              {t("follow")}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transform origin-left scale-x-75"></span>
            </Typography>
            
            {/* Social media */}
            <Box className="flex space-x-3 mb-8">
              {[
                { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                { icon: Instagram, color: "hover:bg-gradient-to-r from-purple-500 to-pink-500", label: "Instagram" },
                { icon: Mail, color: "hover:bg-red-500", label: "Email" }
              ].map((social, index) => (
                <IconButton 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-gray-700/50 hover:border-transparent"
                  size="medium"
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    '&:hover': {
                      background: social.color.includes('gradient') 
                        ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' 
                        : social.color.replace('hover:', '')
                    }
                  }}
                >
                  <social.icon className="w-5 h-5" />
                </IconButton>
              ))}
            </Box>

            {/* Contact info */}
            <Box className="space-y-4">
              <Box className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <Typography variant="body2" className="text-white group-hover:text-amber-300 transition-colors duration-300 font-light">
                  contact@langcourses.com
                </Typography>
              </Box>
              <Box className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <Typography variant="body2" className="text-white group-hover:text-amber-300 transition-colors duration-300 font-light">
                  +33 1 23 45 67 89
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom section */}
        <Box className="border-t border-gray-800/30 pt-8 pb-8 px-4">
          <Box className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <Typography variant="body2" className="text-gray-400/70 text-center lg:text-left font-light">
              © {new Date().getFullYear()} LangCourses. {t("allRightsReserved", "Tous droits réservés.")}
            </Typography>
            
            {/* Legal links */}
            <Box className="flex flex-wrap justify-center space-x-8 text-sm">
              {[
                { href: "/privacy", label: t("privacy", "Confidentialité") },
                { href: "/terms", label: t("terms", "Conditions d'utilisation") },
                { href: "/cookies", label: t("cookies", "Cookies") }
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-gray-400/70 hover:text-amber-300 transition-all duration-300 hover:underline font-light"
                >
                  {link.label}
                </Link>
              ))}
            </Box>

            {/* Scroll to top button */}
            <IconButton 
              onClick={scrollToTop}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 hover:from-amber-300 hover:to-orange-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/40 backdrop-blur-sm"
              size="medium"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}