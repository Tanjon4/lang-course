"use client";

import { useState, useEffect } from "react";
import { Chapter } from "@/app/[lang]/dashboard/admin/chapters/types";

type Props = {
  initialData?: Chapter | null;
  onSave: (data: Partial<Chapter>) => void;
  onCancel: () => void;
};

export default function ChapterForm({ initialData, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [number, setNumber] = useState(initialData?.number || 1);
  const [description, setDescription] = useState(initialData?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'un délai pour l'animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({ title, number, description });
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
    // Attendre la fin de l'animation de sortie avant d'appeler onCancel
    setTimeout(() => onCancel(), 300);
  };

  return (
    <div className={`
      transform transition-all duration-300 ease-out
      ${isVisible 
        ? "translate-y-0 opacity-100 scale-100" 
        : "translate-y-4 opacity-0 scale-95"
      }
    `}>
      <form 
        onSubmit={handleSubmit} 
        className="p-6 border border-gray-200 rounded-xl space-y-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="space-y-2">
          <label className="font-semibold text-gray-700 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Numéro du chapitre
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            min={1}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-gray-700 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Titre du chapitre
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            placeholder="Entrez le titre du chapitre..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-gray-700 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
            placeholder="Décrivez le contenu de ce chapitre..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`
              flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105
              ${isSubmitting 
                ? "bg-green-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              }
              text-white shadow-md hover:shadow-lg
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Enregistrement...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Enregistrer</span>
              </div>
            )}
          </button>
          
          <button 
            type="button" 
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:from-gray-500 hover:to-gray-600 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Annuler</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

