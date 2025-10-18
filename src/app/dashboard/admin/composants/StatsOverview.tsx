"use client";

import React from "react";
import { People, School, AssignmentTurnedIn, MonetizationOn } from "@mui/icons-material";

export default function StatsOverview({ stats }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
      <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-300">Utilisateurs actifs</span>
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.utilisateursActifs ?? 0}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900">
            <People className="text-blue-600 dark:text-blue-300" />
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Utilisateurs en ligne et récemment actifs
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-300">Cours publiés</span>
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.coursPublies ?? 0}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900">
            <School className="text-indigo-600 dark:text-indigo-300" />
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Cours disponibles pour les étudiants
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-300">Inscriptions récentes</span>
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              {stats.inscriptionsRecentes ?? 0}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900">
            <AssignmentTurnedIn className="text-emerald-600 dark:text-emerald-300" />
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Inscriptions sur la période récente
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-300">Revenu total</span>
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
                stats.revenuTotal ?? 0
              )}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900">
            <MonetizationOn className="text-yellow-600 dark:text-yellow-300" />
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {stats.tauxCompletion ?? "0%"} taux de complétion moyen
        </div>
      </div>
    </div>
  );
}
