"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function DashboardHeader() {
  const { user, isAuthenticated, loading } = useAuth();
  const [localUser, setLocalUser] = useState(() => {
    // ✅ Initialisation avec le user du contexte ou localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return user || (storedUser ? JSON.parse(storedUser) : null);
    }
    return user || null;
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Vérifier si on est côté client
        if (typeof window === "undefined") return;

        const accessToken = localStorage.getItem("access") || localStorage.getItem("accessToken");
        if (!accessToken) {
          console.warn("⚠️ Aucun token d'accès trouvé. Redirection vers login.");
          router.push("/auth/login");
          return;
        }

        const res = await fetch("https://lang-courses-api.onrender.com/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            console.warn("⚠️ Token invalide ou expiré. Redirection vers login.");
            localStorage.removeItem("access");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            router.push("/auth/login");
            return;
          }

          let errorData = null;
          try { errorData = await res.json(); } catch (err) {}
          console.error("❌ Erreur récupération profil utilisateur", res.status, errorData);
          return;
        }

        const data = await res.json();
        const fullName =
          data.first_name || data.last_name
            ? `${data.first_name || ""} ${data.last_name || ""}`.trim()
            : data.username || "Utilisateur";

        const userData = {
          name: fullName,
          email: data.email || "email@example.com",
          role: data.role || "user",
        };

        // ✅ Correction : Utiliser setLocalUser au lieu de setUser qui n'existe pas
        setLocalUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("❌ Erreur inattendue fetchUser :", err);
      }
    };

    if (!localUser) fetchUser();
  }, [localUser, router]); // ✅ Retirer setUser des dépendances

  // ✅ Gérer le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-[var(--muted)]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/10"
    >
      {/* Titre */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">Bienvenue 👋</p>
      </div>

      {/* Barre de recherche + profil utilisateur */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            className="px-3 py-2 rounded-full border border-gray-200 dark:border-white/10 w-64 bg-transparent placeholder:text-gray-400 focus:outline-none"
            placeholder="Rechercher..."
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <FiSearch />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer transition">
            <FiBell className="text-gray-600 dark:text-white" />
          </div>

          {/* Profil utilisateur */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ffd166] to-[#f6f] flex items-center justify-center text-sm font-bold text-black">
              {localUser?.name ? localUser.name[0].toUpperCase() : "?"}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-800 dark:text-white">
                {localUser?.name || "Utilisateur"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {localUser?.email || "email@example.com"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}