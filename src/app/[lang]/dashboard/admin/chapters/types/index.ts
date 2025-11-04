// src/types/index.ts

export interface Course {
  id: number;
  title: string;
}

export interface Level {
  id: number;
  number: number;
  title: string;
  course: number; // id du cours
}

export interface Chapter {
  id: number;
  level: number; // id du level
  number: number;
  title: string;
  description: string;
}
