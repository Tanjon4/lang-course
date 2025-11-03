// src/app/[lang]/dashboard/admin/types.ts
export interface Level {
  id?: number;
  title: string;
  number: number;
  order: number;
  description: string;
  course: number; // ID du cours
  course_title?: string; // pour affichage
  is_published: boolean;
}
