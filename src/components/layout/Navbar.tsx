"use client";

import { useState, useEffect, useRef, useContext } from "react";
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
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Avatar from "../ui/Avatar";
import { useAuth } from '@/app/contexts/AuthContext'

interface UserData {
  id: string;
  username: string;
  email?: string;
  avatar?: string | null;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export default function Navbar() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = params.lang as string;
  
  // ✅ Récupérer l'état d'authentification depuis le contexte
  const { user: authUser, isAuthenticated, logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

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
  ];

  // ✅ PLUS BESOIN de fetch user - on utilise AuthContext
  console.log("🔄 Navbar - Auth State:", { 
    isAuthenticated, 
    user: authUser,
    username: authUser?.username 
  });

  // ✅ Scroll spy
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

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

  // ✅ Gestion des clics outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      // Redirection vers la page d'accueil
      window.location.href = `/${lang}`;
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
      setIsUserMenuOpen(false);
    }
  };

  // ✅ Éviter le rendu inconsistent pendant l'hydratation
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

  // ✅ Fonction pour obtenir le nom d'affichage
  const getDisplayName = (userData: any) => {
    if (userData.first_name && userData.last_name) {
      return `${userData.first_name} ${userData.last_name}`;
    }
    return userData.username || "Utilisateur";
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-tr from-orange-300 to-amber-200 backdrop-blur-md text-black shadow-lg"
            : "bg-transparent text-gray-800"
        }`}
        suppressHydrationWarning
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
          {/* Logo */}
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
                </li>
              ))}
            </ul>

            {/* Section utilisateur ou bouton de connexion */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {isAuthenticated && authUser ? (
                <div ref={userMenuRef} className="relative user-menu-trigger">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all border border-white/30"
                  >
                    <Avatar
                      src={authUser.avatar}
                      alt={authUser.username}
                      username={authUser.username}
                      size="md"
                    />
                    <span className="font-medium text-sm max-w-32 truncate">
                      {getDisplayName(authUser)}
                    </span>
                  </button>

                  {/* Menu déroulant utilisateur */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
                          <p className="font-semibold text-gray-900 truncate">
                            {getDisplayName(authUser)}
                          </p>
                          {authUser.email && (
                            <p className="text-xs text-gray-600 truncate mt-1">
                              {authUser.email}
                            </p>
                          )}
                          {authUser.role && (
                            <div className="flex items-center gap-2 mt-2">
                              <div className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full capitalize">
                                {authUser.role}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="py-2">
                            <Link
                              href={`/${lang}/auth/profile`}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <UserIcon size={16} />
                              Mon profil
                            </Link>
                            
                            {/* Lien unique avec condition pour déterminer l'URL */}
                            <Link
                              href={
                                authUser.role === 'admin' ? `/${lang}/dashboard/admin` :
                                authUser.role === 'user' ? `/${lang}/dashboard/user` :
                                `/${lang}`
                              }
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <LayoutDashboard size={16} />
                              {authUser.role === 'admin' ? 'Tableau de bord Admin' :
                              authUser.role === 'user' ? 'Tableau de bord' :
                              'Accueil'}
                            </Link>
                          </div>

                        <div className="border-t border-gray-100"></div>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Déconnexion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={`/${lang}/auth/login`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 text-white font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg"
                >
                  <User size={18} />
                  {t("login") || "Connexion"}
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              className="text-zinc-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
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
            className="fixed top-0 left-0 w-4/5 max-w-sm h-full z-40 bg-gradient-to-b from-zinc-100 to-orange-100 shadow-2xl lg:hidden border-r border-orange-200"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-orange-200 transition-colors"
                >
                </button>
              </div>

              {/* Section utilisateur mobile */}
              {isAuthenticated && authUser ? (
                <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-orange-200">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={authUser.avatar}
                      alt={authUser.username}
                      username={authUser.username}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {getDisplayName(authUser)}
                      </p>
                      {authUser.email && (
                        <p className="text-sm text-gray-600 truncate">
                          {authUser.email}
                        </p>
                      )}
                      {authUser.role && (
                        <div className="mt-1">
                          <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full capitalize">
                            {authUser.role}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/${lang}/auth/profile`}
                      className="flex-1 text-center py-2 text-sm bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Profil
                    </Link>
                    <Link
                      href={
                        authUser.role === 'admin' ? `/${lang}/dashboard/admin` :
                        authUser.role === 'user' ? `/${lang}/dashboard/user` :
                        `/${lang}`
                      }
                      className="flex items-center gap-3 px-2 py-1 text-sm text-green-400 bg-orange-200 rounded-lg transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard size={8} />
                      {authUser.role === 'admin' ? 'Admin' :
                      authUser.role === 'user' ? 'Utilisateur' :
                      'Accueil'}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex-1 text-center py-2 text-sm bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              ) : null}

              <nav className="flex-1">
                <ul className="flex flex-col space-y-4">
                  {links.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <Link
                        href={to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          activeSection === to.replace(`/${lang}/`, '')
                            ? "bg-orange-500 text-white shadow-md"
                            : "text-gray-700 hover:bg-orange-200 hover:text-gray-900"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{label}</span>
                      </Link>
                    </li>
                  ))}
                  
                  {!isAuthenticated && (
                    <li>
                      <Link
                        href={`/${lang}/auth/login`}
                        className="flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
                        onClick={() => setIsOpen(false)}
                      >
                        <User size={20} />
                        <span>{t("login") || "Connexion"}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-orange-200">
                <div className="text-center text-sm text-gray-600">
                  <p>© {new Date().getFullYear()} E-Learn Platform</p>
                  <p className="mt-1">🌐 Apprenez sans limites</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay pour mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}