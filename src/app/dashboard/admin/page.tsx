"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/app/dashboard/admin/composants/Sidebar";
import StatsOverview from "@/app/dashboard/admin/composants/StatsOverview";
import UsersManagement from "@/app/dashboard/admin/composants/UsersManagement";
import CoursesManagement from "@/app/dashboard/admin/composants/CoursesManagement";
import PlaceholderSection from "@/app/dashboard/admin/composants/PlaceholderSection";
import ThemeProvider from "@/app/dashboard/admin/composants/ThemeProvider";
import { Menu } from "lucide-react";


const TABS = [
  "Tableau de bord",
  "Gestion des utilisateurs",
  "Gestion des cours",
  "Inscriptions & Progression",
  "Paramètres",
];

export default function DashboardAdmin() {
  const [tab, setTab] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    utilisateursActifs: 0,
    coursPublies: 0,
    inscriptionsRecentes: 0,
    revenuTotal: 0,
    tauxCompletion: "0%",
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const API_BASE = "https://lang-courses-api.onrender.com/api";
        const [resUsers, resCourses, resInscriptions, resPaiements, resProgression] =
          await Promise.all([
            fetch(`${API_BASE}/users/`),
            fetch(`${API_BASE}/courses/`),
            fetch(`${API_BASE}/inscriptions/`),
            fetch(`${API_BASE}/paiements/`),
            fetch(`${API_BASE}/progression/`),
          ]);

        const users = await resUsers.json();
        const courses = await resCourses.json();
        const inscriptions = await resInscriptions.json();
        const paiements = await resPaiements.json();
        const progression = await resProgression.json();

        setStats({
          utilisateursActifs: users.length,
          coursPublies: courses.filter((c: any) => c.is_published).length,
          inscriptionsRecentes: inscriptions.length,
          revenuTotal: paiements.reduce((acc: number, p: any) => acc + p.montant, 0),
          tauxCompletion:
            progression.length > 0
              ? Math.round(
                  progression.reduce((acc: number, p: any) => acc + p.completion, 0) /
                    progression.length
                ) + "%"
              : "0%",
        });
      } catch (error) {
        console.error("Erreur fetch API:", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
            tabs={["Dashboard", "Utilisateurs", "Cours", "Inscriptions", "Paramètres"]}
            selected={tab}
            onSelect={setTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onOpen={() => setSidebarOpen(true)}
          />

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl"
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                exit={{ x: -250 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <Sidebar tabs={TABS} selected={tab} onSelect={setTab} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="hidden md:flex">
          <Sidebar tabs={TABS} selected={tab} onSelect={setTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:ml-64 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                <Menu size={22} />
              </button>
              <h1 className="text-2xl font-semibold tracking-tight">
                {TABS[tab]}
              </h1>
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="hidden md:block px-4 py-2 w-72 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
            />
          </div>

          {/* Animated content switch */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-100 dark:border-gray-700"
          >
            {tab === 0 && (
              <>
                <StatsOverview stats={stats} />
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <PlaceholderSection title="Inscriptions & Progression" />
                  </div>
                  <div>
                    <PlaceholderSection title="Activités récentes" />
                  </div>
                </div>
              </>
            )}

            {tab === 1 && <UsersManagement />}
            {tab === 2 && <CoursesManagement />}
            {tab >= 3 && <PlaceholderSection title={TABS[tab]} />}
          </motion.div>
        </main>
      </div>
    </ThemeProvider>
  );
}
