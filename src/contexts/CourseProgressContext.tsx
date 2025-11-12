// src/contexts/CourseProgressContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CourseGlobal, Level, Chapter, Lesson } from '@/types/course';
import { courseService } from '@/services/courseService';

interface CourseProgressContextType {
  currentCourse: CourseGlobal | null;
  refreshCourseData: () => Promise<void>;
  markLessonAsCompleted: (lessonId: number) => Promise<void>;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export function CourseProgressProvider({ 
  children,
  initialCourseId 
}: { 
  children: React.ReactNode;
  initialCourseId?: number;
}) {
  const [currentCourse, setCurrentCourse] = useState<CourseGlobal | null>(null);

  const refreshCourseData = async () => {
    if (!initialCourseId) return;
    
    try {
      console.log('🔄 CourseProgressContext - Refreshing course data');
      const courseData = await courseService.getCourse(initialCourseId);
      setCurrentCourse(courseData);
    } catch (error) {
      console.error('❌ CourseProgressContext - Error refreshing course data:', error);
    }
  };

  const markLessonAsCompleted = async (lessonId: number) => {
    try {
      console.log('✅ CourseProgressContext - Marking lesson as completed:', lessonId);
      await courseService.completeLesson(lessonId);
      await refreshCourseData(); // Refresh après complétion
    } catch (error) {
      console.error('❌ CourseProgressContext - Error marking lesson as completed:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (initialCourseId) {
      refreshCourseData();
    }
  }, [initialCourseId]);

  return (
    <CourseProgressContext.Provider value={{
      currentCourse,
      refreshCourseData,
      markLessonAsCompleted
    }}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};