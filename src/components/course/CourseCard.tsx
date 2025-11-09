// components/courses/CourseCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CourseGlobal } from '@/types/course';

interface CourseCardProps {
  course: CourseGlobal;
  onSelect: (course: CourseGlobal) => void;
  onEnroll: (courseId: number) => Promise<void>;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, onEnroll }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(getComputedStyle(descriptionRef.current).lineHeight);
      const maxHeight = lineHeight * 2 * 1.2;
      const isOverflowing = descriptionRef.current.scrollHeight > maxHeight;
      setIsOverflowing(isOverflowing);
    }
  }, [course.description]);

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullDescription(!showFullDescription);
  };

  const getLanguageFlag = (languageCode: string) => {
    const flags: { [key: string]: string } = {
      fr: '🇫🇷',
      en: '🇬🇧',
      es: '🇪🇸',
      de: '🇩🇪',
      it: '🇮🇹',
      pt: '🇵🇹',
      ru: '🇷🇺',
      ja: '🇯🇵',
      zh: '🇨🇳',
      ar: '🇸🇦'
    };
    return flags[languageCode] || '🌐';
  };

  const totalLessons = course.levels.reduce((total, level) => 
    total + level.chapters.reduce((chapTotal, chapter) => 
      chapTotal + chapter.lessons.length, 0
    ), 0
  );

  const totalLevels = course.levels.length;
  const languageFlag = getLanguageFlag(course.language_code);

  const handleEnroll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEnrolling) return;
    
    setIsEnrolling(true);
    try {
      await onEnroll(course.id);
    } catch (error: any) {
      console.error('❌ CourseCard: Enrollment failed:', error.message);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`group cursor-pointer transform transition-all duration-700 rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
        } hover:scale-105 hover:shadow-2xl`}
      onClick={() => onSelect(course)}
    >
      <div className="h-52 bg-gradient-to-br from-orange-200 via-red-300 to-amber-300 relative overflow-hidden flex items-center justify-center">
        <div className={`text-center text-white px-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl drop-shadow-lg animate-bounce-subtle">{languageFlag}</span>
            <span className="text-base font-semibold bg-amber-500 bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white border-opacity-30 animate-pulse-slow">
              {course.language_code.toUpperCase()}
            </span>
          </div>
          
          <h2 className="text-3xl font-bold leading-tight line-clamp-3 drop-shadow-lg max-w-2xl animate-fade-in-up">
            {course.title}
          </h2>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-10% to-transparent opacity-0 group-hover:opacity-10 group-hover:translate-x-full transition-all duration-1000" />
      </div>

      <div className={`p-6 bg-white transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="mb-6">
          <p 
            ref={descriptionRef}
            className={`text-gray-600 text-sm leading-relaxed transition-all duration-500 ${
              showFullDescription ? 'line-clamp-none' : 'line-clamp-3'
            }`}
          >
            {course.description}
          </p>
          
          {isOverflowing && (
            <button
              onClick={toggleDescription}
              className="mt-2 text-green-600 text-sm font-medium flex items-center gap-1 hover:text-red-500 transition-colors duration-300 animate-fade-in"
            >
              {showFullDescription ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Voir plus
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 animate-stagger-children">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md animate-slide-in-left">
            <BookOpen className="h-4 w-4 text-orange-500 animate-pulse" />
            <span className="text-gray-700 text-sm font-medium">{totalLessons} leçons</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md animate-slide-in-right">
            <Users className="h-4 w-4 text-amber-500 animate-pulse" />
            <span className="text-gray-700 text-sm font-medium">{totalLevels} niveaux</span>
          </div>
        </div>

        <button
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-500 flex items-center justify-center gap-3 animate-bounce-gentle
            bg-gradient-to-r from-green-500 to-emerald-300 hover:from-green-600 hover:to-emerald-400 text-white shadow-lg hover:shadow-xl hover:scale-105
            ${isEnrolling ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleEnroll}
          disabled={isEnrolling}
        >
          {isEnrolling ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span className="animate-pulse">Inscription...</span>
            </>
          ) : (
            <>
              <Star className="h-5 w-5 animate-bounce" />
              <span>Get Started</span>
            </>
          )}
        </button>
      </div>

      <style jsx global>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-in-left {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slide-in-right {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes bounce-gentle {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes bounce-subtle {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2px);
            }
          }

          @keyframes pulse-gentle {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }

          .animate-slide-in-left {
            animation: slide-in-left 0.5s ease-out;
          }

          .animate-slide-in-right {
            animation: slide-in-right 0.5s ease-out;
          }

          .animate-bounce-gentle {
            animation: bounce-gentle 2s;
          }

          .animate-bounce-subtle {
            animation: bounce-subtle 3s;
          }

          .animate-pulse-gentle {
            animation: pulse-gentle 2s;
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s;
          }

          .animate-stagger-children > *:nth-child(1) {
            animation-delay: 0.1s;
          }

          .animate-stagger-children > *:nth-child(2) {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
};

export default CourseCard;