"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Bell, Menu, UserCircle, ChevronDown } from "lucide-react";

export default function Header({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  return (
    <header className="flex items-center justify-between w-full px-4 sm:px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
      {/* Left section: mobile menu + title */}
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </motion.button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          Tableau de bord
        </h1>
      </div>

      {/* Center: search bar (hidden on small screens) */}
      <div className="hidden md:flex items-center relative w-72">
        <Search className="absolute left-3 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-9 pr-3 py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Right section: notifications + profile */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ rotate: 15 }}
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 block w-2.5 h-2.5 bg-red-500 rounded-full" />
        </motion.button>

        {/* User info */}
        <div className="hidden sm:flex items-center gap-2 cursor-pointer group">
          <UserCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col text-sm leading-tight">
            <span className="text-gray-800 dark:text-gray-100 font-medium">
              Admin
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              Super utilisateur
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition" />
        </div>
      </div>
    </header>
  );
}
