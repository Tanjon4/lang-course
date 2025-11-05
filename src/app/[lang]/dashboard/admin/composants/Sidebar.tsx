// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import ThemeSwitcher from "./ThemeSwitcher";
// import {
//   FiHome,
//   FiBookOpen,
//   FiBarChart2,
//   FiUsers,
//   FiLayers,
//   FiFileText,
//   FiSettings,
//   FiLogOut,
//   FiHelpCircle,
// } from "react-icons/fi";

// const items = [
//   { label: "Dashboard", icon: <FiHome /> },
//   { label: "Gestion utilisateurs", icon: <FiUsers /> },
//   { label: "Gestion cours", icon: <FiBookOpen /> },
//   { label: "Gestion des niveaux", icon: <FiBarChart2 /> },
// ];

// export default function Sidebar({
//   active,
//   setActive,
// }: {
//   active: string;
//   setActive: (v: string) => void;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="h-full"
//     >
//       <div className="card-surface p-4 flex flex-col justify-between h-[92vh]">
//         <div>
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-400 flex items-center justify-center text-white font-bold">
//               E
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">E-learning</h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Admin Panel
//               </p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-1">
//             {items.map((it) => (
//               <div
//                 key={it.label}
//                 onClick={() => setActive(it.label)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
//                   active === it.label
//                     ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
//                     : "hover:bg-gray-50 dark:hover:bg-white/5"
//                 }`}
//               >
//                 <div className="text-green-700 dark:text-green-400 text-lg">
//                   {it.icon}
//                 </div>
//                 <div className="text-sm font-medium">{it.label}</div>
//               </div>
//             ))}
//           </nav>

//           {/* Footer */}
//           <div className="mt-6 border-t pt-6 border-gray-100 dark:border-white/10">
//             <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
//               GENERAL
//             </div>
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
import ThemeSwitcher from "./ThemeSwitcher";
import {
  FiHome,
  FiBookOpen,
  FiBarChart2,
  FiUsers,
  FiLayers,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
} from "react-icons/fi";

const items = [
  { label: "Dashboard", icon: <FiHome /> },
  { label: "Gestion utilisateurs", icon: <FiUsers /> },
  { label: "Gestion cours", icon: <FiBookOpen /> },
  { label: "Gestion des niveaux", icon: <FiBarChart2 /> },
  { label: "Gestion des chapitres", icon: <FiLayers /> },
  { label: "Gestion des leçons", icon: <FiFileText /> },
];

export default function Sidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: (v: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="card-surface p-4 flex flex-col justify-between h-[92vh]">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-400 flex items-center justify-center text-white font-bold">
              E
            </div>
            <div>
              <h3 className="text-lg font-semibold">E-learning</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Navigation */}
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
                <div className="text-green-700 dark:text-green-400 text-lg">
                  {it.icon}
                </div>
                <div className="text-sm font-medium">{it.label}</div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-6 border-t pt-6 border-gray-100 dark:border-white/10">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              GENERAL
            </div>
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

        <div className="mt-2">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.div>
  );
}


