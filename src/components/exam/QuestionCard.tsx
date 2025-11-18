// /components/QuestionCard.tsx
import { FC, useState, useEffect, useMemo } from "react";
import { Question } from "../../data/quizData";

type Props = {
  question: Question;
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  type: "qcm" | "input";
};

const QuestionCard: FC<Props> = ({ question, userAnswer, setUserAnswer, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [question]);

  const handleOptionClick = (opt: string) => {
    setSelectedOption(opt);
    setTimeout(() => {
      setUserAnswer(opt);
      setSelectedOption(null);
    }, 300);
  };

  const animationStyles = useMemo(() => ({
    grow: {
      animation: 'grow 0.8s ease-out forwards'
    },
    pingScale: {
      animation: 'ping-scale 1s ease-in-out infinite'
    },
    pulseScale: {
      animation: 'pulse-scale 0.3s ease-in-out'
    },
    cardShadow: {
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.05)'
    },
    selectedShadow: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    defaultShadow: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }
  }), []);

  return (
    <div 
      className={`
        p-8 bg-white rounded-2xl mb-8 
        transform transition-all duration-700 ease-out
        border border-gray-100
        hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.15),0_0_25px_rgba(0,0,0,0.08)]
        ${isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
        }
      `}
      style={animationStyles.cardShadow}
    >
      {/* Question Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
        <div 
          className="mt-2 h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform origin-left transition-all duration-1000"
          style={animationStyles.grow}
        ></div>
      </div>

      {/* QCM Options */}
      {type === "qcm" && question.options && (
        <div className="flex flex-wrap gap-4 justify-center">
          {question.options.map((opt, index) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`
                flex-1 min-w-[200px] max-w-[300px] p-5 rounded-xl 
                transition-all duration-500 ease-out transform
                border-2 text-left relative overflow-hidden
                hover:scale-105
                ${userAnswer === opt 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-transparent scale-105' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:shadow-lg'
                }
              `}
              style={{
                ...(userAnswer === opt ? animationStyles.selectedShadow : animationStyles.defaultShadow),
                ...(selectedOption === opt ? animationStyles.pulseScale : {})
              }}
            >
              {/* Background shimmer effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                transform -skew-x-12 transition-all duration-1000
                ${userAnswer === opt ? 'opacity-20' : 'opacity-0'}
              `}></div>
              
              {/* Option content */}
              <div className="relative z-10">
                <span className="text-lg font-medium leading-relaxed">
                  {opt}
                </span>
              </div>

              {/* Selection indicator */}
              {userAnswer === opt && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div 
                    className="w-3 h-3 bg-indigo-500 rounded-full"
                    style={animationStyles.pingScale}
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      {type === "input" && (
        <div className="relative group">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="
              w-full p-5 border-2 border-gray-200 rounded-xl 
              focus:outline-none focus:ring-4 focus:ring-indigo-100 
              focus:border-indigo-400 transition-all duration-300
              text-lg font-medium bg-gray-50
              hover:bg-white hover:border-gray-300
              placeholder:text-gray-400
            "
          />
          {/* Input focus effect */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
            style={{
              width: userAnswer ? '100%' : '0%',
              opacity: userAnswer ? 1 : 0
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;