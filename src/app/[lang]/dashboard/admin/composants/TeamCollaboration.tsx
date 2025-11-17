// "use client";
// import React from "react";
// import Card from "./ui/Cards";
// import { motion } from "framer-motion";

// const members = [
//   { name: "Alexandra Deff", task: "Working on Github Project Repository", status: "Completed" },
//   { name: "Edwin Adenike", task: "Working on Integrate User Authentication System", status: "In Progress" },
//   { name: "Isaac Oluwatemiroun", task: "Working on Develop Search and Filter Functionality", status: "Pending" },
//   { name: "David Oshodi", task: "Working on Responsive Layout for Homepage", status: "In Progress" },
// ];

// export default function TeamCollaboration() {
//   return (
//     <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
//       <Card>
//         <div className="flex items-center justify-between mb-4">
//           <div className="text-sm font-medium">Team Collaboration</div>
//           <button className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-white/5">+ Add Member</button>
//         </div>

//         <div className="space-y-3">
//           {members.map((m) => (
//             <div key={m.name} className="flex items-start gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fde8e8] to-[#c2f6d2] flex items-center justify-center text-sm font-medium text-black">
//                 {m.name.split(" ").map(s => s[0]).slice(0,2).join("")}
//               </div>
//               <div className="flex-1">
//                 <div className="font-medium">{m.name}</div>
//                 <div className="text-xs text-[var(--muted)]">{m.task}</div>
//               </div>
//               <div>
//                 <span className={`text-xs px-2 py-1 rounded-full ${m.status === "Completed" ? "bg-green-50 text-green-700" : m.status === "In Progress" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}`}>
//                   {m.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </motion.div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import Card from "./ui/Cards";
import { FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

const members = [
  { name: "Alexandra Deff", task: "Working on Github Project Repository", status: "Completed", progress: 100 },
  { name: "Edwin Adenike", task: "Integrate User Authentication System", status: "In Progress", progress: 65 },
  { name: "Isaac Oluwatemiroun", task: "Develop Search & Filter Functionality", status: "Pending", progress: 20 },
  { name: "David Oshodi", task: "Responsive Layout for Homepage", status: "In Progress", progress: 50 },
];

export default function TeamCollaboration() {
  const statusColors = {
    "Completed": { bg: "bg-green-50", text: "text-green-700", icon: <FiCheckCircle className="text-green-500"/> },
    "In Progress": { bg: "bg-yellow-50", text: "text-yellow-700", icon: <FiClock className="text-yellow-500"/> },
    "Pending": { bg: "bg-red-50", text: "text-red-700", icon: <FiAlertCircle className="text-red-500"/> },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Card>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-poppins font-medium text-gray-700">Team Collaboration</div>
          <button className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-white/5 hover:bg-gray-200 transition">
            + Add Member
          </button>
        </div>

        <div className="space-y-4">
          {members.map((m) => {
            const status = statusColors[m.status];
            return (
              <div key={m.name} className="flex items-start gap-3 relative group">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BA1C5] to-[#49B291] flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {m.name.split(" ").map(s=>s[0]).slice(0,2).join("")}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-700">{m.name}</div>
                    <span className="text-xs text-gray-400">• {m.task}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-1 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-2 rounded-full ${status.text.replace("text-","bg-")}`}
                    />
                  </div>

                  {/* Tooltip info */}
                  <div className="absolute top-0 left-full ml-3 px-2 py-1 text-xs bg-white border border-gray-200 rounded shadow opacity-0 group-hover:opacity-100 transition-all w-40">
                    <div>Task progress: {m.progress}%</div>
                    <div>Deadline: 10 Nov 2025</div>
                    <div>Priority: {m.status==="Pending"?"High":"Normal"}</div>
                  </div>
                </div>

                {/* Status */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                  {status.icon} {m.status}
                </div>
              </div>
            )
          })}
        </div>

        {/* Légende */}
        <div className="flex items-center justify-around mt-6 text-xs font-roboto text-gray-500">
          <div className="flex items-center gap-1"><FiCheckCircle className="text-green-500"/> Completed</div>
          <div className="flex items-center gap-1"><FiClock className="text-yellow-400"/> In Progress</div>
          <div className="flex items-center gap-1"><FiAlertCircle className="text-red-500"/> Pending</div>
        </div>
      </Card>
    </motion.div>
  )
}
