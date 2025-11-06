// hooks/useCourses.ts
import { useState } from 'react';
import { courseService } from '@/services/courseService';
import { useAuth } from '@/app/contexts/AuthContext';

export const useCourses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, refreshToken, logout } = useAuth();

  const enrollToCourse = async (courseId: number): Promise<any> => {
    console.log('🎯 useCourses.enrollToCourse called for course:', courseId);

    if (!user) {
      throw new Error('Veuillez vous connecter pour vous inscrire à un cours');
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔄 Calling courseService.enroll...');
      const result = await courseService.enroll(courseId);
      console.log('✅ useCourses: Enrollment successful');
      return result;
    } catch (error: any) {
      console.error('❌ useCourses: Enrollment error:', error.message);
      
      // Si le token a expiré
      if (error.message === 'TOKEN_EXPIRED') {
        console.log('🔄 Token expired, attempting refresh...');
        try {
          await refreshToken();
          console.log('✅ Token refreshed, retrying enrollment...');
          const result = await courseService.enroll(courseId);
          return result;
        } catch (refreshError) {
          console.error('❌ Token refresh failed, logging out...');
          await logout();
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
      }
      
      // Autres erreurs
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { enrollToCourse, loading, error };
};