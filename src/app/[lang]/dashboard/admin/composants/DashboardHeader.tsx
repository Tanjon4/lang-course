"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    // 🔹 Récupération de l'utilisateur depuis localStorage (après login Django)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        // Utilise name si disponible, sinon construit depuis first_name + last_name
        name: parsed.name || `${parsed.first_name || ""} ${parsed.last_name || ""}`.trim() || parsed.username || "Utilisateur",
        email: parsed.email || "email@example.com",
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">Bienvenue 👋</p>
      </div>

      <div className="flex items-center gap-4">
        {/* 🔍 Barre de recherche */}
        <div className="relative">
          <input
            className="px-3 py-2 rounded-full border border-gray-100 dark:border-white/6 w-64 bg-transparent"
            placeholder="Search task"
          />
          <div className="absolute right-3 top-2.5 text-[var(--muted)]">
            <FiSearch />
          </div>
        </div>

        {/* 🔔 Notifications + profil */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5">
            <FiBell />
          </div>

          <div className="flex items-center gap-2">
            {/* 🔸 Avatar avec initiales */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fea] to-[#f6f] flex items-center justify-center text-sm text-black">
              {user?.name ? user.name[0]?.toUpperCase() : "?"}
            </div>

            {/* 🔸 Nom et e-mail */}
            <div className="text-sm">
              <div className="font-medium">
                {user?.name || "Utilisateur"}
              </div>
              <div className="text-xs text-[var(--muted)]">
                {user?.email || "email@example.com"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
