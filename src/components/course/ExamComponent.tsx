// /pages/quiz.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "@/components/exam/QuestionCard";
import ProgressBar from "@/components/exam/ProgressBar";
import Certificate from "@/components/exam/Certificate";
import { qcmQuestions, inputQuestions } from "@/data/quizData";
import { useAuth } from "@/app/contexts/AuthContext";

export default function QuizPage() {
  const [phase, setPhase] = useState<"qcm" | "input" | "finished">("qcm");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user) {
        router.push('/auth/login');
        return;
      }
      setTimeout(() => setIsLoading(false), 800);
    }
  }, [isAuthenticated, user, loading, router]);

  const handleNext = () => {
    const currentQuestion = phase === "qcm" ? qcmQuestions[currentIndex] : inputQuestions[currentIndex];
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) setScore(score + 1);

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer("");

      const nextIndex = currentIndex + 1;
      const currentArray = phase === "qcm" ? qcmQuestions : inputQuestions;

      if (nextIndex < currentArray.length) setCurrentIndex(nextIndex);
      else {
        if (phase === "qcm") {
          setPhase("input");
          setCurrentIndex(0);
        } else setPhase("finished");
      }
    }, 1200);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5, repeat: Infinity } }}
            className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 font-medium"
          >
            Vérification de l'authentification...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl sm:text-3xl">⏳</span>
          </div>
          <p className="text-base sm:text-lg text-gray-600">Redirection en cours...</p>
        </motion.div>
      </div>
    );
  }

  if (phase === "finished") {
    const total = qcmQuestions.length + inputQuestions.length;
    return <Certificate score={score} total={total} />;
  }

  const currentArray = phase === "qcm" ? qcmQuestions : inputQuestions;
  const progress = ((currentIndex + 1) / currentArray.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl sm:max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
        >
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base"
              >
                {user.email?.charAt(0).toUpperCase()}
              </motion.div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Connecté en tant que</p>
                <p className="font-semibold text-gray-800 truncate max-w-[150px] sm:max-w-[200px]">{user.email}</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg"
            >
              {phase === "qcm" ? "QCM" : "Questions écrites"}
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Question {currentIndex + 1} sur {currentArray.length}
            </span>
            <span className="text-xs sm:text-sm font-bold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${phase}-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionCard
              question={currentArray[currentIndex]}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              type={phase}
            />
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className={`p-6 sm:p-8 rounded-2xl shadow-2xl ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                    : 'bg-gradient-to-r from-red-400 to-pink-500'
                } text-white text-center z-10 max-w-xs sm:max-w-md`}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                >
                  {isCorrect ? "🎉" : "💡"}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  {isCorrect ? "Bonne réponse !" : "Presque !"}
                </h3>
                <p className="text-sm sm:text-lg opacity-90">
                  {isCorrect ? "Continuez comme ça !" : "La bonne réponse était : " + 
                    (phase === "qcm" 
                      ? qcmQuestions[currentIndex]?.answer 
                      : inputQuestions[currentIndex]?.answer)}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          disabled={!userAnswer.trim() || showFeedback}
          whileHover={!userAnswer.trim() || showFeedback ? {} : { scale: 1.02, boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)" }}
          whileTap={!userAnswer.trim() || showFeedback ? {} : { scale: 0.98 }}
          className={`mt-6 sm:mt-8 w-full py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 ${
            !userAnswer.trim() || showFeedback
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          <motion.span
            animate={!userAnswer.trim() || showFeedback ? {} : { x: [0, 5, 0] }}
            transition={{ x: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } }}
            className="flex items-center justify-center"
          >
            {currentIndex === currentArray.length - 1 
              ? phase === "qcm" 
                ? "Passer aux questions écrites →" 
                : "Terminer le quiz 🎯"
              : "Question suivante →"
            }
          </motion.span>
        </motion.button>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 sm:mt-6 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-sm">
            <span className="text-xs sm:text-sm text-gray-600">Score actuel :</span>
            <span className="font-bold text-indigo-600">{score}</span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-indigo-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}