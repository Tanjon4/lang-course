// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { usePathname, useRouter } from "next/navigation";
// import ThemeSwitcher from "./ThemeSwitcher";
// import {
//   FiHome,
//   FiCalendar,
//   FiBarChart2,
//   FiUsers,
//   FiSettings,
//   FiLogOut,
//   FiHelpCircle,
//   FiBookOpen,
// } from "react-icons/fi";

// const items = [
//   { label: "Dashboard", icon: <FiHome />, path: "/dashboard/admin" },
//   { label: "Gestion utilisateurs", icon: <FiUsers />, path: "/dashboard/admin/users" },
//   { label: "Gestion cours", icon: <FiCalendar />, path: "/dashboard/admin/courses" },
//   { label: "Gestion des niveaux", icon: <FiBarChart2 />, path: "/dashboard/admin/levels" },
// ];

// export default function Sidebar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="h-full"
//     >
//       <div className="card-surface p-4 flex flex-col justify-between h-[92vh]">
//         {/* Logo + titre */}
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a8a40] to-[#6fbf82] flex items-center justify-center text-white font-bold">
//               E
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">E-learning</h3>
//               <p className="text-sm text-[var(--muted)]">Admin Panel</p>
//             </div>
//           </div>

//           {/* Menu principal */}
//           <nav className="space-y-1">
//             {items.map((it) => {
//               const isActive = pathname.startsWith(it.path);
//               return (
//                 <div
//                   key={it.label}
//                   onClick={() => router.push(it.path)}
//                   className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
//                     isActive
//                       ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
//                       : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
//                   }`}
//                 >
//                   <div className="text-green-700 dark:text-green-400">{it.icon}</div>
//                   <div className="text-sm font-medium">{it.label}</div>
//                 </div>
//               );
//             })}
//           </nav>

//           {/* Section générale */}
//           <div className="mt-6 border-t pt-6 border-gray-100 dark:border-white/6">
//             <div className="text-xs text-[var(--muted)] mb-3">GÉNÉRAL</div>
//             <div className="space-y-1">
//               <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
//                 <FiHelpCircle />
//                 <div className="text-sm">Aide</div>
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
//                 <FiLogOut />
//                 <div className="text-sm">Déconnexion</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Thème */}
//         <div className="mt-2">
//           <ThemeSwitcher />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  FiHome,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiLayers,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiBookOpen,
} from "react-icons/fi";

const items = [
  { label: "Dashboard", icon: <FiHome />, path: "/dashboard/admin" },
  { label: "Gestion utilisateurs", icon: <FiUsers />, path: "/dashboard/admin/users" },
  { label: "Gestion cours", icon: <FiBookOpen />, path: "/dashboard/admin/courses" },
  { label: "Gestion des niveaux", icon: <FiBarChart2 />, path: "/dashboard/admin/levels" },
  { label: "Gestion des chapitres", icon: <FiLayers />, path: "/dashboard/admin/chapters" },
  { label: "Gestion des leçons", icon: <FiFileText />, path: "/dashboard/admin/lessons" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="card-surface p-4 flex flex-col justify-between h-[92vh]">
        {/* Logo + titre */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a8a40] to-[#6fbf82] flex items-center justify-center text-white font-bold">
              E
            </div>
            <div>
              <h3 className="text-lg font-semibold">E-learning</h3>
              <p className="text-sm text-[var(--muted)]">Admin Panel</p>
            </div>
          </div>

          {/* Menu principal */}
          <nav className="space-y-1">
            {items.map((it) => {
              const isActive = pathname.startsWith(it.path);
              return (
                <div
                  key={it.label}
                  onClick={() => router.push(it.path)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="text-green-700 dark:text-green-400">{it.icon}</div>
                  <div className="text-sm font-medium">{it.label}</div>
                </div>
              );
            })}
          </nav>

          {/* Section générale */}
          <div className="mt-6 border-t pt-6 border-gray-100 dark:border-white/6">
            <div className="text-xs text-[var(--muted)] mb-3">GÉNÉRAL</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                <FiHelpCircle />
                <div className="text-sm">Aide</div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                <FiLogOut />
                <div className="text-sm">Déconnexion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thème */}
        <div className="mt-2">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.div>
  );
}

