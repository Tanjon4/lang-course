"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  User,
  MessageCircle,
  PhoneIcon,
} from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // JS, tsy misy type

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "courses", label: "Cours", icon: BookOpen },
    { to: "teachers", label: "Prof", icon: Users },
    { to: "about", label: "A Propos", icon: MessageCircle },
    { to: "contact", label: "Contact", icon: PhoneIcon },
    { to: "auth", label: "", icon: User },
  ];

  // Fetch user avy amin'ny API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://lang-courses-api.onrender.com/api/users/"); // ohatra API
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erreur fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const sections = links.map((link) => document.getElementById(link.to));
      for (let sec of sections) {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sec.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-transparent text-black font-extrabold"
            : "backdrop-blur-lg bg-none text-gray-800 font-extrabold shadow-lg"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight hover:scale-105 transition-transform"
          >
            E-Learning
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex space-x-8 font-medium">
              {links.map(({ to, label, icon: Icon }) => (
                <li key={to} className="flex items-center space-x-2">
                  {to === "auth" ? (
                    user ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={user.avatar || "/default-avatar.png"}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium">{user.username}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAuthOpen(true)}
                        className="flex items-center gap-2 hover:text-amber-600"
                      >
                        <Icon size={18} />
                        {label}
                      </button>
                    )
                  ) : (
                    <a
                      href={`${to}`}
                      className={`flex items-center gap-2 transition-colors duration-300 ${
                        activeSection === to
                          ? "text-amber-600 border-b-2 border-amber-600 pb-1"
                          : "hover:text-orange-300"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <LanguageSwitcher />
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-zinc-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 w-3/4 max-w-sm h-full z-40 bg-gradient-to-b from-zinc-200 to-orange-200 shadow-xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📚 Menu</h2>
              </div>

              <nav className="mt-12 flex-1">
                <ul className="flex flex-col space-y-6 text-lg font-medium text-gray-800">
                  {links.map(({ to, label, icon: Icon }) => (
                    <li key={to} className="flex items-center space-x-2">
                      {to === "auth" ? (
                        user ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={user.avatar || "/default-avatar.png"}
                              alt="avatar"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-medium">{user.username}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsAuthOpen(true)}
                            className="flex items-center gap-2 hover:text-indigo-300"
                          >
                            <Icon size={18} />
                            {label}
                          </button>
                        )
                      ) : (
                        <a
                          href={`#${to}`}
                          className={`flex items-center gap-2 transition-colors duration-300 ${
                            activeSection === to
                              ? "text-amber-600 border-b-2 border-amber-600 pb-1"
                              : "hover:text-yellow-400"
                          }`}
                        >
                          <Icon size={18} />
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <LanguageSwitcher />

              <div className="mt-auto text-center text-sm text-white/70">
                © {new Date().getFullYear()} E-Learn Platform 🌐
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
