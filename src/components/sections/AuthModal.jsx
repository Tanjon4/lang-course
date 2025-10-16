"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LoginPage from "../authentification/Login";

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
              className="shadow-lg p-6 w-full max-w-md relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-black hover:text-red-500"
              >
                <X size={24} />
              </button>

              {/* Contenu modal */}
              <LoginPage/>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
