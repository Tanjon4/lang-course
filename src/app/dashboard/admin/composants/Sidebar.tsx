"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  Sun,
  Moon,
  Monitor,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { useThemeMode } from "./ThemeProvider";

interface SidebarProps {
  tabs: string[];
  selected: number;
  onSelect: (index: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sm font-medium transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    <Icon size={18} />
    {label}
  </motion.button>
);

export default function Sidebar({
  tabs,
  selected,
  onSelect,
  isOpen = false,
  onClose,
  onOpen,
}: SidebarProps) {
  const router = useRouter();
  const { mode, setMode } = useThemeMode();

  const handleLogout = () => {
    router.push("/");
  };

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
    exit: {
      x: -280,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between h-screen w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 fixed left-0 top-0 z-30">
        <div>
          <div className="flex items-center gap-2 mb-8 px-6 pt-6">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              E-LEARNING
            </h1>
          </div>

          <div className="space-y-2 px-3">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={selected === 0}
              onClick={() => onSelect(0)}
            />
            <SidebarItem
              icon={Users}
              label="Utilisateurs"
              active={selected === 1}
              onClick={() => onSelect(1)}
            />
            <SidebarItem
              icon={BookOpen}
              label="Cours"
              active={selected === 2}
              onClick={() => onSelect(2)}
            />
            <SidebarItem
              icon={BarChart2}
              label="Inscriptions"
              active={selected === 3}
              onClick={() => onSelect(3)}
            />
            <SidebarItem
              icon={Settings}
              label="Paramètres"
              active={selected === 4}
              onClick={() => onSelect(4)}
            />
          </div>
        </div>

        <div className="space-y-3 px-4 pb-5">
          <div className="flex justify-around bg-gray-100 dark:bg-gray-800 rounded-lg py-2 shadow-inner">
            <Sun
              size={18}
              onClick={() => setMode("light")}
              className={`cursor-pointer transition ${
                mode === "light" ? "text-yellow-500" : "text-gray-400"
              }`}
            />
            <Monitor
              size={18}
              onClick={() => setMode("system")}
              className={`cursor-pointer transition ${
                mode === "system" ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <Moon
              size={18}
              onClick={() => setMode("dark")}
              className={`cursor-pointer transition ${
                mode === "dark" ? "text-blue-500" : "text-gray-400"
              }`}
            />
          </div>
          <SidebarItem icon={LogOut} label="Logout" active={false} onClick={handleLogout} />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                      <GraduationCap size={18} />
                    </div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      E-LEARNING
                    </h1>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2 px-3 mt-3">
                  {tabs.map((tab, index) => (
                    <SidebarItem
                      key={index}
                      icon={[LayoutDashboard, Users, BookOpen, BarChart2, Settings][index]}
                      label={tab}
                      active={selected === index}
                      onClick={() => {
                        onSelect(index);
                        onClose && onClose();
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 px-4 pb-5">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-800 rounded-lg py-2 shadow-inner">
                  <Sun
                    size={18}
                    onClick={() => setMode("light")}
                    className={`cursor-pointer transition ${
                      mode === "light" ? "text-yellow-500" : "text-gray-400"
                    }`}
                  />
                  <Monitor
                    size={18}
                    onClick={() => setMode("system")}
                    className={`cursor-pointer transition ${
                      mode === "system" ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  <Moon
                    size={18}
                    onClick={() => setMode("dark")}
                    className={`cursor-pointer transition ${
                      mode === "dark" ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <SidebarItem icon={LogOut} label="Logout" active={false} onClick={handleLogout} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Floating Action Button (mobile only) */}
      <motion.button
        onClick={onOpen}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 md:hidden z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition"
      >
        <Menu size={22} />
      </motion.button>
    </>
  );
}
