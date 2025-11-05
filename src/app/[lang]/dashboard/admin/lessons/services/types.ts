export interface Course {
  id: number;
  title: string;
}

export interface Level {
  id: number;
  title: string;
  course: number;
}

export interface Chapter {
  id: number;
  title: string;
  level: number;
}

export interface Lesson {
  id: number;
  chapter: number;
  number: number;
  title: string;
  video_url?: string;
  pdf_file?: string;
  content?: string;
  is_published: boolean;
}
