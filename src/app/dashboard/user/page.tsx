'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiHome, FiBook, FiMessageSquare, FiCalendar, FiBarChart2, FiSettings, FiUser, FiBell, FiSearch } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';

// Hook pour récupérer l'utilisateur connecté
function useUser() {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    fetch('https://lang-courses-api.onrender.com/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUser)
      .catch(err => console.error(err));
  }, []);

  return user;
}

// Hook pour récupérer les données du dashboard
function useDashboardData() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    fetch('https://lang-courses-api.onrender.com/api/user/dashboard/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  return data;
}

export default function Dashboard() {
  const user = useUser();
  const dashboard = useDashboardData();
  const router = useRouter();

  const progress = dashboard?.stats?.lessons_completed ?? 0;

  const cards = [
    {
      title: "My Progress",
      value: `${progress}%`,
      icon: <FaTrophy className="text-3xl text-[#4A76A8]" />,
      onClick: () => router.push('/dashboard/progress')
    },
    {
      title: "Assignments",
      value: dashboard?.recent_activities?.length ?? 0,
      icon: <FiBook className="text-3xl text-[#4A76A8]" />,
      onClick: () => router.push('/dashboard/assignments')
    },
    {
      title: "Recent Sessions",
      value: dashboard?.recent_activities?.slice(0,3).map(a => a.type).join(', ') || 'None',
      icon: <FiCalendar className="text-3xl text-[#4A76A8]" />,
      onClick: () => router.push('/dashboard/sessions')
    },
    {
      title: "Performance",
      value: `${progress}%`,
      icon: <FiBarChart2 className="text-3xl text-[#4A76A8]" />,
      onClick: () => router.push('/dashboard/performance')
    },
    {
      title: "Achievements",
      value: dashboard?.learning_streak ?? 0,
      icon: <FiUser className="text-3xl text-[#4A76A8]" />,
      onClick: () => router.push('/dashboard/attendance')
    },
    {
      title: "Certificate",
      value: dashboard?.learning_streak ?? 0,
      icon: <FiUser className="text-3xl text-[#4A76A8]" />,
      onClick: () => router.push('/dashboard/certificate')
    },
  ];

  const container = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };

  return (
    <div className="flex h-screen bg-[#F5F7FA] text-[#333333]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 bg-[#1A2F50] text-white flex flex-col items-center py-6 space-y-8"
      >
        <h1 className="text-2xl font-bold">JS</h1>
        <nav className="flex flex-col space-y-6 text-xl">
          <FiHome className="hover:text-[#4A76A8] cursor-pointer"/>
          <FiBook className="hover:text-[#4A76A8] cursor-pointer" />
          <FiMessageSquare className="hover:text-[#4A76A8] cursor-pointer" />
          <FiCalendar className="hover:text-[#4A76A8] cursor-pointer" />
          <FiBarChart2 className="hover:text-[#4A76A8] cursor-pointer" />
          <FiSettings className="hover:text-[#4A76A8] cursor-pointer" />
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center space-x-3 bg-[#FFFFFF] rounded-full shadow px-4 py-2 w-1/3">
            <FiSearch className="text-gray-400" />
            <input type="text" placeholder="Search" className="w-full outline-none text-sm text-[#333333] bg-transparent"/>
          </div>
          <div className="flex items-center space-x-6">
            <FiBell className="text-xl text-[#333333] cursor-pointer" />
            <motion.img
              src={`https://i.pravatar.cc/40?u=${user?.username}`}
              alt="Profile"
              className="rounded-full w-10 h-10"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.header>

        {/* Greeting Section */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-[#FFFFFF] shadow rounded-2xl p-6 mb-6 flex justify-between items-center"
        >
          <div>
            <h2 className="text-2xl font-bold text-[#1A2F50]">Hello {user?.first_name ?? 'User'}</h2>
            <p className="text-[#555555] mt-2">
              You have {dashboard?.recent_activities?.length ?? 0} new tasks. Keep learning!
            </p>
            <motion.button whileHover={{ scale: 1.05 }} className="mt-4 bg-[#4A76A8] text-white px-5 py-2 rounded-lg shadow">
              Review It
            </motion.button>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="Task Illustration" className="w-32 h-32"/>
        </motion.section>

        {/* Stats Section */}
        <motion.section variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={card.onClick}
              className="cursor-pointer bg-[#FFFFFF] p-6 rounded-2xl shadow flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-3">
                {card.icon}
                <h3 className="font-semibold text-lg text-[#333333]">{card.title}</h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                {card.title === "Performance" ? (
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-gray-200 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      <path className="text-[#4A76A8] stroke-current" strokeWidth="3" strokeDasharray={`${progress},100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">{progress}%</span>
                  </div>
                ) : (
                  <p className="text-[#555555] text-sm text-center">{card.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </div>
  );
}
