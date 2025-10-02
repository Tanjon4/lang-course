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
    <footer className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <Container maxWidth="lg" className="relative z-10">
        {/* Main footer content */}
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand section */}
          <Box className="md:col-span-2">
            <Typography 
              variant="h4" 
              className="font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {t("coursLang")}
            </Typography>
            <Typography variant="body1" className="text-gray-400 leading-relaxed max-w-md">
              {t("textFooter")}
            </Typography>
            
            {/* Newsletter subscription */}
            <Box className="mt-6">
              <Typography variant="subtitle2" className="text-white mb-3 font-semibold">
                {t("newsletter", "Restez informé")}
              </Typography>
              <Box className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder={t("yourEmail", "Votre email")}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/25">
                  {t("subscribe", "S'abonner")}
                </button>
              </Box>
            </Box>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography variant="h6" className="text-white mb-6 font-semibold relative inline-block">
              {t("lienRappide")}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            </Typography>
            <ul className="space-y-3">
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
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 hover:underline flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          {/* Contact & Social */}
          <Box>
            <Typography variant="h6" className="text-white mb-6 font-semibold relative inline-block">
              {t("follow")}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            </Typography>
            
            {/* Social media */}
            <Box className="flex space-x-3 mb-6">
              {[
                { icon: Facebook, color: "hover:bg-blue-500", href: "#" },
                { icon: Twitter, color: "hover:bg-sky-500", href: "#" },
                { icon: Instagram, color: "hover:bg-pink-500", href: "#" },
                { icon: Mail, color: "hover:bg-red-500", href: "#" }
              ].map((social, index) => (
                <IconButton 
                  key={index}
                  className="bg-gray-800 text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-gray-700"
                  size="medium"
                  href={social.href}
                >
                  <social.icon className="w-5 h-5" />
                </IconButton>
              ))}
            </Box>

            {/* Contact info */}
            <Box className="space-y-2">
              <Typography variant="body2" className="text-gray-400">
                contact@langcourses.com
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                +33 1 23 45 67 89
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom section */}
        <Box className="border-t border-gray-800 pt-6 pb-8">
          <Box className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Typography variant="body2" className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} LangCourses. {t("allRightsReserved", "Tous droits réservés.")}
            </Typography>
            
            {/* Legal links */}
            <Box className="flex flex-wrap justify-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t("privacy", "Confidentialité")}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t("terms", "Conditions d'utilisation")}
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t("cookies", "Cookies")}
              </Link>
            </Box>

            {/* Scroll to top button */}
            <IconButton 
              onClick={scrollToTop}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25"
              size="medium"
            >
              <ArrowUp className="w-5 h-5" />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Mobile responsive adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-1 {
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}