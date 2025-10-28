"use client";
import React from "react";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-[var(--muted)]"></p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input className="px-3 py-2 rounded-full border border-gray-100 dark:border-white/6 w-64 bg-transparent" placeholder="Search task" />
          <div className="absolute right-3 top-2.5 text-[var(--muted)]"><FiSearch /></div>
        </div>
       
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5"><FiBell /></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fea] to-[#f6f] flex items-center justify-center text-sm text-black">TM</div>
            <div className="text-sm">
              <div className="font-medium">Totok Michael</div>
              <div className="text-xs text-[var(--muted)]">tmichael20@mail.com</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
