"use client";

import React, { useEffect, useState } from "react";
import { SunMedium, Moon, Monitor } from "lucide-react";

interface ThemeSwitcherProps {
  theme: "light" | "dark" | "system";
  setTheme: (value: "light" | "dark" | "system") => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  // Applique le thème sur le chargement
  useEffect(() => {
    if (theme === "light") document.documentElement.classList.remove("dark");
    else if (theme === "dark") document.documentElement.classList.add("dark");
    else {
      const darkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      if (darkMode) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Sync avec le thème système si sélectionné
  useEffect(() => {
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => setTheme("system");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, [theme, setTheme]);

  return (
    <div className="flex justify-between items-center gap-2">
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
  );
};

export default ThemeSwitcher;
