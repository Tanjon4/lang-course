// "use client";
// import React from "react";
// import { useTheme } from "./lib/ThemeProvider";
// import { motion } from "framer-motion";

// export default function ThemeSwitcher() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
//       <div className="p-3 rounded-lg border border-gray-100 dark:border-white/6">
//         <div className="text-sm font-medium mb-2">Theme</div>
//         <div className="flex gap-2 items-center">
//           <button onClick={() => setTheme("light")} className={`px-3 py-1 rounded-md text-sm ${theme === "light" ? "bg-gray-100" : "bg-transparent"}`}>Light</button>
//           <button onClick={() => setTheme("dark")} className={`px-3 py-1 rounded-md text-sm ${theme === "dark" ? "bg-gray-100" : "bg-transparent"}`}>Dark</button>
//           <button onClick={() => setTheme("system")} className={`px-3 py-1 rounded-md text-sm ${theme === "system" ? "bg-gray-100" : "bg-transparent"}`}>System</button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // On s'assure que le code ne se lance qu'après le montage côté client
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded-md text-sm ${
          currentTheme === "light" ? "bg-gray-100" : "bg-transparent"
        }`}
      >
        Light
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded-md text-sm ${
          currentTheme === "dark" ? "bg-gray-100" : "bg-transparent"
        }`}
      >
        Dark
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`px-3 py-1 rounded-md text-sm ${
          theme === "system" ? "bg-gray-100" : "bg-transparent"
        }`}
      >
        System
      </button>
    </div>
  );
}

