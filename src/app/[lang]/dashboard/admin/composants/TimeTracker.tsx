"use client";
import React, { useEffect, useState } from "react";
import Card from "./ui/Cards";
import { FiPlay, FiPause, FiStopCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TimeTracker() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(5040); // 1:24:00 ≈ 5040

  useEffect(() => {
    let timer: any;
    if (running) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const format = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return [h, m, sec].map(v => String(v).padStart(2, "0")).join(":");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Time Tracker</div>
            <div className="text-xs text-[var(--muted)]">Track time spent</div>
          </div>
          <div className="text-2xl font-semibold">{format(seconds)}</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={() => setRunning(true)} className="px-3 py-2 rounded-full bg-green-600 text-white inline-flex items-center gap-2"><FiPlay /> Start</button>
          <button onClick={() => setRunning(false)} className="px-3 py-2 rounded-full border border-gray-100 dark:border-white/6 inline-flex items-center gap-2"><FiPause /> Pause</button>
          <button onClick={() => { setRunning(false); setSeconds(0); }} className="px-3 py-2 rounded-full border border-red-600 text-red-600 inline-flex items-center gap-2"><FiStopCircle /> Reset</button>
        </div>
      </Card>
    </motion.div>
  );
}
