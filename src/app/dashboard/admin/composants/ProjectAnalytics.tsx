"use client";
import React from "react";
import Card from "../composants/ui/Cards";
import { motion } from "framer-motion";

/* Very simple mock of the bar-visual present in image */
export default function ProjectAnalytics() {
  const days = ["S","M","T","W","T","F","S"];
  const heights = [45, 74, 92, 98, 66, 64, 30];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium">Project Analytics</div>
            <div className="text-xs text-[var(--muted)]">Activity by day</div>
          </div>
          <div className="text-xs text-[var(--muted)]">24% Weekly high</div>
        </div>

        <div className="flex items-end gap-3 h-32">
          {heights.map((h, i) => (
            <div key={i} className="flex flex-col items-center">
              <div style={{height: `${h}px`, width: 28}} className={`rounded-full ${i===3 ? "bg-gradient-to-br from-[#0a8a40] to-[#6fbf82]" : "bg-green-100/70"} overflow-hidden`}></div>
              <div className="text-xs mt-2 text-[var(--muted)]">{days[i]}</div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
