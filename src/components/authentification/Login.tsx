import { Mail, Lock, LogIn } from 'lucide-react';
import React from 'react';

// --- Interface pour le composant ---
interface GlassLoginCardProps {
  // Ajoutez des props si vous voulez passer des gestionnaires d'état ou de soumission
}

// --- Le Composant de la Carte Glassmorphism ---
const GlassLoginCard: React.FC<GlassLoginCardProps> = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logique de connexion (simulée)
    console.log('Tentative de connexion...');
  };

  return (
    // Conteneur principal: Glassmorphism effect
    <div
      className="
        relative w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md 
        bg-white/10 border border-white/20
        transform transition-all duration-500
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
      "
    >
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center tracking-wider">
        E-learning
        <span className="block text-xl font-normal mt-1 text-orange-400">Login</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Champ Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
          <input
            type="email"
            placeholder="votre email ici"
            required
            className="
              w-full py-3 pl-12 pr-4 rounded-xl text-white bg-white/20 border border-white/30 
              placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50
              transition duration-300 ease-in-out
              shadow-inner
            "
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
          <input
            type="password"
            placeholder="votre mot de passe ici"
            required
            className="
              w-full py-3 pl-12 pr-4 rounded-xl text-white bg-white/20 border border-white/30 
              placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50
              transition duration-300 ease-in-out
              shadow-inner
            "
          />
        </div>

        {/* Lien Mot de passe oublié */}
        <div className="text-right">
          <a 
            href="#" 
            className="text-sm text-yellow-300/80 hover:text-yellow-200 transition duration-200"
          >
            mot de passe oublié ?
          </a>
        </div>

        {/* Bouton de connexion avec gradient */}
        <button
          type="submit"
          className="
            w-full flex items-center justify-center space-x-2 py-3 mt-8
            bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold 
            rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out
            transform hover:scale-[1.02] active:scale-[0.98]
          "
        >
          <LogIn className="h-5 w-5" />
          <span>Connexion</span>
        </button>
      </form>
    </div>
  );
};

// --- Le Composant Page d'Authentification (pour l'utiliser dans Next.js) ---
const LoginPage = () => {
    return (<GlassLoginCard />);
};

export default LoginPage;