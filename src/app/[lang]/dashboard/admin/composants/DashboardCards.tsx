// "use client";
// import React from "react";
// import Card from "./ui/Cards";
// import { motion } from "framer-motion";

// const stats = [
//   { title: "Nombre total utilisateurs", value: "24", note: "Increased from last month", gradient: true },
//   { title: "Nombre de cours actifs", value: "10", note: "Increased from last month" },
//   { title: "Taux de réussite", value: "12", note: "Increased from last month" },
//   { title: "Pending Project", value: "2", note: "On Discuss" },
// ];

// export default function DashboardCards() {
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-12 gap-4">
//       {stats.map((s, i) => (
//         <div key={s.title} className={`col-span-12 md:col-span-6 lg:col-span-3`}>
//           <Card className={`${s.gradient ? "bg-gradient-to-br from-[#0a8a40] to-[#6fbf82] text-white" : ""}`}>
//             <div className="flex items-start justify-between">
//               <div>
//                 <div className="text-xs font-medium">{s.title}</div>
//                 <div className={`text-3xl font-semibold ${s.gradient ? "" : ""}`}>{s.value}</div>
//                 <div className={`text-xs mt-2 ${s.gradient ? "text-white/80" : "text-[var(--muted)]"}`}>{s.note}</div>
//               </div>
//               <div className="text-sm">↗</div>
//             </div>
//           </Card>
//         </div>
//       ))}
//     </motion.div>
//   );
// }
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
        // 🔹 Récupération des utilisateurs pour la première carte
        const usersRes = await axios.get("https://lang-courses-api.onrender.com/api/users/");
        const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

        // 🔹 Mettre à jour les stats avec les données dynamiques
        setStats((prev) =>
          prev.map((s) => {
            switch (s.title) {
              case "Nombre total utilisateurs":
                return { ...s, value: totalUsers };
              default:
                return s;
            }
          })
        );

        // 🔹 Ici tu peux faire d'autres fetch pour les cours, etc.
        // Ex: const coursesRes = await axios.get("/api/courses/");
        // Puis mettre à jour la carte "Nombre de cours actifs"
      } catch (err) {
        console.error("Erreur fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-12 gap-4">
      {stats.map((s) => (
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
