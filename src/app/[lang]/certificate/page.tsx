"use client";

import { useRouter } from "next/navigation";
import { Award, ArrowRight } from "lucide-react";

export default function CertificatePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-center p-6">
      <Award className="text-yellow-500 mb-4" size={64} />
      <h1 className="text-3xl font-bold mb-2">Félicitations ! 🎉</h1>
      <p className="text-gray-600 mb-6">
        Vous avez réussi votre examen. Votre certificat est maintenant disponible.
      </p>
      <button
        onClick={() => router.push("/fr/courses")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2"
      >
        Continuer vers le niveau suivant <ArrowRight size={18} />
      </button>
    </main>
  );
}
