"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
  ChevronDown,
  Sparkles,
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
  const pathname = usePathname();
  const lang = params.lang as string;
  
  const { user: authUser, isAuthenticated, logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLHeadElement>(null);

  // ✅ S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Liens adaptés avec le préfixe de langue
  const links = [
    { to: `/${lang}`, label: t("home"), icon: Home, id: "home" },
    { to: `/${lang}/courses`, label: t("cours"), icon: BookOpen, id: "courses" },
    { to: `/${lang}/about`, label: t("apropos"), icon: MessageCircle, id: "about" },
    { to: `/${lang}/contact`, label: t("contact"), icon: PhoneIcon, id: "contact" },
  ];

  // ✅ Scroll spy amélioré - CORRIGÉ
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      
      sections.forEach((section) => {
        // ✅ Correction: Utiliser getBoundingClientRect() au lieu de offsetTop
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Déclencher une fois au montage pour définir la section active initiale
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // ✅ Alternative encore plus robuste pour le scroll spy
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = scrollY + 100; // Offset pour la navbar fixe

      let current = "";
      sections.forEach((section) => {
        const element = section as HTMLElement;
        if (element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
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
      window.location.href = `/${lang}`;
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
      setIsUserMenuOpen(false);
    }
  };

  // ✅ Animation de soulignement élégant
  const UnderlineAnimation = ({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) => (
    <motion.span
      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
      initial={false}
      animate={{ 
        scaleX: isActive ? 1 : isHovered ? 0.8 : 0,
        opacity: isActive ? 1 : isHovered ? 0.7 : 0
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );

  // ✅ Éviter le rendu inconsistent pendant l'hydratation
  if (!isMounted) {
    return (
      <header className="w-full fixed top-0 z-50 bg-transparent text-gray-800">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
          <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            E-Learning
          </div>
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
        ref={navbarRef}
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-2xl shadow-orange-100/50 border-b border-orange-100"
            : "bg-transparent text-gray-800"
        }`}
        suppressHydrationWarning
      >
        {/* Effet de brillance au scroll */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-amber-50/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10 relative z-10">
          {/* Logo avec animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href={`/${lang}`}
              className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <Sparkles size={28} className="text-amber-500" />
              </motion.div>
              E-Learning
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex space-x-1 font-medium relative">
              {links.map(({ to, label, icon: Icon, id }) => {
                const isActive = activeSection === id || pathname === to;
                const isHovered = hoveredLink === id;
                
                return (
                  <li key={to} className="relative">
                    <motion.div
                      whileHover="hover"
                      onHoverStart={() => setHoveredLink(id)}
                      onHoverEnd={() => setHoveredLink(null)}
                      className="relative"
                    >
                      <Link
                        href={to}
                        className={`relative flex items-center gap-3 px-4 py-2 transition-all duration-300 z-10 ${
                          isActive
                            ? "text-orange-600 font-semibold"
                            : "text-gray-700 hover:text-orange-500"
                        }`}
                      >
                        <motion.div
                          animate={{ scale: isActive ? 1.1 : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon size={18} />
                        </motion.div>
                        <span className="relative">
                          {label}
                          <UnderlineAnimation isActive={isActive} isHovered={isHovered} />
                        </span>
                        
                        {/* Effet de halo au hover */}
                        {isHovered && (
                          <motion.span
                            className="absolute inset-0 bg-orange-100/50 rounded-lg blur-sm -z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            {/* Section utilisateur ou bouton de connexion */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {isAuthenticated && authUser ? (
                <div ref={userMenuRef} className="relative user-menu-trigger">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all border border-white/40 shadow-sm hover:shadow-md"
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
                    <motion.div
                      animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>

                  {/* Menu déroulant utilisateur avec animation améliorée */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ 
                          duration: 0.2,
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                        className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100/50 overflow-hidden z-50"
                      >
                        {/* Header du menu */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="px-4 py-4 border-b border-orange-100 bg-gradient-to-r from-orange-50/80 to-amber-50/80"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={authUser.avatar}
                              alt={authUser.username}
                              username={authUser.username}
                              size="lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate text-sm">
                                {getDisplayName(authUser)}
                              </p>
                              {authUser.email && (
                                <p className="text-xs text-gray-600 truncate mt-1">
                                  {authUser.email}
                                </p>
                              )}
                            </div>
                          </div>
                          {authUser.role && (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              className="flex justify-center mt-3"
                            >
                              <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs rounded-full capitalize shadow-lg">
                                {authUser.role}
                              </span>
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Liens du menu */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="py-2"
                        >
                          <Link
                            href={`/${lang}/auth/profile`}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50/50 transition-all group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                              <UserIcon size={16} className="text-orange-500" />
                            </motion.div>
                            <span className="group-hover:translate-x-1 transition-transform">
                              Mon profil
                            </span>
                          </Link>
                          
                          <Link
                            href={
                              authUser.role === 'admin' ? `/${lang}/dashboard/admin` :
                              authUser.role === 'user' ? `/${lang}/dashboard/user` :
                              `/${lang}`
                            }
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50/50 transition-all group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                              <LayoutDashboard size={16} className="text-amber-500" />
                            </motion.div>
                            <span className="group-hover:translate-x-1 transition-transform">
                              {authUser.role === 'admin' ? 'Tableau de bord Admin' :
                              authUser.role === 'user' ? 'Tableau de bord' :
                              'Accueil'}
                            </span>
                          </Link>
                        </motion.div>

                        {/* Séparateur */}
                        <div className="border-t border-orange-100/50"></div>

                        {/* Déconnexion */}
                        <motion.button
                          onClick={handleLogout}
                          whileHover={{ backgroundColor: "rgba(254, 226, 226, 0.5)" }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-all group"
                        >
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <LogOut size={16} />
                          </motion.div>
                          <span className="group-hover:translate-x-1 transition-transform">
                            Déconnexion
                          </span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={`/${lang}/auth/login`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    {/* Effet de brillance au hover */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      initial={false}
                    />
                    <User size={18} />
                    <span>{t("login") || "Connexion"}</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <motion.button
              type="button"
              className="text-zinc-800 p-2 rounded-lg hover:bg-orange-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile menu avec animations améliorées */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="fixed top-0 left-0 w-4/5 max-w-sm h-full z-40 bg-gradient-to-b from-white to-orange-50/80 backdrop-blur-xl shadow-2xl lg:hidden border-r border-orange-200/50"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header mobile */}
                <div className="flex justify-between items-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                
                  </motion.div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-orange-200 transition-colors"
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                  </motion.button>
                </div>

                {/* Section utilisateur mobile */}
                {isAuthenticated && authUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/50"
                  >
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
                            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs rounded-full capitalize shadow">
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
                        className="flex items-center justify-center gap-1 flex-1 py-2 text-sm bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <LayoutDashboard size={14} />
                        {authUser.role === 'admin' ? 'Admin' :
                        authUser.role === 'user' ? 'Dashboard' :
                        'Accueil'}
                      </Link>
                      
                    </div>
                    {/* Déconnexion */}
                      <motion.button
                        onClick={handleLogout}
                        whileHover={{ backgroundColor: "rgba(254, 226, 226, 0.5)" }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-all group"
                      >
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                          <LogOut size={16} />
                        </motion.div>
                        <span className="group-hover:translate-x-1 transition-transform">
                          Déconnexion
                        </span>
                      </motion.button>
                    
                  </motion.div>
                )}

                {/* Navigation mobile */}
                <nav className="flex-1">
                  <ul className="flex flex-col space-y-2">
                    {links.map(({ to, label, icon: Icon, id }, index) => {
                      const isActive = activeSection === id || pathname === to;
                      
                      return (
                        <motion.li
                          key={to}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <Link
                            href={to}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                              isActive
                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                                : "text-gray-700 hover:bg-orange-100 hover:text-gray-900"
                            }`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Icon size={22} />
                            </motion.div>
                            <span className="font-medium text-lg">{label}</span>
                            
                            {/* Effet de particules pour les liens actifs */}
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                    
                    {!isAuthenticated && (
                      <motion.li
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Link
                          href={`/${lang}/auth/login`}
                          className="flex items-center gap-4 w-full p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg mt-4"
                          onClick={() => setIsOpen(false)}
                        >
                          <User size={22} />
                          <span className="text-lg">{t("login") || "Connexion"}</span>
                        </Link>
                      </motion.li>
                    )}
                  </ul>
                </nav>

                {/* Footer mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 pt-6 border-t border-orange-200/50"
                >
                  <div className="text-center text-sm text-gray-600">
                    <p className="mt-1 flex items-center justify-center gap-1">
                      <Sparkles size={14} className="text-amber-500" />
                      Apprenez sans limites
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Overlay pour mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}