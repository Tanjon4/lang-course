// services/courseService.ts
import { CourseGlobal, Level, Chapter, Lesson, CourseProgress, UserProgressOverview } from '@/types/course';
import { authService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lang-courses-api.onrender.com/api';

class CourseService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = authService.getAccessToken();
    
    console.log('🔐 CourseService - Token:', token ? `Bearer ${token.substring(0, 20)}...` : 'No token');
    console.log('🚀 CourseService - Calling:', `${API_BASE_URL}${endpoint}`);

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    if (options.body) {
      config.body = options.body;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      console.log('📥 CourseService - Response status:', response.status);
      
      if (response.status === 401) {
        console.log('❌ CourseService - Token expired or invalid');
        throw new Error('TOKEN_EXPIRED');
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ CourseService - API error:', response.status, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      if (response.status === 204) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ CourseService - Fetch error:', error);
      throw error;
    }
  }

  // ✅ CORRESPOND AU BACKEND : /api/courses/{id}/enroll/
  async enroll(courseId: number): Promise<{status: string}> {
    console.log('🎯 CourseService.enroll called for course:', courseId);
    return this.fetchAPI(`/courses/${courseId}/enroll/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/courses/
  async getCourses(languageCode?: string): Promise<CourseGlobal[]> {
    const params = new URLSearchParams();
    if (languageCode) params.append('language_code', languageCode);
    
    const endpoint = `/courses/${params.toString() ? `?${params}` : ''}`;
    return this.fetchAPI(endpoint);
  }

  // ✅ CORRESPOND AU BACKEND : /api/courses/{id}/
  async getCourse(id: number): Promise<CourseGlobal> {
    return this.fetchAPI(`/courses/${id}/`);
  }

  // ✅ CORRESPOND AU BACKEND : /api/courses/{id}/complete/
  async completeCourse(courseId: number): Promise<{status: string}> {
    return this.fetchAPI(`/courses/${courseId}/complete/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/courses/{id}/progress/
  async getCourseProgress(courseId: number): Promise<CourseProgress> {
    return this.fetchAPI(`/courses/${courseId}/progress/`);
  }

  // ✅ CORRESPOND AU BACKEND : /api/levels/{id}/unlock/
  async unlockLevel(levelId: number): Promise<{status: string}> {
    return this.fetchAPI(`/levels/${levelId}/unlock/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/levels/{id}/complete/
  async completeLevel(levelId: number): Promise<{status: string, next_content_unlocked: boolean}> {
    return this.fetchAPI(`/levels/${levelId}/complete/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/chapters/{id}/unlock/
  async unlockChapter(chapterId: number): Promise<{status: string}> {
    return this.fetchAPI(`/chapters/${chapterId}/unlock/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/chapters/{id}/complete/
  async completeChapter(chapterId: number): Promise<{status: string, next_content_unlocked: boolean}> {
    return this.fetchAPI(`/chapters/${chapterId}/complete/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/lessons/{id}/unlock/
  async unlockLesson(lessonId: number): Promise<{status: string}> {
    return this.fetchAPI(`/lessons/${lessonId}/unlock/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/lessons/{id}/complete/
  async completeLesson(lessonId: number): Promise<{status: string, next_content_unlocked: boolean}> {
    return this.fetchAPI(`/lessons/${lessonId}/complete/`, { method: 'POST' });
  }

  // ✅ CORRESPOND AU BACKEND : /api/lessons/{id}/track-time/
  async trackLessonTime(lessonId: number, timeSpent: number): Promise<{status: string}> {
    return this.fetchAPI(`/lessons/${lessonId}/track-time/`, {
      method: 'POST',
      body: JSON.stringify({ time_spent: timeSpent }),
    });
  }

  // ✅ CORRESPOND AU BACKEND : /api/user-progress/overview/
  async getUserProgressOverview(): Promise<UserProgressOverview> {
    return this.fetchAPI('/progress/overview/');
  }

  // ✅ CORRESPOND AU BACKEND : /api/user-progress/streak/
  async getUserStreak(): Promise<{streak: number}> {
    return this.fetchAPI('/progress/streak/');
  }

  // ✅ MÉTHODE DE COMPATIBILITÉ
  async enrollInCourse(courseId: number): Promise<{status: string}> {
    console.log('⚠️ enrollInCourse is deprecated, use enroll instead');
    return this.enroll(courseId);
  }
}

export const courseService = new CourseService();