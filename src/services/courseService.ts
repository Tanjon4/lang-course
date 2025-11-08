// services/courseService.ts
import { 
  CourseGlobal, Level, Chapter, Lesson, CourseProgress, UserProgressOverview,
  Exam, ExamResult, ExamSubmission, ExamResponse, Certificate 
} from '@/types/course';
import { authService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

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

  // === 🔹 COURSES ===

  async enroll(courseId: number): Promise<{status: string}> {
    console.log('🎯 CourseService.enroll called for course:', courseId);
    return this.fetchAPI(`/courses/${courseId}/enroll/`, { method: 'POST' });
  }

  async getCourses(languageCode?: string): Promise<CourseGlobal[]> {
    const params = new URLSearchParams();
    if (languageCode) params.append('language_code', languageCode);
    
    const endpoint = `/courses/${params.toString() ? `?${params}` : ''}`;
    return this.fetchAPI(endpoint);
  }

  async getCourse(id: number): Promise<CourseGlobal> {
    return this.fetchAPI(`/courses/${id}/`);
  }

  async completeCourse(courseId: number): Promise<{status: string}> {
    return this.fetchAPI(`/courses/${courseId}/complete/`, { method: 'POST' });
  }

  async getCourseProgress(courseId: number): Promise<CourseProgress> {
    return this.fetchAPI(`/courses/${courseId}/progress/`);
  }

  // === 🔹 LEVELS, CHAPTERS, LESSONS ===

  async unlockLevel(levelId: number): Promise<{status: string}> {
    return this.fetchAPI(`/levels/${levelId}/unlock/`, { method: 'POST' });
  }

  async completeLevel(levelId: number): Promise<{status: string, next_content_unlocked: boolean}> {
    return this.fetchAPI(`/levels/${levelId}/complete/`, { method: 'POST' });
  }

  async unlockChapter(chapterId: number): Promise<{status: string}> {
    return this.fetchAPI(`/chapters/${chapterId}/unlock/`, { method: 'POST' });
  }

  async completeChapter(chapterId: number): Promise<{status: string, next_content_unlocked: boolean}> {
    return this.fetchAPI(`/chapters/${chapterId}/complete/`, { method: 'POST' });
  }

  async unlockLesson(lessonId: number): Promise<{status: string}> {
    return this.fetchAPI(`/lessons/${lessonId}/unlock/`, { method: 'POST' });
  }

  async completeLesson(lessonId: number): Promise<{status: string, next_content_unlocked: boolean}> {
    return this.fetchAPI(`/lessons/${lessonId}/complete/`, { method: 'POST' });
  }

  async trackLessonTime(lessonId: number, timeSpent: number): Promise<{status: string}> {
    return this.fetchAPI(`/lessons/${lessonId}/track-time/`, {
      method: 'POST',
      body: JSON.stringify({ time_spent: timeSpent }),
    });
  }

  // === 🔹 PROGRESS ===

  async getUserProgressOverview(): Promise<UserProgressOverview> {
    return this.fetchAPI('/progress/overview/');
  }

  async getUserStreak(): Promise<{streak: number}> {
    return this.fetchAPI('/progress/streak/');
  }

  // === 🔹 EXAMS & CERTIFICATES ===

  /**
   * Récupérer tous les examens disponibles
   * GET /api/exams/
   */
  async getExams(): Promise<Exam[]> {
    console.log('🧠 Fetching all exams');
    return this.fetchAPI('/exams/');
  }

  /**
   * Récupérer un examen spécifique avec ses questions
   * GET /api/exams/{id}/
   */
  async getExam(examId: number): Promise<Exam> {
    console.log('📝 Fetching exam:', examId);
    return this.fetchAPI(`/exams/${examId}/`);
  }

  /**
   * Soumettre un examen complet
   * POST /api/exam-results/
   */
  async submitExam(
    examId: number, 
    responses: ExamResponse[]
  ): Promise<ExamResult> {
    console.log('📤 Submitting exam:', examId);
    
    const payload: ExamSubmission = {
      exam: examId,
      responses: responses
    };

    return this.fetchAPI('/exam-results/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Récupérer mes résultats d'examens
   * GET /api/exam-results/my_results/
   */
  async getMyExamResults(): Promise<ExamResult[]> {
    console.log('📊 Fetching my exam results');
    return this.fetchAPI('/exam-results/my_results/');
  }

  /**
   * Récupérer un résultat spécifique
   * GET /api/exam-results/{id}/
   */
  async getExamResult(resultId: number): Promise<ExamResult> {
    console.log('📄 Fetching exam result:', resultId);
    return this.fetchAPI(`/exam-results/${resultId}/`);
  }

  /**
   * Récupérer le certificat d'un résultat d'examen
   * GET /api/exam-results/{id}/certificate/
   */
  async getExamCertificate(resultId: number): Promise<Certificate> {
    console.log('🎓 Fetching certificate for result:', resultId);
    return this.fetchAPI(`/exam-results/${resultId}/certificate/`);
  }

  /**
   * Récupérer tous mes certificats
   * GET /api/certificates/
   */
  async getMyCertificates(): Promise<Certificate[]> {
    console.log('🏆 Fetching my certificates');
    return this.fetchAPI('/certificates/');
  }

  /**
   * Alternative pour récupérer mes certificats
   * GET /api/certificates/my_certificates/
   */
  async getMyCertificatesAlt(): Promise<Certificate[]> {
    console.log('🏆 Fetching my certificates (alternative endpoint)');
    return this.fetchAPI('/certificates/my_certificates/');
  }

  /**
   * Récupérer un certificat spécifique
   * GET /api/certificates/{id}/
   */
  async getCertificate(certificateId: number): Promise<Certificate> {
    console.log('📜 Fetching certificate:', certificateId);
    return this.fetchAPI(`/certificates/${certificateId}/`);
  }

  // === 🔹 MÉTHODES DE COMPATIBILITÉ ===

  async enrollInCourse(courseId: number): Promise<{status: string}> {
    console.log('⚠️ enrollInCourse is deprecated, use enroll instead');
    return this.enroll(courseId);
  }

  /**
   * @deprecated Utiliser getExam() à la place
   */
  async getExamByLesson(lessonId: number): Promise<any> {
    console.log('⚠️ getExamByLesson is deprecated, use getExam() instead');
    return this.fetchAPI(`/lessons/${lessonId}/exam/`);
  }

  /**
   * @deprecated Utiliser getExam() à la place (les questions sont incluses)
   */
  async getQuestionsByExam(examId: number): Promise<any[]> {
    console.log('⚠️ getQuestionsByExam is deprecated, use getExam() instead');
    return this.fetchAPI(`/exams/${examId}/questions/`);
  }

  /**
   * @deprecated Utiliser submitExam() à la place
   */
  async submitExamAnswers(
    examId: number,
    answers: { question_id: number; answer_text?: string; selected_option?: number }[]
  ): Promise<{ score: number; passed: boolean; certificate_url?: string }> {
    console.log('⚠️ submitExamAnswers is deprecated, use submitExam() instead');
    
    // Conversion du format ancien vers nouveau format
    const responses: ExamResponse[] = answers.map(answer => ({
      question: answer.question_id,
      selected_answers: answer.selected_option ? [answer.selected_option] : undefined,
      text_response: answer.answer_text
    }));

    const result = await this.submitExam(examId, responses);
    
    return {
      score: result.score,
      passed: result.passed,
      certificate_url: undefined // À adapter si nécessaire
    };
  }

  /**
   * @deprecated Utiliser getMyCertificates() à la place
   */
  async getCertificates(userId: number): Promise<any[]> {
    console.log('⚠️ getCertificates is deprecated, use getMyCertificates() instead');
    return this.fetchAPI(`/certificates/${userId}/`);
  }
}

export const courseService = new CourseService();