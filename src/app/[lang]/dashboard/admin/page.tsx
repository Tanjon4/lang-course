"use client";
import React, { useState } from "react";
import Sidebar from "./composants/Sidebar";
import DashboardHome from "./composants/DashboardHome";
import GestionCours from "./composants/GestionCours";
import GestionUtilisateurs from "./composants/GestionUtilisateurs";
import GestionNiveaux from "./composants/GestionNiveaux";
import GestionChapitre from "./composants/GestionChapitre";
import GestionLesson from "./composants/GestionLesson"

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardHome />;
      case "Gestion cours":
        return <GestionCours />;
      case "Gestion utilisateurs":
        return <GestionUtilisateurs />;
      case "Gestion des niveaux":
        return <GestionNiveaux />;
      case "Gestion chapitres":
        return <GestionChapitre />;
      case "Gestion leçons":
        return <GestionLesson />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="max-w-[1300px] mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar active={activePage} setActive={setActivePage} />
        </aside>

        <section className="col-span-12 md:col-span-9 lg:col-span-10">
          {renderContent()}
        </section>
      </div>
    </main>
  );
}