"use client";
import React, { useEffect, useState } from "react";
import Card from "./ui/Cards";
import { motion } from "framer-motion";
import axios from "axios";

type Stat = {
  title: string;
  value: string | number;
  note: string;
  gradient?: boolean;
};

export default function DashboardCards() {
  const [stats, setStats] = useState<Stat[]>([
    { title: "Nombre total utilisateurs", value: "—", note: "En attente...", gradient: true },
    { title: "Nombre de cours actifs", value: "—", note: "En attente..." },
    { title: "Cours inscrits", value: "—", note: "En attente..." },
    { title: "Cours complétés", value: "—", note: "En attente..." },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 🔹 1. Récupérer les utilisateurs
        const usersRes = await axios.get("https://lang-courses-api.onrender.com/api/users/");
        const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

        // 🔹 2. Récupérer les cours
        const coursesRes = await axios.get("https://lang-courses-api.onrender.com/api/courses/");
        const courses = Array.isArray(coursesRes.data) ? coursesRes.data : [];
        const totalCourses = courses.length; // juste le nombre de cours créés

        // 🔹 3. Calcul des inscriptions et complétions
        const enrolledCourses = courses.reduce(
          (acc, c) => acc + (c.students?.length ?? 0),
          0
        );
        const completedCourses = courses.reduce(
          (acc, c) => acc + (c.students?.filter((s: any) => s.completed)?.length ?? 0),
          0
        );

        // 🔹 4. Mettre à jour les stats
        setStats(prev =>
          prev.map(s => {
            switch (s.title) {
              case "Nombre total utilisateurs":
                return { ...s, value: totalUsers, note: `${totalUsers} utilisateurs` };
              case "Nombre de cours actifs":
                return { ...s, value: totalCourses, note: `${totalCourses} cours` };
              case "Cours inscrits":
                return { ...s, value: enrolledCourses, note: `${enrolledCourses} inscriptions` };
              case "Cours complétés":
                return { ...s, value: completedCourses, note: `${completedCourses} complétés` };
              default:
                return s;
            }
          })
        );
      } catch (err) {
        console.error("Erreur fetching stats:", err);
        setStats(prev =>
          prev.map(s => ({ ...s, note: "Erreur de chargement" }))
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-12 gap-4">
      {stats.map(s => (
        <div key={s.title} className="col-span-12 md:col-span-6 lg:col-span-3">
          <Card className={`${s.gradient ? "bg-gradient-to-br from-[#0a8a40] to-[#6fbf82] text-white" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium">{s.title}</div>
                <div className="text-3xl font-semibold">{s.value}</div>
                <div className={`text-xs mt-2 ${s.gradient ? "text-white/80" : "text-[var(--muted)]"}`}>{s.note}</div>
              </div>
              <div className="text-sm">↗</div>
            </div>
          </Card>
        </div>
      ))}
    </motion.div>
  );
}
