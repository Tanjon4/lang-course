"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenText,
  Users,
  BarChart3,
  CalendarDays,
  Layers,
  HelpCircle,
  LogOut,
  SunMedium,
  Moon,
  Monitor,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: (label: string) => void;
  theme: "light" | "dark" | "system";
  setTheme: (value: "light" | "dark" | "system") => void;
}

const items = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Gestion cours", icon: <BookOpenText size={20} /> },
  { label: "Gestion utilisateurs", icon: <Users size={20} /> },
  { label: "Gestion des niveaux", icon: <BarChart3 size={20} /> },
  { label: "Gestion chapitres", icon: <CalendarDays size={20} /> },
  { label: "Gestion leçons", icon: <Layers size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gradient-to-br from-[#3BA1C5] to-[#7ccfe4] text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col justify-between w-64 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 shadow-2xl p-6 rounded-tr-3xl rounded-br-3xl"
      >
        <SidebarContent
          active={active}
          setActive={setActive}
          theme={theme}
          setTheme={setTheme}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          handleLogout={handleLogout}
        />
      </motion.aside>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            className="fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-gray-800 shadow-2xl p-6 rounded-r-3xl"
          >
            <SidebarContent
              active={active}
              setActive={(label) => {
                setActive(label);
                setIsOpen(false);
              }}
              theme={theme}
              setTheme={setTheme}
              showConfirm={showConfirm}
              setShowConfirm={setShowConfirm}
              handleLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface SidebarContentProps {
  active: string;
  setActive: (label: string) => void;
  theme: "light" | "dark" | "system";
  setTheme: (value: "light" | "dark" | "system") => void;
  showConfirm: boolean;
  setShowConfirm: (val: boolean) => void;
  handleLogout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  active,
  setActive,
  theme,
  setTheme,
  showConfirm,
  setShowConfirm,
  handleLogout,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3BA1C5] to-[#7ccfe4] flex items-center justify-center text-white shadow-lg">
          <GraduationCap size={26} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#3BA1C5] tracking-wide">
            E-learning
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">Admin Panel</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {items.map((it) => (
          <motion.div
            key={it.label}
            onClick={() => setActive(it.label)}
            whileHover={{ scale: 1.03 }}
            className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              active === it.label
                ? "text-white bg-gradient-to-r from-[#3BA1C5] to-[#7ccfe4] font-semibold shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:text-[#3BA1C5] hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {active === it.label && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 h-full w-[4px] bg-[#3BA1C5] rounded-r-md"
              />
            )}
            <div className="text-lg z-10">{it.icon}</div>
            <div className="text-sm sm:text-base lg:text-base z-10">{it.label}</div>
          </motion.div>
        ))}
      </nav>

      {/* BAS DE LA SIDEBAR */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-5">
        <div className="text-xs text-gray-400 dark:text-gray-300 mb-3">GENERAL</div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-300 transition">
          <HelpCircle size={18} />
          <div className="text-sm">Aide</div>
        </div>

        <div
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-300 transition"
        >
          <LogOut size={18} />
          <div className="text-sm">Déconnexion</div>
        </div>

        {/* POPUP CONFIRMATION */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-80 text-center">
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Êtes-vous sûr ?
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Non
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Oui
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theme Switcher */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-5 mt-4">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-lg transition ${
              theme === "light"
                ? "bg-[#3BA1C5] text-white shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <SunMedium size={18} />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-[#3BA1C5] text-white shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <Moon size={18} />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`p-2 rounded-lg transition ${
              theme === "system"
                ? "bg-[#3BA1C5] text-white shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <Monitor size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
