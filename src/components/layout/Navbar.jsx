"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, Users, User, MessageCircle, Globe, PhoneIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import LanguageSwitcher from "../LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const { t, i18n } = useTranslation();

  // Menu (mampiasa i18next translation keys)
  const links = [
    { to: "home", label: t("home"), icon: Home },
    { to: "courses", label: t("cours"), icon: BookOpen },
    { to: "teachers", label: t("prof"), icon: Users },
    { to: "about", label: t("apropos"), icon: MessageCircle },
    { to: "contact", label: t("contact"), icon: PhoneIcon },
    { to: "auth", label: "", icon: User },
    // { to: "contact", label: t("menu.contact"), icon: Globe },
  ];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const sections = links.map((link) =>
        document.getElementById(link.to)
      );

      for (let sec of sections) {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sec.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  // Fonction pour changer de langue
  // const changeLang = (lang: string) => {
  //   i18n.changeLanguage(lang);
  //   setShowLang(false);
  // };

  return (
    <>
      {/* Main navbar */}
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-transparent text-black font-bold"
            : "backdrop-blur-lg bg-None text-gray-300 font-bold shadow-lg"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-extrabold   racking-tight hover:scale-105 transition-transform"
          >
            E-Learn 🌍
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex space-x-8 font-medium ">
              {links.map(({ to, label, icon: Icon }) => (
                <li key={to} className="flex items-center space-x-2">
                  <a
                    href={`#${to}`}
                    className={`flex items-center gap-2 transition-colors duration-300 ${
                      activeSection === to
                        ? "text-blue-300 border-b-2 border-blue-400 pb-1"
                        : "hover:text-indigo-300"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Lang Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 w-3/4 max-w-sm h-full z-40 bg-gradient-to-b from-blue-900 to-purple-900 shadow-xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">📚 Menu</h2>
                {/* <button
                  type="button"
                  className="text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={28} />
                </button> */}
              </div>

              <nav className="mt-12 flex-1">
                <ul className="flex flex-col space-y-6 text-lg font-medium text-white">
                  {links.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <a
                        href={`#${to}`}
                        className={`flex items-center gap-3 transition-colors duration-300 ${
                          activeSection === to
                            ? "text-indigo-300 font-semibold"
                            : "hover:text-blue-300"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={20} />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Lang Switcher Mobile */}
              <LanguageSwitcher />

              <div className="mt-auto text-center text-sm text-white/70">
                © {new Date().getFullYear()} E-Learn Platform 🌐
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
