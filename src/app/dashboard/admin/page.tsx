"use client";

import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "@/app/dashboard/admin/composants/Sidebar";
import StatsOverview from "@/app/dashboard/admin/composants/StatsOverview";
import UsersManagement from "@/app/dashboard/admin/composants/UsersManagement"; // assuming you already have this
import CoursesManagement from "@/app/dashboard/admin/composants/CoursesManagement"; // assuming you already have this
import PlaceholderSection from "@/app/dashboard/admin/composants/PlaceholderSection";
import ThemeProvider from "@/app/dashboard/admin/composants/ThemeProvider";

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
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Sidebar (collapsible on mobile) */}
        <div className="hidden md:flex">
          <Sidebar tabs={TABS} selected={tab} onSelect={setTab} />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar tabs={TABS} selected={tab} onSelect={setTab} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 md:ml-64">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <IconButton
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="hidden md:block px-4 py-2 w-72 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <Box className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {tab === 0 && (
              <>
                <StatsOverview stats={stats} />

                {/* <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
        
                  </div>

                  <div className="flex flex-col gap-6">
                    
                  </div>
                </div> */}

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <PlaceholderSection title="Inscriptions & Progression" />
                  </div>
                  <div>
                    
                  </div>
                </div>
              </>
            )}

            {tab === 1 && <UsersManagement />}
            {tab === 2 && <CoursesManagement />}
            {tab >= 3 && <PlaceholderSection title={TABS[tab]} />}
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}
