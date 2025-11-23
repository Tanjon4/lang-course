// app/[lang]/dashboard/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./composants/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [active, setActive] = useState("Dashboard");

  // Appliquer le thème à l'html
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // system
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar
        active={active}
        setActive={setActive}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
