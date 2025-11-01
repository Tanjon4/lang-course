// "use client";

// import React, { useContext, useEffect } from "react";
// import { FiSearch, FiBell } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { UserContext } from "@/app/[lang]/dashboard/admin/context/UserContext";

// export default function DashboardHeader() {
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const accessToken = localStorage.getItem("access");
//         if (!accessToken) return;

//         const res = await fetch(
//           "https://lang-courses-api.onrender.com/api/users/me/",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (!res.ok) return;

//         const data = await res.json();
//         const fullName = data.first_name || data.last_name
//           ? `${data.first_name || ""} ${data.last_name || ""}`.trim()
//           : data.username;

//         const userData = { name: fullName, email: data.email, role: data.role };
//         setUser(userData);
//         localStorage.setItem("user", JSON.stringify(userData));
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (!user) fetchUser();
//   }, [user, setUser]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45 }}
//       className="flex items-center justify-between"
//     >
//       <div>
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <p className="text-sm text-[var(--muted)]">Bienvenue 👋</p>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <input
//             className="px-3 py-2 rounded-full border border-gray-100 dark:border-white/6 w-64 bg-transparent"
//             placeholder="Search task"
//           />
//           <div className="absolute right-3 top-2.5 text-[var(--muted)]">
//             <FiSearch />
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5">
//             <FiBell />
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fea] to-[#f6f] flex items-center justify-center text-sm text-black">
//               {user?.name ? user.name[0].toUpperCase() : "?"}
//             </div>
//             <div className="text-sm">
//               <div className="font-medium">{user?.name || "Utilisateur"}</div>
//               <div className="text-xs text-[var(--muted)]">{user?.email || "email@example.com"}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/[lang]/dashboard/admin/services/api";

export default function DashboardHeader() {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
  api.get("/users/me/")
    .then((res) => setUser(res.data))
    .catch((err) => console.error("Erreur API:", err.response?.data || err));
}, []);



  return (
    <header>
      <h2>Bienvenue {user.name || "Utilisateur"}</h2>
      <p>{user.email}</p>
    </header>
  );
}
