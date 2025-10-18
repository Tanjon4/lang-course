"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ import du router
import { useThemeMode } from "./ThemeProvider";
import {
  Dashboard,
  People,
  School,
  Event,
  Settings,
  Logout,
  MenuBook,
  Payment,
  WbSunny,
  NightsStay,
  Computer,
} from "@mui/icons-material";

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sm font-medium transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
    }`}
  >
    <Icon fontSize="small" />
    {label}
  </button>
);

export default function Sidebar({
  tabs,
  selected,
  onSelect,
}: {
  tabs: string[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  const { mode, setMode } = useThemeMode();
  const router = useRouter(); // ✅ initialisation du router

  const handleLogout = () => {
    // (optionnel) supprime les infos de session
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    router.push("/"); // ✅ redirection vers la page d'accueil
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 shadow-lg p-4 border-r border-gray-100 dark:border-gray-700">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-3">
          <School className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            E-LEARNING
          </h1>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <SidebarItem
            icon={Dashboard}
            label="Dashboard"
            active={selected === 0}
            onClick={() => onSelect(0)}
          />
          <SidebarItem
            icon={People}
            label="Gestion utilisateurs"
            active={selected === 1}
            onClick={() => onSelect(1)}
          />
          <SidebarItem
            icon={MenuBook}
            label="Cours"
            active={selected === 2}
            onClick={() => onSelect(2)}
          />
          <SidebarItem
            icon={Event}
            label="Inscription et progression"
            active={selected === 3}
            onClick={() => onSelect(3)}
          />
          <SidebarItem
            icon={Payment}
            label="Parametre"
            active={selected === 4}
            onClick={() => onSelect(4)}
          />
        </div>
      </div>

      {/* Theme toggle + logout */}
      <div className="space-y-3">
        <div className="flex justify-around bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
          <WbSunny
            onClick={() => setMode("light")}
            className={`cursor-pointer ${
              mode === "light" ? "text-yellow-500" : "text-gray-400"
            }`}
          />
          <Computer
            onClick={() => setMode("system")}
            className={`cursor-pointer ${
              mode === "system" ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <NightsStay
            onClick={() => setMode("dark")}
            className={`cursor-pointer ${
              mode === "dark" ? "text-blue-500" : "text-gray-400"
            }`}
          />
        </div>

        <SidebarItem
          icon={Settings}
          label="Settings"
          active={false}
          onClick={() => {}}
        />

        {/* ✅ Logout redirige vers la page d'accueil */}
        <SidebarItem
          icon={Logout}
          label="Logout"
          active={false}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
