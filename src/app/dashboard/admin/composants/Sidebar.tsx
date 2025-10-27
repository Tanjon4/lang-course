// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import ThemeSwitcher from "../composants/ ThemeSwitcher";
// import { FiHome, FiCalendar, FiBarChart2, FiUsers, FiSettings, FiLogOut, FiHelpCircle, FiMenu } from "react-icons/fi";

// const items = [
//   { label: "Dashboard", icon: <FiHome /> },
//   { label: "Gestion utilisateurs", icon: <FiBarChart2 /> },
//   { label: "Gestion cours", icon: <FiCalendar /> },
//   { label: "Gestion des niveaux", icon: <FiBarChart2 /> },
//   { label: "Securite", icon: <FiUsers /> },
// ];

// export default function Sidebar() {
//   return (
//     <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="h-full">
//       <div className="card-surface p-4 flex flex-col justify-between h-[92vh]">
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a8a40] to-[#6fbf82] flex items-center justify-center text-white font-bold">
//               E
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">E-learning</h3>
//               <p className="text-sm text-[var(--muted)]">Project Manager</p>
//             </div>
//           </div>

//           <nav className="space-y-1">
//             {items.map((it) => (
//               <div key={it.label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
//                 <div className="text-green-700 dark:text-green-400">{it.icon}</div>
//                 <div className="text-sm font-medium">{it.label}</div>
//                 {it.label === "Tasks" && <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">12+</span>}
//               </div>
//             ))}
//           </nav>

//           <div className="mt-6 border-t pt-6 border-gray-100 dark:border-white/6">
//             <div className="text-xs text-[var(--muted)] mb-3">GENERAL</div>
//             <div className="space-y-1">
//               <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
//                 <FiSettings />
//                 <div className="text-sm">Settings</div>
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
//                 <FiHelpCircle />
//                 <div className="text-sm">Help</div>
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
//                 <FiLogOut />
//                 <div className="text-sm">Logout</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
          

//           <div className="mt-2">
//             <ThemeSwitcher />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  FiHome,
  FiCalendar,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
} from "react-icons/fi";

const items = [
  { label: "Dashboard", icon: <FiHome /> },
  { label: "Gestion utilisateurs", icon: <FiUsers /> },
  { label: "Gestion cours", icon: <FiCalendar /> },
  { label: "Gestion des niveaux", icon: <FiBarChart2 /> },
  { label: "Parametre", icon: <FiSettings /> },
];

export default function Sidebar({ active, setActive }: { active: string; setActive: (v: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="card-surface p-4 flex flex-col justify-between h-[92vh]">
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

          <nav className="space-y-1">
            {items.map((it) => (
              <div
                key={it.label}
                onClick={() => setActive(it.label)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  active === it.label
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="text-green-700 dark:text-green-400">{it.icon}</div>
                <div className="text-sm font-medium">{it.label}</div>
              </div>
            ))}
          </nav>

          <div className="mt-6 border-t pt-6 border-gray-100 dark:border-white/6">
            <div className="text-xs text-[var(--muted)] mb-3">GENERAL</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                <FiHelpCircle />
                <div className="text-sm">Help</div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                <FiLogOut />
                <div className="text-sm">Logout</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.div>
  );
}
