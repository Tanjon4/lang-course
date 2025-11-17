// "use client";
// import React from "react";
// import Card from "./ui/Cards";
// import { motion } from "framer-motion";

// export default function ProjectProgress() {
//   const percent = 41;

//   return (
//     <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
//       <Card>
//         <div className="flex items-center justify-between mb-4">
//           <div className="text-sm font-medium">Progression globale des etudiants</div>
//           <div className="text-xs text-[var(--muted)]">41% Project Ended</div>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="relative w-36 h-36">
//             <svg viewBox="0 0 36 36" className="w-36 h-36">
//               <path d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32" fill="none" stroke="#e6eef0" strokeWidth="3.5"/>
//               <path
//                 d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32"
//                 fill="none"
//                 stroke="url(#g1)"
//                 strokeWidth="3.5"
//                 strokeDasharray={`${percent} ${100 - percent}`}
//                 strokeLinecap="round"
//                 transform="rotate(-90 18 18)"
//               />
//               <defs>
//                 <linearGradient id="g1" x1="0" x2="1">
//                   <stop offset="0%" stopColor="#0a8a40" />
//                   <stop offset="100%" stopColor="#6fbf82" />
//                 </linearGradient>
//               </defs>
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">{percent}%</div>
//           </div>

//           <div className="flex-1">
//             <div className="text-sm">Progress breakdown</div>
//             <div className="mt-3 space-y-2 text-sm">
//               <div className="flex items-center justify-between"><div>Completed</div><div className="text-[var(--muted)]">41%</div></div>
//               <div className="flex items-center justify-between"><div>In Progress</div><div className="text-[var(--muted)]">35%</div></div>
//               <div className="flex items-center justify-between"><div>Pending</div><div className="text-[var(--muted)]">24%</div></div>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   );
// }
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiLoader, FiClock } from "react-icons/fi";

export default function ProjectProgress() {
  const percent = 41;
  const progress = [
    { label: "Completed", value: 41, color: "from-green-400 to-green-600", icon: FiCheckCircle },
    { label: "In Progress", value: 35, color: "from-yellow-300 to-yellow-500", icon: FiLoader },
    { label: "Pending", value: 24, color: "from-orange-300 to-orange-500", icon: FiClock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-base md:text-lg font-poppins font-semibold text-gray-800">
          Progression globale des étudiants
        </div>
        <div className="text-sm md:text-base font-inter text-gray-500">{percent}% Project Ended</div>
      </div>

      <div className="flex flex-wrap gap-8">
        {/* Cercle multi-dégradé */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-40 h-40">
            <path
              d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32"
              fill="none"
              stroke="#e6eef0"
              strokeWidth="4"
            />
            <path
              d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32"
              fill="none"
              stroke="url(#multiGradient)"
              strokeWidth="4"
              strokeDasharray={`${percent} ${100 - percent}`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
            <defs>
              <linearGradient id="multiGradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#3BA1C5" />
                <stop offset="50%" stopColor="#49B291" />
                <stop offset="100%" stopColor="#F7D188" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-inter font-bold text-gray-900">
            {percent}%
          </div>
        </div>

        {/* Progress bars */}
        <div className="flex-1 min-w-[250px] space-y-5">
          {progress.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 font-poppins text-gray-800">
                    <Icon className="text-gray-700 text-xl" /> 
                    <span className="text-lg font-semibold">{p.label}</span>
                  </div>
                  <div className="text-sm font-inter text-gray-500">{p.value}%</div>
                </div>
                <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.value}%` }}
                    transition={{ duration: 0.9 }}
                    className={`h-5 rounded-full bg-gradient-to-r ${p.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
