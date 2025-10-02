// import React from "react";

// export default function DashboardPage() {
//   const courses = [
//     { name: "Basic Algorithm", start: "27 Jan, 2023", progress: "10/25 (40%)", duration: "14h 38m 56s" },
//     { name: "Web Development", start: "23 Feb, 2023", progress: "40/45 (97%)", duration: "36h 30m 00s" },
//     { name: "Basic Data Science", start: "14 Jan, 2023", progress: "9/37 (40%)", duration: "37h 00m 00s" },
//     { name: "UI/UX Design", start: "19 Feb, 2023", progress: "28/32 (84%)", duration: "16h 40m 50s" },
//     { name: "Project Management", start: "27 Jan, 2023", progress: "14/18 (89%)", duration: "13h 20m 00s" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#efe9f7] p-6">
//       <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-[#fbf7ff] border-r border-[#efe7ff] p-6 flex flex-col justify-between">
//           <div>
//             {/* Logo */}
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">e</div>
//               <span className="text-lg font-semibold">e-learning</span>
//             </div>

//             {/* Nav */}
//             <ul className="space-y-2">
//               <li className="px-3 py-2 rounded-lg bg-[#efe6ff] text-[#5b3dd4] font-medium">Dashboard</li>
//               <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">My Courses</li>
//               <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">Messages</li>
//               <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">Lessons</li>
//               <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">Ebooks</li>
//               <li className="px-3 py-2 rounded-lg text-gray-600 hover:bg-[#f5f1ff]">Settings</li>
//             </ul>
//           </div>

//           {/* Mobile Download */}
//           <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 mt-8">
//             <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center">📱</div>
//             <div>
//               <p className="text-sm font-semibold">Edeze for Mobile</p>
//               <button className="mt-2 px-3 py-1 bg-indigo-500 text-white text-sm rounded-lg">Download Now</button>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
//             <div className="flex items-center gap-4">
//               <input type="text" placeholder="Search here..." className="border border-gray-200 rounded-lg px-3 py-2 w-64" />
//               <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">🔔</div>
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-red-400 flex items-center justify-center text-white font-bold">J</div>
//             </div>
//           </div>

//           {/* KPI Cards */}
//           <div className="mt-6 grid grid-cols-3 gap-4">
//             <div className="p-4 rounded-xl bg-[#eef6ff] shadow-sm flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-500">Course in Progress</p>
//                 <p className="text-2xl font-bold">18</p>
//               </div>
//               <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">📘</div>
//             </div>
//             <div className="p-4 rounded-xl bg-[#f4f0ff] shadow-sm flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-500">Course Completed</p>
//                 <p className="text-2xl font-bold">76</p>
//               </div>
//               <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">🏆</div>
//             </div>
//             <div className="p-4 rounded-xl bg-[#fff7ed] shadow-sm flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-gray-500">Certificates</p>
//                 <p className="text-2xl font-bold">26</p>
//               </div>
//               <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">🎖️</div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="mt-8 grid grid-cols-12 gap-6">
//             {/* Time Spending & Courses */}
//             <section className="col-span-8 space-y-6">
//               {/* Time Spending */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <h2 className="font-semibold">Time Spending</h2>
//                   <span className="text-sm border px-2 py-1 rounded">This Year</span>
//                 </div>
//                 <div className="mt-6 flex items-end gap-3 h-48">
//                   {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'].map((m,i)=>{
//                     const heights = [40,55,70,95,60,55,75,65,80];
//                     return (
//                       <div key={m} className="flex flex-col items-center gap-1">
//                         <div className="w-6 rounded-t-md" style={{height: `${heights[i]}%`, background: 'linear-gradient(180deg,#8b5cf6,#7c3aed)'}}></div>
//                         <span className="text-xs text-gray-400">{m}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Courses */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold">My Courses</h3>
//                   <a href="#" className="text-sm text-indigo-500">View All</a>
//                 </div>
//                 <div className="space-y-4">
//                   {courses.map((c)=>(
//                     <div key={c.name} className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-md bg-purple-50 flex items-center justify-center">📚</div>
//                         <div>
//                           <p className="font-medium">{c.name}</p>
//                           <p className="text-xs text-gray-400">Start Date: {c.start}</p>
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-500">{c.progress}</p>
//                       <p className="text-sm text-gray-500">{c.duration}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* Right Sidebar */}
//             <aside className="col-span-4 space-y-6">
//               {/* Calendar */}
//               <div className="bg-white rounded-xl p-4 shadow-sm">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-gray-500">Jan 2023</p>
//                   <p className="text-sm text-indigo-500">Today</p>
//                 </div>
//                 <div className="mt-4 grid grid-cols-7 gap-1 text-xs text-gray-400">
//                   {Array.from({length: 31}).map((_,i)=>(
//                     <div key={i} className="h-8 rounded flex items-center justify-center">{i+1}</div>
//                   ))}
//                 </div>
//               </div>

//               {/* Upcoming Schedule */}
//               <div className="bg-white rounded-xl p-4 shadow-sm">
//                 <h4 className="font-semibold mb-3">Upcoming Schedule</h4>
//                 <ul className="space-y-3">
//                   <li className="flex items-start gap-3">
//                     <div className="w-10 h-10 bg-purple-50 rounded-md flex items-center justify-center">🟣</div>
//                     <div>
//                       <p className="font-medium">Basic Algorithm</p>
//                       <p className="text-xs text-gray-400">27 Jan 2023, 03:00 PM</p>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-10 h-10 bg-yellow-50 rounded-md flex items-center justify-center">🟡</div>
//                     <div>
//                       <p className="font-medium">Machine Learning</p>
//                       <p className="text-xs text-gray-400">27 Jan 2023, 03:00 PM</p>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-10 h-10 bg-green-50 rounded-md flex items-center justify-center">🟢</div>
//                     <div>
//                       <p className="font-medium">Python</p>
//                       <p className="text-xs text-gray-400">27 Jan 2023, 03:00 PM</p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>

//               {/* Task Progress */}
//               <div className="bg-white rounded-xl p-4 shadow-sm">
//                 <h4 className="font-semibold mb-3">Task Progress</h4>
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-sm font-medium">Algorithm Design</p>
//                     <div className="w-full bg-gray-100 h-3 rounded mt-2">
//                       <div className="h-3 rounded bg-gradient-to-r from-purple-600 to-indigo-500" style={{width: '75%'}}></div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">App Development</p>
//                     <div className="w-full bg-gray-100 h-3 rounded mt-2">
//                       <div className="h-3 rounded bg-gradient-to-r from-yellow-400 to-red-400" style={{width: '45%'}}></div>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Website Translate</p>
//                     <div className="w-full bg-gray-100 h-3 rounded mt-2">
//                       <div className="h-3 rounded bg-gradient-to-r from-blue-400 to-blue-600" style={{width: '20%'}}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";

export default function DashboardPage() {
  const courses = [
    { id: 1, title: "Introduction to French", progress: 70, time: "2h 30m" },
    { id: 2, title: "Advanced English Grammar", progress: 40, time: "1h 10m" },
    { id: 3, title: "Spanish Basics", progress: 20, time: "50m" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4fc] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#faf8ff] border-r border-[#eee8ff] p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-8">LangLearn</h2>
            <nav className="space-y-4">
              <a href="#" className="flex items-center gap-3 text-purple-600 font-medium">
                📊 Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-purple-600">
                📚 My Courses
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-purple-600">
                🎓 Certificates
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-purple-600">
                ⚙️ Settings
              </a>
            </nav>
          </div>
          <button className="w-full py-2 mt-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              👤
            </div>
          </div>

          {/* KPI Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#eef6ff] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Course in Progress</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">📘</div>
            </div>
            <div className="p-6 rounded-xl bg-[#f4f0ff] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Course Completed</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">🏆</div>
            </div>
            <div className="p-6 rounded-xl bg-[#fff7ed] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Certificates</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center">🎖️</div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-xl p-6 shadow-sm mt-10 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">My Courses</h3>
              <a href="#" className="text-sm text-purple-600 hover:underline">
                View All →
              </a>
            </div>
            <div className="space-y-6">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-purple-50 flex items-center justify-center text-lg">
                      📚
                    </div>
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-xs text-gray-400">Language Learning</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <p className="font-semibold text-purple-600">{c.progress}%</p>
                    <p className="text-gray-500">{c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Spending */}
          <div className="bg-white rounded-xl p-6 shadow-sm mt-10 border border-gray-100">
            <h3 className="font-semibold text-lg mb-6">Time Spending</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-[#f9f7ff] shadow-sm">
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-2xl font-bold">6h 45m</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#fff5f2] shadow-sm">
                <p className="text-sm text-gray-500">Last Week</p>
                <p className="text-2xl font-bold">4h 20m</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#f2fbf7] shadow-sm">
                <p className="text-sm text-gray-500">Average</p>
                <p className="text-2xl font-bold">5h 30m</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

