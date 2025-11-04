export interface Lesson {
  id: number;
  chapter: number;
  number: number;
  title: string;
  video_url?: string;
  pdf_file?: string;
  content?: string;
  duration?: string;
  order?: number;
  is_published: boolean;
  published_at?: string;
}
