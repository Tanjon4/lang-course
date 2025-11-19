"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiBell, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function DashboardHeader() {
  const { user, isAuthenticated, loading } = useAuth();
  const [localUser, setLocalUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return user || (storedUser ? JSON.parse(storedUser) : null);
    }
    return user || null;
  });

  const [language, setLanguage] = useState("fr");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof window === "undefined") return;
        const accessToken =
          localStorage.getItem("access") || localStorage.getItem("accessToken");
        if (!accessToken) {
          router.push("/auth/login");
          return;
        }

        const res = await fetch("https://lang-courses-api.onrender.com/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("access");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            router.push("/auth/login");
            return;
          }
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

        setLocalUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Erreur fetchUser :", err);
      }
    };

    if (!localUser) fetchUser();
  }, [localUser, router]);

  const languages = [
    { code: "mg", label: "🇲🇬 Malagasy" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "en", label: "🇬🇧 English" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-400">Dashboard</h1>
        <p className="text-sm text-gray-400">Chargement...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/60 backdrop-blur-md shadow-lg sticky top-0 z-40 rounded-b-3xl"
    >
      {/* TITRE */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#3BA1C5] tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          {language === "mg"
            ? "Tongasoa 👋"
            : language === "fr"
            ? "Bienvenue 👋"
            : "Welcome 👋"}
        </p>
      </div>

      {/* DROITE */}
      <div className="flex items-center gap-4 flex-wrap justify-end">
        {/* Barre de recherche */}
        <div className="relative hidden sm:block group">
          <input
            className="px-4 py-2 rounded-full border border-gray-300 w-64 bg-white/50 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            placeholder={
              language === "mg"
                ? "Karohy..."
                : language === "fr"
                ? "Rechercher..."
                : "Search..."
            }
          />
          <div className="absolute right-3 top-2.5 text-gray-400 group-hover:text-[#3BA1C5] transition">
            <FiSearch size={18} />
          </div>
        </div>

        {/* Sélecteur de langue */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition shadow-sm">
            <FiGlobe className="text-[#3BA1C5]" />
            {languages.find((lang) => lang.code === language)?.label || "Français"}
          </button>
          <div className="absolute hidden group-hover:block right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#e6f7fb] ${
                  language === lang.code ? "text-[#3BA1C5] font-semibold" : "text-gray-700"
                }`}
              >
                {lang.label}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="p-2 rounded-full bg-gradient-to-tr from-[#3BA1C5] to-[#7ccfe4] text-white shadow-md cursor-pointer transition"
        >
          <FiBell size={20} />
        </motion.div>

        {/* Profil utilisateur */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3BA1C5] to-[#7ccfe4] flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform">
            {localUser?.name ? localUser.name[0].toUpperCase() : "?"}
          </div>
          <div className="text-sm">
            <div className="font-semibold text-gray-700">{localUser?.name || "Utilisateur"}</div>
            <div className="text-xs text-gray-400">{localUser?.email || "email@example.com"}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
