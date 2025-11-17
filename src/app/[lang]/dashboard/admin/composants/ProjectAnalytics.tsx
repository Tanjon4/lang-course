// "use client";
// import React from "react";
// import Card from "./ui/Cards";
// import { motion } from "framer-motion";

// /* Very simple mock of the bar-visual present in image */
// export default function ProjectAnalytics() {
//   const days = ["S","M","T","W","T","F","S"];
//   const heights = [45, 74, 92, 98, 66, 64, 30];

//   return (
//     <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
//       <Card>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <div className="text-sm font-medium">Project Analytics</div>
//             <div className="text-xs text-[var(--muted)]">Activity by day</div>
//           </div>
//           <div className="text-xs text-[var(--muted)]">24% Weekly high</div>
//         </div>

//         <div className="flex items-end gap-3 h-32">
//           {heights.map((h, i) => (
//             <div key={i} className="flex flex-col items-center">
//               <div style={{height: `${h}px`, width: 28}} className={`rounded-full ${i===3 ? "bg-gradient-to-br from-[#0a8a40] to-[#6fbf82]" : "bg-green-100/70"} overflow-hidden`}></div>
//               <div className="text-xs mt-2 text-[var(--muted)]">{days[i]}</div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </motion.div>
//   );
// }
"use client";
import React from "react";
import Card from "./ui/Cards";
import { motion } from "framer-motion";
import { FiCalendar, FiTrendingUp, FiClock, FiActivity } from "react-icons/fi";

export default function TimeSpendingChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const activeHours = [15, 8, 12, 18, 14, 10, 16, 12, 15];
  const inactiveHours = [13, 6, 10, 14, 12, 8, 10, 15, 12];

  // Calcul des données pour le graphique en courbes
  const maxValue = Math.max(...activeHours, ...inactiveHours);
  const chartHeight = 160;

  const calculateYPosition = (value: number) => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  // Générer les points pour les courbes SVG
  const generatePathData = (data: number[]) => {
    return data.map((value, index) => {
      const x = (index / (months.length - 1)) * 100;
      const y = (value / maxValue) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x} ${100 - y}`;
    }).join(' ');
  };

  const activePath = generatePathData(activeHours);
  const inactivePath = generatePathData(inactiveHours);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-lg shadow-xl border border-slate-200/60 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <FiActivity className="text-indigo-600 text-lg" />
            </div>
            <div>
              <div className="text-lg font-poppins font-bold text-slate-800">
                Time Spending
              </div>
              <div className="text-xs font-inter text-slate-500">
                Monthly activity trends
              </div>
            </div>
          </div>
          
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
            <select className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white/80 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all">
              <option>This Year</option>
              <option>This Month</option>
              <option>Last 6 Months</option>
            </select>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/60 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="text-xs font-inter text-slate-500">Active</div>
            </div>
            <div className="text-lg font-bold text-slate-800">
              {activeHours.reduce((a, b) => a + b, 0)}h
            </div>
          </div>
          <div className="bg-white/60 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-indigo-200 rounded-full"></div>
              <div className="text-xs font-inter text-slate-500">Inactive</div>
            </div>
            <div className="text-lg font-bold text-slate-800">
              {inactiveHours.reduce((a, b) => a + b, 0)}h
            </div>
          </div>
          <div className="bg-white/60 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <FiTrendingUp className="text-emerald-500 text-sm" />
              <div className="text-xs font-inter text-slate-500">Peak</div>
            </div>
            <div className="text-lg font-bold text-emerald-600">{maxValue}h</div>
          </div>
        </div>

        {/* Graphique en courbes */}
        <div className="relative h-48 px-4">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Grille de fond */}
            {[0, 25, 50, 75, 100].map((line) => (
              <line
                key={line}
                x1="0"
                y1={line}
                x2="100"
                y2={line}
                stroke="#f1f5f9"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Courbe Inactive */}
            <motion.path
              d={inactivePath}
              fill="none"
              stroke="url(#inactiveGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            
            {/* Courbe Active */}
            <motion.path
              d={activePath}
              fill="none"
              stroke="url(#activeGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            {/* Points pour Active */}
            {activeHours.map((value, index) => {
              const x = (index / (months.length - 1)) * 100;
              const y = (value / maxValue) * 100;
              return (
                <motion.circle
                  key={`active-${index}`}
                  cx={x}
                  cy={100 - y}
                  r="2"
                  fill="#7C5BFF"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="cursor-pointer hover:r-3 transition-all"
                />
              );
            })}
            
            {/* Points pour Inactive */}
            {inactiveHours.map((value, index) => {
              const x = (index / (months.length - 1)) * 100;
              const y = (value / maxValue) * 100;
              return (
                <motion.circle
                  key={`inactive-${index}`}
                  cx={x}
                  cy={100 - y}
                  r="1.5"
                  fill="#C8C2F0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="cursor-pointer hover:r-2.5 transition-all"
                />
              );
            })}

            {/* Définitions des gradients */}
            <defs>
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C5BFF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="inactiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C8C2F0" />
                <stop offset="100%" stopColor="#A5B4FC" />
              </linearGradient>
            </defs>
          </svg>

          {/* Labels des mois */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {months.map((month, index) => (
              <div
                key={month}
                className="text-xs font-inter text-slate-500 font-medium text-center flex-1"
              >
                {month}
              </div>
            ))}
          </div>

          {/* Axe Y - Labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-400 font-inter py-2">
            <div>{maxValue}h</div>
            <div>{Math.round(maxValue * 0.75)}h</div>
            <div>{Math.round(maxValue * 0.5)}h</div>
            <div>{Math.round(maxValue * 0.25)}h</div>
            <div>0h</div>
          </div>
        </div>

        {/* Légende */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
            <span className="text-sm font-inter font-medium text-slate-700">Active Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-full"></div>
            <span className="text-sm font-inter font-medium text-slate-700">Inactive Hours</span>
          </div>
        </div>

        {/* Footer informatif */}
        <div className="mt-4 text-center">
          <div className="text-xs font-inter text-slate-400">
            Peak activity: <span className="font-semibold text-slate-600">{Math.max(...activeHours)}h in {months[activeHours.indexOf(Math.max(...activeHours))]}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}