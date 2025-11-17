// "use client";
// import React, { useEffect, useState } from "react";
// import Card from "./ui/Cards";
// import { FiPlay, FiPause, FiStopCircle } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function TimeTracker() {
//   const [running, setRunning] = useState(false);
//   const [seconds, setSeconds] = useState(5040); // 1:24:00 ≈ 5040

//   useEffect(() => {
//     let timer: any;
//     if (running) {
//       timer = setInterval(() => setSeconds(s => s + 1), 1000);
//     }
//     return () => clearInterval(timer);
//   }, [running]);

//   const format = (s: number) => {
//     const h = Math.floor(s / 3600);
//     const m = Math.floor((s % 3600) / 60);
//     const sec = s % 60;
//     return [h, m, sec].map(v => String(v).padStart(2, "0")).join(":");
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
//       <Card>
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-sm font-medium">Time Tracker</div>
//             <div className="text-xs text-[var(--muted)]">Track time spent</div>
//           </div>
//           <div className="text-2xl font-semibold">{format(seconds)}</div>
//         </div>

//         <div className="mt-4 flex items-center gap-3">
//           <button onClick={() => setRunning(true)} className="px-3 py-2 rounded-full bg-green-600 text-white inline-flex items-center gap-2"><FiPlay /> Start</button>
//           <button onClick={() => setRunning(false)} className="px-3 py-2 rounded-full border border-gray-100 dark:border-white/6 inline-flex items-center gap-2"><FiPause /> Pause</button>
//           <button onClick={() => { setRunning(false); setSeconds(0); }} className="px-3 py-2 rounded-full border border-red-600 text-red-600 inline-flex items-center gap-2"><FiStopCircle /> Reset</button>
//         </div>
//       </Card>
//     </motion.div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import Card from "./ui/Cards";
import { FiPlay, FiPause, FiStopCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return [h, m, sec].map(v => String(v).padStart(2, "0")).join(":");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-gradient-to-br from-[#0a8a40]/20 to-[#3BA1C5]/20 backdrop-blur-lg border border-gray-100/20 shadow-2xl">
        <div className="flex flex-col items-center justify-center py-6 px-4">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-poppins font-bold text-[#0a8a40] tracking-wide">Time Tracker</h2>
            <p className="text-xs font-roboto text-gray-400 mt-1">Track time spent on tasks</p>
          </div>

          {/* Chrono */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3BA1C5] via-[#49B291] to-[#0a8a40] mb-6 drop-shadow-lg"
          >
            {format(seconds)}
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#3BA1C5] to-[#49B291] text-white rounded-full shadow-lg hover:shadow-2xl"
            >
              <FiPlay /> Start
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2 border border-gray-300 text-gray-700 rounded-full shadow-sm hover:bg-gray-100"
            >
              <FiPause /> Pause
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
            >
              <FiStopCircle /> Reset
            </motion.button>
          </div>

          {/* Glow Animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-[#3BA1C5]/30 to-[#0a8a40]/30 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
        </div>
      </Card>
    </motion.div>
  );
}
