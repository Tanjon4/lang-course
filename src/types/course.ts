// types/course.ts
export interface CourseGlobal {
  id: number;
  title: string;
  description: string;
  language_code: string;
  thumbnail_url?: string;
  levels: Level[];
  progress?: CourseProgress;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  order: number;
  course_global: number;
  chapters: Chapter[];
  progress?: {
    unlocked: boolean;
    completed: boolean;
    unlocked_at?: string;
  };
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  order: number;
  level: number;
  lessons: Lesson[];
  progress?: {
    unlocked: boolean;
    completed: boolean;
    unlocked_at?: string;
  };
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  video_url?: string;
  pdf_file?: string;
  duration?: number;
  order: number;
  chapter: number;
  is_published: boolean;
  published_at?: string;
  progress?: {
    unlocked: boolean;
    completed: boolean;
    time_spent: number;
    unlocked_at?: string;
    completed_at?: string;
    last_accessed?: string;
  };
}

export interface CourseProgress {
  enrolled: boolean;
  enrolled_at?: string;
  completed_course: boolean;
  course_completed_at?: string;
  progress_percentage: number;
  current_lesson?: number;
  time_spent: number;
  last_accessed?: string;
  unlocked: boolean;
}

export interface UserProgressOverview {
  total_courses: number;
  completed_courses: number;
  in_progress_courses: number;
  streak: number;
  total_time_spent: number;
  enrolled_courses: number[];
}