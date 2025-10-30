"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  User,
  MessageCircle,
  PhoneIcon,
} from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Avatar from "../ui/Avatar"; // ✅ Import du composant Avatar

interface UserData {
  id: string;
  username: string;
  avatar?: string | null;
}

export default function Navbar() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = params.lang as string; // Récupérer la langue depuis l'URL
  
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // ✅ S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Liens adaptés avec le préfixe de langue
  const links = [
    { to: `/${lang}`, label: t("home"), icon: Home },
    { to: `/${lang}/courses`, label: t("cours"), icon: BookOpen },
    { to: `/${lang}/teachers`, label: t("prof"), icon: Users },
    { to: `/${lang}/about`, label: t("apropos"), icon: MessageCircle },
    { to: `/${lang}/contact`, label: t("contact"), icon: PhoneIcon },
    { to: `/${lang}/auth`, label: t("login") || "Login", icon: User },
  ];

  // Fetch user avy amin'ny API
  useEffect(() => {
    if (!isMounted) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("https://lang-courses-api.onrender.com/api/users/");
        if (!res.ok) {
          // Mock user pour le développement
          setUser({
            id: "1",
            username: "Utilisateur",
            avatar: null
          });
          return;
        }
        const data = await res.json();
        if (data && typeof data === 'object') {
          setUser({
            id: data.id || '1',
            username: data.username || 'Utilisateur',
            avatar: data.avatar || null,
          });
        }
      } catch (err) {
        console.error("Erreur fetch user:", err);
        // User mock pour le développement
        setUser({
          id: "1",
          username: "John Doe", 
          avatar: null
        });
      }
    };
    fetchUser();
  }, [isMounted]);

  // Scroll spy - adapté pour les ancres
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // Pour les sections avec ancres (si vous en avez)
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Éviter le rendu inconsistent pendant l'hydratation
  if (!isMounted) {
    return (
      <header className="w-full fixed top-0 z-50 bg-transparent text-gray-800">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
          <div className="text-3xl font-extrabold tracking-tight">E-Learning</div>
          <div className="lg:hidden">
            <Menu size={30} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-linear-to-tr from-orange-200 to-amber-300 backdrop-blur-md text-black shadow-lg"
            : "bg-transparent text-gray-800"
        }`}
        suppressHydrationWarning
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
          {/* Logo avec lien vers la page d'accueil de la langue actuelle */}
          <Link
            href={`/${lang}`}
            className="text-3xl font-extrabold tracking-tight hover:scale-105 transition-transform"
          >
            E-Learning
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex space-x-8 font-medium">
              {links.map(({ to, label, icon: Icon }) => (
                <li key={to} className="flex items-center space-x-2">
                  {to === `/${lang}/auth` ? (
                    user ? (
                      <div className="flex items-center gap-2">
                        {/* ✅ Utilisation du composant Avatar */}
                        <Avatar
                          src={user.avatar}
                          alt={user.username}
                          username={user.username}
                          size="md"
                        />
                        <span className="font-medium">{user.username}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAuthOpen(true)}
                        className="flex items-center gap-2 hover:text-amber-600 transition-colors"
                      >
                        <Icon size={18} />
                        {label}
                      </button>
                    )
                  ) : (
                    <Link
                      href={to}
                      className={`flex items-center gap-2 transition-colors duration-300 ${
                        activeSection === to.replace(`/${lang}/`, '')
                          ? "text-amber-600 border-b-2 border-amber-600 pb-1"
                          : "hover:text-orange-500"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <LanguageSwitcher />
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-zinc-800"
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
            className="fixed top-0 left-0 w-3/4 max-w-sm h-full z-40 bg-linear-to-b from-zinc-200 to-orange-200 shadow-xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">📚 Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1">
                <ul className="flex flex-col space-y-6 text-lg font-medium text-gray-800">
                  {links.map(({ to, label, icon: Icon }) => (
                    <li key={to} className="flex items-center space-x-2">
                      {to === `/${lang}/auth` ? (
                        user ? (
                          <div className="flex items-center gap-2">
                            {/* ✅ Utilisation du même composant Avatar pour mobile */}
                            <Avatar
                              src={user.avatar}
                              alt={user.username}
                              username={user.username}
                              size="md"
                            />
                            <span className="font-medium">{user.username}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setIsAuthOpen(true);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                          >
                            <Icon size={18} />
                            {label}
                          </button>
                        )
                      ) : (
                        <Link
                          href={to}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-2 transition-colors duration-300 ${
                            activeSection === to.replace(`/${lang}/`, '')
                              ? "text-amber-600 border-b-2 border-amber-600 pb-1"
                              : "hover:text-orange-500"
                          }`}
                        >
                          <Icon size={18} />
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8">
                <LanguageSwitcher />
              </div>

              <div className="mt-auto text-center text-sm text-gray-600 pt-8">
                © {new Date().getFullYear()} E-Learn Platform 🌐
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}