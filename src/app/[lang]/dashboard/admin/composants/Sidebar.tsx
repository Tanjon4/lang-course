// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard,
//   BookOpenText,
//   Users,
//   BarChart3,
//   CalendarDays,
//   Layers,
//   HelpCircle,
//   LogOut,
//   SunMedium,
//   Moon,
//   Monitor,
//   Menu,
//   X,
//   GraduationCap, // nouveau logo premium
// } from "lucide-react";

// interface SidebarProps {
//   active: string;
//   setActive: (label: string) => void;
// }

// const items = [
//   { label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//   { label: "Gestion cours", icon: <BookOpenText size={18} /> },
//   { label: "Gestion utilisateurs", icon: <Users size={18} /> },
//   { label: "Gestion des niveaux", icon: <BarChart3 size={18} /> },
//   { label: "Gestion chapitres", icon: <CalendarDays size={18} /> },
//   { label: "Gestion leçons", icon: <Layers size={18} /> },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
//   const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
//   const [isOpen, setIsOpen] = useState(false);

//   const handleThemeChange = (value: "light" | "dark" | "system") => {
//     setTheme(value);
//     if (value === "light") document.documentElement.classList.remove("dark");
//     else if (value === "dark") document.documentElement.classList.add("dark");
//     else {
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? document.documentElement.classList.add("dark")
//         : document.documentElement.classList.remove("dark");
//     }
//   };

//   return (
//     <>
//       {/* Bouton menu mobile */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 bg-white shadow-md rounded-md text-[#3BA1C5] hover:bg-[#f2faff] transition"
//         >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       {/* Sidebar Desktop */}
//       <motion.aside
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//         className="hidden md:flex flex-col justify-between w-64 h-screen fixed top-0 left-0 bg-white shadow-xl border-r border-gray-100 p-5"
//       >
//         <SidebarContent
//           active={active}
//           setActive={setActive}
//           theme={theme}
//           handleThemeChange={handleThemeChange}
//         />
//       </motion.aside>

//       {/* Sidebar Mobile */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: -300 }}
//             animate={{ x: 0 }}
//             exit={{ x: -300 }}
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-2xl p-5 rounded-r-3xl md:hidden"
//           >
//             <SidebarContent
//               active={active}
//               setActive={(label) => {
//                 setActive(label);
//                 setIsOpen(false);
//               }}
//               theme={theme}
//               handleThemeChange={handleThemeChange}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // ------------------- Composant Contenu -------------------
// interface SidebarContentProps {
//   active: string;
//   setActive: (label: string) => void;
//   theme: "light" | "dark" | "system";
//   handleThemeChange: (value: "light" | "dark" | "system") => void;
// }

// const SidebarContent: React.FC<SidebarContentProps> = ({
//   active,
//   setActive,
//   theme,
//   handleThemeChange,
// }) => {
//   return (
//     <>
//       <div className="flex flex-col justify-between h-full">
//         {/* HEADER */}
//         <div className="flex items-center gap-3 mb-10">
//           <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3BA1C5] to-cyan-400 flex items-center justify-center text-white shadow-md">
//             <GraduationCap size={24} strokeWidth={1.8} />
//           </div>
//           <div>
//             <h3 className="text-lg lg:text-xl font-semibold text-[#3BA1C5] leading-tight">
//               E-learning
//             </h3>
//             <p className="text-xs sm:text-sm text-gray-500">Admin Panel</p>
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="space-y-1 flex-1">
//           {items.map((it) => (
//             <div
//               key={it.label}
//               onClick={() => setActive(it.label)}
//               className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
//                 active === it.label
//                   ? "text-[#3BA1C5] bg-[#E9F7FB] font-semibold"
//                   : "text-gray-700 hover:text-[#3BA1C5] hover:bg-gray-50"
//               }`}
//             >
//               {/* Indicateur actif */}
//               {active === it.label && (
//                 <motion.div
//                   layoutId="activeIndicator"
//                   className="absolute left-0 top-0 h-full w-[4px] bg-[#3BA1C5] rounded-r-md"
//                 />
//               )}
//               <div className="text-lg z-10">{it.icon}</div>
//               <div className="text-sm sm:text-[15px] lg:text-base z-10">
//                 {it.label}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* BAS DE LA SIDEBAR */}
//         <div className="mt-6 border-t border-gray-100 pt-5">
//           <div className="text-xs text-gray-400 mb-3">GENERAL</div>
//           <div className="space-y-1">
//             <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-[#3BA1C5] transition">
//               <HelpCircle size={18} />
//               <div className="text-sm">Aide</div>
//             </div>
//             <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-[#3BA1C5] transition">
//               <LogOut size={18} />
//               <div className="text-sm">Déconnexion</div>
//             </div>
//           </div>

//           {/* Theme Switcher */}
//           <div className="flex justify-between items-center border-t border-gray-100 pt-5 mt-4">
//             <button
//               onClick={() => handleThemeChange("light")}
//               className={`p-2 rounded-lg transition ${
//                 theme === "light"
//                   ? "bg-[#E9F7FB] text-[#3BA1C5]"
//                   : "hover:bg-gray-50 text-gray-600"
//               }`}
//             >
//               <SunMedium size={18} />
//             </button>
//             <button
//               onClick={() => handleThemeChange("dark")}
//               className={`p-2 rounded-lg transition ${
//                 theme === "dark"
//                   ? "bg-[#E9F7FB] text-[#3BA1C5]"
//                   : "hover:bg-gray-50 text-gray-600"
//               }`}
//             >
//               <Moon size={18} />
//             </button>
//             <button
//               onClick={() => handleThemeChange("system")}
//               className={`p-2 rounded-lg transition ${
//                 theme === "system"
//                   ? "bg-[#E9F7FB] text-[#3BA1C5]"
//                   : "hover:bg-gray-50 text-gray-600"
//               }`}
//             >
//               <Monitor size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpenText,
  Users,
  BarChart3,
  CalendarDays,
  Layers,
  HelpCircle,
  LogOut,
  SunMedium,
  Moon,
  Monitor,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: (label: string) => void;
}

const items = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Gestion cours", icon: <BookOpenText size={20} /> },
  { label: "Gestion utilisateurs", icon: <Users size={20} /> },
  { label: "Gestion des niveaux", icon: <BarChart3 size={20} /> },
  { label: "Gestion chapitres", icon: <CalendarDays size={20} /> },
  { label: "Gestion leçons", icon: <Layers size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
    if (value === "light") document.documentElement.classList.remove("dark");
    else if (value === "dark") document.documentElement.classList.add("dark");
    else {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      {/* Menu mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gradient-to-br from-[#3BA1C5] to-[#7ccfe4] text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col justify-between w-64 h-screen fixed top-0 left-0 bg-gradient-to-b from-white via-[#f4f2ef] to-[#e6ddd4] shadow-2xl p-6 rounded-tr-3xl rounded-br-3xl"
      >
        <SidebarContent
          active={active}
          setActive={setActive}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />
      </motion.aside>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            className="fixed top-0 left-0 z-40 w-64 h-full bg-gradient-to-b from-white via-[#f4f2ef] to-[#e6ddd4] shadow-2xl p-6 rounded-r-3xl"
          >
            <SidebarContent
              active={active}
              setActive={(label) => {
                setActive(label);
                setIsOpen(false);
              }}
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface SidebarContentProps {
  active: string;
  setActive: (label: string) => void;
  theme: "light" | "dark" | "system";
  handleThemeChange: (value: "light" | "dark" | "system") => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  active,
  setActive,
  theme,
  handleThemeChange,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3BA1C5] to-[#7ccfe4] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
          <GraduationCap size={26} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#3BA1C5] tracking-wide">E-learning</h3>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {items.map((it) => (
          <motion.div
            key={it.label}
            onClick={() => setActive(it.label)}
            whileHover={{ scale: 1.03 }}
            className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
              active === it.label
                ? "text-white bg-gradient-to-r from-[#3BA1C5] to-[#7ccfe4] font-semibold shadow-md"
                : "text-gray-700 hover:text-[#3BA1C5] hover:bg-gray-100"
            }`}
          >
            {active === it.label && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 h-full w-[4px] bg-[#3BA1C5] rounded-r-md"
              />
            )}
            <div className="text-lg z-10">{it.icon}</div>
            <div className="text-sm sm:text-base lg:text-base z-10">{it.label}</div>
          </motion.div>
        ))}
      </nav>

      {/* BAS DE LA SIDEBAR */}
      <div className="mt-6 border-t border-gray-200 pt-5">
        <div className="text-xs text-gray-400 mb-3">GENERAL</div>
        <div className="space-y-1">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-[#3BA1C5] transition">
            <HelpCircle size={18} />
            <div className="text-sm">Aide</div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-[#3BA1C5] transition">
            <LogOut size={18} />
            <div className="text-sm">Déconnexion</div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-5 mt-4">
          <button
            onClick={() => handleThemeChange("light")}
            className={`p-2 rounded-lg transition ${
              theme === "light"
                ? "bg-[#3BA1C5] text-white shadow-md"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <SunMedium size={18} />
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`p-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-[#3BA1C5] text-white shadow-md"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Moon size={18} />
          </button>
          <button
            onClick={() => handleThemeChange("system")}
            className={`p-2 rounded-lg transition ${
              theme === "system"
                ? "bg-[#3BA1C5] text-white shadow-md"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Monitor size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
