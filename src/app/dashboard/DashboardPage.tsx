"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Settings,
  GraduationCap,
  UserCircle,
} from "lucide-react";

interface User {
  username: string;
}

interface Course {
  id: number;
  title: string;
  created_at: string;
  progress?: string;
  duration?: string;
}

interface Overview {
  in_progress: number;
  completed: number;
  certificates: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    // Infos utilisateur
    fetch("http://127.0.0.1:8000/api/auth/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);

    // Statistiques
    fetch("http://127.0.0.1:8000/api/userprogress/overview/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch(console.error);

    // Cours
    fetch("http://127.0.0.1:8000/api/courses/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gradient-to-b from-[#0a1f44] to-[#0a234f] text-white p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-white text-[#0a1f44] flex items-center justify-center font-bold">
                e
              </div>
              <span className="text-lg font-semibold">e-learning</span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 font-medium cursor-pointer">
                <LayoutDashboard size={18} /> Dashboard
              </li>
              <li className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
                <BookOpen size={18} /> My Courses
              </li>
              <li className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
                <MessageSquare size={18} /> Messages
              </li>
              <li className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition">
                <Settings size={18} /> Settings
              </li>
            </ul>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <LayoutDashboard size={24} className="text-indigo-600" /> Dashboard
            </h1>
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="font-medium">{user.username}</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-red-400 flex items-center justify-center text-white font-bold">
                  {user.username?.[0]?.toUpperCase() || <UserCircle size={20} />}
                </div>
              </motion.div>
            )}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 p-5 rounded-xl shadow-sm"
            >
              <p className="text-sm text-gray-600">Courses in Progress</p>
              <h3 className="text-2xl font-bold text-blue-600">
                {overview?.in_progress || 0}
              </h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 p-5 rounded-xl shadow-sm"
            >
              <p className="text-sm text-gray-600">Courses Completed</p>
              <h3 className="text-2xl font-bold text-green-600">
                {overview?.completed || 0}
              </h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-orange-100 p-5 rounded-xl shadow-sm"
            >
              <p className="text-sm text-gray-600">Certificates</p>
              <h3 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                {overview?.certificates || 0} <GraduationCap size={20} />
              </h3>
            </motion.div>
          </div>

          {/* Courses List */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
            <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <BookOpen size={20} /> My Courses
            </h3>
            <div className="space-y-4">
              {courses.length > 0 ? (
                courses.map((c) => (
                  <motion.div
                    key={c.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
                        📚
                      </div>
                      <div>
                        <p className="font-medium">{c.title}</p>
                        <p className="text-xs text-gray-400">
                          Start Date:{" "}
                          {new Date(c.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 flex gap-6 text-sm text-gray-500">
                      <p>{c.progress || "0% Completed"}</p>
                      <p>{c.duration || "0h"}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No courses yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
