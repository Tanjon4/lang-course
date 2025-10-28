"use client";
import React from "react";
import Card from "./ui/Cards";
import { motion } from "framer-motion";

const members = [
  { name: "Alexandra Deff", task: "Working on Github Project Repository", status: "Completed" },
  { name: "Edwin Adenike", task: "Working on Integrate User Authentication System", status: "In Progress" },
  { name: "Isaac Oluwatemiroun", task: "Working on Develop Search and Filter Functionality", status: "Pending" },
  { name: "David Oshodi", task: "Working on Responsive Layout for Homepage", status: "In Progress" },
];

export default function TeamCollaboration() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Team Collaboration</div>
          <button className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-white/5">+ Add Member</button>
        </div>

        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.name} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fde8e8] to-[#c2f6d2] flex items-center justify-center text-sm font-medium text-black">
                {m.name.split(" ").map(s => s[0]).slice(0,2).join("")}
              </div>
              <div className="flex-1">
                <div className="font-medium">{m.name}</div>
                <div className="text-xs text-[var(--muted)]">{m.task}</div>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${m.status === "Completed" ? "bg-green-50 text-green-700" : m.status === "In Progress" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
