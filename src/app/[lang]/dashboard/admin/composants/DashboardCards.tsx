// "use client";
// import React, { useEffect, useState } from "react";
// import Card from "./ui/Cards";
// import { motion } from "framer-motion";
// import axios from "axios";

// type Stat = {
//   title: string;
//   value: string | number;
//   note: string;
//   gradient?: boolean;
// };

// export default function DashboardCards() {
//   const [stats, setStats] = useState<Stat[]>([
//     { title: "Nombre total utilisateurs", value: "—", note: "En attente...", gradient: true },
//     { title: "Nombre de cours actifs", value: "—", note: "En attente..." },
//     { title: "Cours inscrits", value: "—", note: "En attente..." },
//     { title: "Cours complétés", value: "—", note: "En attente..." },
//   ]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // 🔹 1. Récupérer les utilisateurs
//         const usersRes = await axios.get("https://lang-courses-api.onrender.com/api/users/");
//         const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

//         // 🔹 2. Récupérer les cours
//         const coursesRes = await axios.get("https://lang-courses-api.onrender.com/api/courses/");
//         const courses = Array.isArray(coursesRes.data) ? coursesRes.data : [];
//         const totalCourses = courses.length; // juste le nombre de cours créés

//         // 🔹 3. Calcul des inscriptions et complétions
//         const enrolledCourses = courses.reduce(
//           (acc, c) => acc + (c.students?.length ?? 0),
//           0
//         );
//         const completedCourses = courses.reduce(
//           (acc, c) => acc + (c.students?.filter((s: any) => s.completed)?.length ?? 0),
//           0
//         );

//         // 🔹 4. Mettre à jour les stats
//         setStats(prev =>
//           prev.map(s => {
//             switch (s.title) {
//               case "Nombre total utilisateurs":
//                 return { ...s, value: totalUsers, note: `${totalUsers} utilisateurs` };
//               case "Nombre de cours actifs":
//                 return { ...s, value: totalCourses, note: `${totalCourses} cours` };
//               case "Cours inscrits":
//                 return { ...s, value: enrolledCourses, note: `${enrolledCourses} inscriptions` };
//               case "Cours complétés":
//                 return { ...s, value: completedCourses, note: `${completedCourses} complétés` };
//               default:
//                 return s;
//             }
//           })
//         );
//       } catch (err) {
//         console.error("Erreur fetching stats:", err);
//         setStats(prev =>
//           prev.map(s => ({ ...s, note: "Erreur de chargement" }))
//         );
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid grid-cols-12 gap-4">
//       {stats.map(s => (
//         <div key={s.title} className="col-span-12 md:col-span-6 lg:col-span-3">
//           <Card className={`${s.gradient ? "bg-gradient-to-br from-[#0a8a40] to-[#6fbf82] text-white" : ""}`}>
//             <div className="flex items-start justify-between">
//               <div>
//                 <div className="text-xs font-medium">{s.title}</div>
//                 <div className="text-3xl font-semibold">{s.value}</div>
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


// "use client";
// import React, { useEffect, useState } from "react";
// import Card from "./ui/Cards";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { FiUsers, FiBookOpen, FiCheckCircle, FiClipboard } from "react-icons/fi";

// type Stat = {
//   title: string;
//   value: string | number;
//   note: string;
//   color: string;     // couleur de fond
//   textColor: string; // couleur du texte
//   Icon: React.ElementType; // icône
// };

// export default function DashboardCards() {
//   const [stats, setStats] = useState<Stat[]>([
//     { title: "Nombre total utilisateurs", value: "—", note: "En attente...", color: "#f02828", textColor: "white", Icon: FiUsers },
//     { title: "Nombre de cours actifs", value: "—", note: "En attente...", color: "#f7d188", textColor: "black", Icon: FiBookOpen },
//     { title: "Cours inscrits", value: "—", note: "En attente...", color: "#fdf6e7", textColor: "black", Icon: FiClipboard },
//     { title: "Cours complétés", value: "—", note: "En attente...", color: "#49b291", textColor: "white", Icon: FiCheckCircle },
//   ]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const usersRes = await axios.get("https://lang-courses-api.onrender.com/api/users/");
//         const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

//         const coursesRes = await axios.get("https://lang-courses-api.onrender.com/api/courses/");
//         const courses = Array.isArray(coursesRes.data) ? coursesRes.data : [];
//         const totalCourses = courses.length;

//         const enrolledCourses = courses.reduce(
//           (acc, c) => acc + (c.students?.length ?? 0),
//           0
//         );
//         const completedCourses = courses.reduce(
//           (acc, c) => acc + (c.students?.filter((s: any) => s.completed)?.length ?? 0),
//           0
//         );

//         setStats(prev =>
//           prev.map(s => {
//             switch (s.title) {
//               case "Nombre total utilisateurs":
//                 return { ...s, value: totalUsers, note: `${totalUsers} utilisateurs` };
//               case "Nombre de cours actifs":
//                 return { ...s, value: totalCourses, note: `${totalCourses} cours` };
//               case "Cours inscrits":
//                 return { ...s, value: enrolledCourses, note: `${enrolledCourses} inscriptions` };
//               case "Cours complétés":
//                 return { ...s, value: completedCourses, note: `${completedCourses} complétés` };
//               default:
//                 return s;
//             }
//           })
//         );
//       } catch (err) {
//         console.error("Erreur fetching stats:", err);
//         setStats(prev =>
//           prev.map(s => ({ ...s, note: "Erreur de chargement" }))
//         );
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="grid grid-cols-12 gap-4"
//     >
//       {stats.map(s => {
//         const IconComponent = s.Icon;
//         return (
//           <div key={s.title} className="col-span-12 md:col-span-6 lg:col-span-3">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200, damping: 15 }}
//               className="rounded-lg shadow-md cursor-pointer"
//               style={{ backgroundColor: s.color, color: s.textColor }}
//             >
//               <div className="p-4 flex items-start justify-between rounded-lg">
//                 <div>
//                   <div className="text-xs font-bold">{s.title}</div>
//                   <div className="text-3xl font-bold mt-1">{s.value}</div>
//                   <div className="text-xs mt-2">{s.note}</div>
//                 </div>
//                 <motion.div
//                   className="text-3xl"
//                   whileHover={{ rotate: 15, x: 5 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 10 }}
//                 >
//                   <IconComponent />
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         );
//       })}
//     </motion.div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiUsers, FiBookOpen, FiCheckCircle, FiClipboard } from "react-icons/fi";

type Stat = {
  title: string;
  value: string | number;
  note: string;
  gradient: string;     // dégradé background
  titleColor: string;   // couleur titre
  valueColor: string;   // couleur valeur
  noteColor: string;    // couleur note
  Icon: React.ElementType;
};

export default function DashboardCards() {
  const [stats, setStats] = useState<Stat[]>([
    { title: "Nombre total utilisateurs", value: "—", note: "En attente...", gradient: "from-[#3BA1C5] to-[#7ccfe4]", titleColor: "#ffffff", valueColor: "#ffffff", noteColor: "#D0F0FA", Icon: FiUsers },
    { title: "Nombre de cours actifs", value: "—", note: "En attente...", gradient: "from-[#F7D188] to-[#F2B84B]", titleColor: "#4B3E2A", valueColor: "#1A1A1A", noteColor: "#4B3E2A", Icon: FiBookOpen },
    { title: "Cours inscrits", value: "—", note: "En attente...", gradient: "from-[#FDF6E7] to-[#FCE4C4]", titleColor: "#5A4A3D", valueColor: "#1A1A1A", noteColor: "#7A6A5D", Icon: FiClipboard },
    { title: "Cours complétés", value: "—", note: "En attente...", gradient: "from-[#49B291] to-[#3A8D7E]", titleColor: "#CFFFE0", valueColor: "#ffffff", noteColor: "#B0F0D0", Icon: FiCheckCircle },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get("https://lang-courses-api.onrender.com/api/users/");
        const totalUsers = Array.isArray(usersRes.data) ? usersRes.data.length : 0;

        const coursesRes = await axios.get("https://lang-courses-api.onrender.com/api/courses/");
        const courses = Array.isArray(coursesRes.data) ? coursesRes.data : [];
        const totalCourses = courses.length;

        const enrolledCourses = courses.reduce(
          (acc, c) => acc + (c.students?.length ?? 0),
          0
        );
        const completedCourses = courses.reduce(
          (acc, c) => acc + (c.students?.filter((s: any) => s.completed)?.length ?? 0),
          0
        );

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
        setStats(prev => prev.map(s => ({ ...s, note: "Erreur de chargement" })));
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-12 gap-6"
    >
      {stats.map((s) => {
        const IconComponent = s.Icon;
        return (
          <div key={s.title} className="col-span-12 md:col-span-6 lg:col-span-3">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`rounded-2xl p-5 cursor-pointer shadow-lg bg-gradient-to-br ${s.gradient}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wide font-poppins" style={{ color: s.titleColor }}>
                    {s.title}
                  </div>
                  <div className="text-3xl font-extrabold mt-1 font-inter" style={{ color: s.valueColor }}>
                    {s.value}
                  </div>
                  <div className="text-xs mt-2 font-roboto opacity-90" style={{ color: s.noteColor }}>
                    {s.note}
                  </div>
                </div>
                <motion.div
                  className="text-4xl"
                  style={{ color: "#ffffff" }} // icône en blanc
                  whileHover={{ rotate: 15, x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <IconComponent />
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
