"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          {/* Container centré */}
          <div className="flex items-center justify-center w-full min-h-screen">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>

              {/* Contenu modal */}
              <h2 className="text-2xl font-bold mb-4 text-center">Authentification</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-lg px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="border rounded-lg px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
                >
                  Se connecter
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-600 text-center">
                Pas de compte ?{" "}
                <a href="#" className="text-blue-600 font-semibold">Inscrivez-vous</a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
