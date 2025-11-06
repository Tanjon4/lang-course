// components/courses/CourseCard.tsx
import React, { useState } from 'react';
import {
  PlayCircle,
  Lock,
  CheckCircle,
  Clock,
  Users,
  Star,
} from 'lucide-react';
import { CourseGlobal } from '@/types/course';

interface CourseCardProps {
  course: CourseGlobal;
  onSelect: (course: CourseGlobal) => void;
  onEnroll: (courseId: number) => Promise<void>;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, onEnroll }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const progress = course.progress;
  const isEnrolled = progress?.enrolled;
  const isCompleted = progress?.completed_course;
  const progressPercentage = progress?.progress_percentage || 0;

  const getStatusColor = () => {
    if (isCompleted) return 'bg-green-100 text-green-800 border-green-200';
    if (isEnrolled) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Terminé';
    if (isEnrolled) return 'En cours';
    return 'Non commencé';
  };

  const totalLessons = course.levels.reduce((total, level) => 
    total + level.chapters.reduce((chapTotal, chapter) => 
      chapTotal + chapter.lessons.length, 0
    ), 0
  );

  const totalLevels = course.levels.length;

  const handleEnroll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isEnrolling) return;
    
    setIsEnrolling(true);
    console.log('🎯 CourseCard: Starting enrollment for course', course.id);
    
    try {
      await onEnroll(course.id);
      console.log('✅ CourseCard: Enrollment successful');
    } catch (error: any) {
      console.error('❌ CourseCard: Enrollment failed:', error.message);
      alert(`Erreur: ${error.message}`);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white"
      onClick={() => onSelect(course)}
    >
      {/* Course Image */}
      <div className="h-48 bg-linear-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-green-500 ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 rounded-full text-sm font-semibold text-white  bg-orange-400 bg-opacity-20">
            {course.language_code.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-6 bg-white">
        {/* Course Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Progress Bar */}
        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm font-medium">Progression</span>
              <span className="text-indigo-600 text-sm font-bold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 text-sm">{totalLessons} leçons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 text-sm">{totalLevels} niveaux</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
            isEnrolled 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl' 
              : isEnrolling
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
          }`}
          onClick={handleEnroll}
          disabled={isEnrolling}
        >
          {isEnrolling ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Inscription...</span>
            </>
          ) : isEnrolled ? (
            <>
              <PlayCircle className="h-5 w-5" />
              <span>{isCompleted ? 'Revoir' : 'Continuer'}</span>
            </>
          ) : (
            <>
              <Star className="h-5 w-5" />
              <span>Commencer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;