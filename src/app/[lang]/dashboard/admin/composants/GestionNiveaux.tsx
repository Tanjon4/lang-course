import React from "react";

export default function GestionCours() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Gestion des Cours</h2>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Ajouter un cours
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Modifier un cours
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Supprimer un cours
        </button>
      </div>
      {/* Ici tu pourras ajouter la liste des cours */}
      <div className="p-4 border rounded-lg mt-4 bg-white dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-300">Liste des cours ici...</p>
      </div>
    </div>
  );
}
