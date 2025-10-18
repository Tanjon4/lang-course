"use client";

import React from "react";

export default function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Section placeholder — contenu à implémenter selon les besoins.
      </p>
    </div>
  );
}
