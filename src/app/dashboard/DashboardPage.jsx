"use client"; // si tu es en App Router

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access"); // stocké au login
    if (!token) return;

    // Récupérer le profil utilisateur
    getMe(token)
      .then((data) => {
        setUser(data);
        // Ici tu pourras ensuite fetcher ses cours réels depuis ton API
        // ex: fetch("http://127.0.0.1:8000/api/courses/...")
        setCourses([
          { name: "Basic Algorithm", start: "27 Jan, 2023", progress: "10/25 (40%)", duration: "14h 38m 56s" },
          { name: "Web Development", start: "23 Feb, 2023", progress: "40/45 (97%)", duration: "36h 30m 00s" },
        ]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#efe9f7] p-6">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#fbf7ff] border-r border-[#efe7ff] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">e</div>
              <span className="text-lg font-semibold">e-learning</span>
            </div>

            <ul className="space-y-2">
              <li className="px-3 py-2 rounded-lg bg-[#efe6ff] text-[#5b3dd4] font-medium">Dashboard</li>
              <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">My Courses</li>
              <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">Messages</li>
            </ul>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {user && (
              <div className="flex items-center gap-2">
                <span>{user.username}</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-red-400 flex items-center justify-center text-white font-bold">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* My Courses */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">My Courses</h3>
            <div className="space-y-4">
              {courses.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center">📚</div>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-gray-400">Start Date: {c.start}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{c.progress}</p>
                  <p className="text-sm text-gray-500">{c.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
