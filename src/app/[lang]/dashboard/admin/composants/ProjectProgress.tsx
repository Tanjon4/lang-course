"use client";
import React from "react";
import Card from "./ui/Cards";
import { motion } from "framer-motion";

export default function ProjectProgress() {
  const percent = 41;

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Progression globale des etudiants</div>
          <div className="text-xs text-[var(--muted)]">41% Project Ended</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 36 36" className="w-36 h-36">
              <path d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32" fill="none" stroke="#e6eef0" strokeWidth="3.5"/>
              <path
                d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32"
                fill="none"
                stroke="url(#g1)"
                strokeWidth="3.5"
                strokeDasharray={`${percent} ${100 - percent}`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#0a8a40" />
                  <stop offset="100%" stopColor="#6fbf82" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">{percent}%</div>
          </div>

          <div className="flex-1">
            <div className="text-sm">Progress breakdown</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between"><div>Completed</div><div className="text-[var(--muted)]">41%</div></div>
              <div className="flex items-center justify-between"><div>In Progress</div><div className="text-[var(--muted)]">35%</div></div>
              <div className="flex items-center justify-between"><div>Pending</div><div className="text-[var(--muted)]">24%</div></div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
