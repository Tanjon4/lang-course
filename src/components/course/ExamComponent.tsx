"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Exam, Question } from "@/types/course";
import { CheckCircle, Clock, ChevronRight } from "lucide-react";

interface ExamComponentProps {
  exam: Exam;
  onFinish: (score: number) => void;
}

export default function ExamComponent({ exam, onFinish }: ExamComponentProps) {
  const [currentType, setCurrentType] = useState<"QCM" | "SHORT" | "ESSAY">("QCM");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(
    exam.duration ? exam.duration : 300 // default 5min
  );

  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  // Group questions by type
  const qcmQuestions = exam.questions.filter((q) => q.question_type === "QCM");
  const shortQuestions = exam.questions.filter((q) => q.question_type === "SHORT");
  const essayQuestions = exam.questions.filter((q) => q.question_type === "ESSAY");

  const currentQuestions = (() => {
    switch (currentType) {
      case "QCM":
        return qcmQuestions;
      case "SHORT":
        return shortQuestions;
      case "ESSAY":
        return essayQuestions;
    }
  })();

  const question = currentQuestions[currentIndex];

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(interval);

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // switch to next type
      if (currentType === "QCM" && shortQuestions.length > 0) {
        setCurrentType("SHORT");
        setCurrentIndex(0);
      } else if (currentType === "SHORT" && essayQuestions.length > 0) {
        setCurrentType("ESSAY");
        setCurrentIndex(0);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (timer) clearInterval(timer);
    const score = Math.floor(Math.random() * 100); // 👉 Placeholder score logic
    onFinish(score);
  };

  if (!question) {
    return (
      <div className="text-center py-10 text-gray-500">
        Aucun examen disponible pour ce niveau.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Examen : {exam.title} ({currentType})
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-blue-500" />
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {currentIndex + 1}. {question.text}
        </h3>

        {question.question_type === "QCM" && (
          <div className="space-y-2">
            {question.answers.map((ans) => (
              <label
                key={ans.id}
                className={`block p-3 border rounded-lg cursor-pointer transition ${
                  answers[question.id] === ans.text
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={ans.text}
                  checked={answers[question.id] === ans.text}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="mr-2"
                />
                {ans.text}
              </label>
            ))}
          </div>
        )}

        {question.question_type === "SHORT" && (
          <textarea
            className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Votre réponse courte ici..."
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        )}

        {question.question_type === "ESSAY" && (
          <textarea
            className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none h-40"
            placeholder="Rédigez votre réponse complète ici..."
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {currentIndex < currentQuestions.length - 1 ? (
            <>
              Suivant <ChevronRight size={18} />
            </>
          ) : currentType === "ESSAY" ? (
            <>
              Terminer <CheckCircle size={18} />
            </>
          ) : (
            <>
              Continuer <ChevronRight size={18} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
