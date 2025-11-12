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
  number:number;
  course_global: number;
  chapters: Chapter[];
  progress?: {
    unlocked: boolean;
    completed: boolean;
    unlocked_at?: string;
  };
  exam?: Exam; // ← Fanampiny: examen associé au level
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  order: number;
  number:number;
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
  number:number;
  video_url?: string;
  pdf_file?: string;
  duration?: number;
  order: number;
  chapter: number;
  completed: boolean;
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

// === EXAM STRUCTURE ===

export interface Exam {
  id: number;
  level: number; // Level ID
  title: string;
  description?: string;
  duration?: number; // in seconds
  total_points: number;
  passing_score: number;
  is_published: boolean;
  questions: Question[];
  level_name?: string; // ← Fanampiny: nom du level
  created_at?: string;
  updated_at?: string;
}

export type QuestionType = "QCM" | "SHORT" | "ESSAY";

export interface Question {
  id: number;
  exam: number;
  text: string;
  weight: number;
  order: number;
  question_type: QuestionType;
  answers: Answer[];
}

export interface Answer {
  id: number;
  question: number;
  text: string;
  is_correct: boolean;
  order: number;
}

// === EXAM SUBMISSION ===

export interface ExamResponse {
  question: number; // Question ID
  selected_answers?: number[]; // Pour QCM - Array de Answer IDs
  text_response?: string;      // Pour SHORT/ESSAY
}

export interface ExamSubmission {
  exam: number; // Exam ID
  responses: ExamResponse[];
}

// === RESULTS & CERTIFICATE ===

export interface ExamResult {
  id: number;
  user: number;
  exam: number;
  exam_details?: Exam; // ← Fanampiny: détail de l'exam
  score: number;
  passed: boolean;
  taken_at: string;
  responses?: ExamResponseDetail[]; // ← Fanampiny: réponses détaillées
}

export interface ExamResponseDetail {
  id: number;
  question: Question;
  selected_answers: Answer[];
  text_response: string;
  is_correct: boolean;
}

export interface Certificate {
  id: number;
  user: number;
  level: number;
  level_details?: Level; // ← Fanampiny: détail du level
  level_name?: string;   // ← Fanampiny
  user_name?: string;    // ← Fanampiny
  score: number;
  mention: string;
  issued_at: string;
}