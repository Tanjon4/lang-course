import { LoginData, RegisterData, AuthResponse, User, ApiError, ResetPasswordData } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lang-courses-api.onrender.com/api';

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Récupérez le token
    const token = this.getAccessToken();
    console.log('🔐 Token for request:', token ? `Bearer ${token.substring(0, 20)}...` : 'No token');

    // Créez les headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    // Ajoutez l'Authorization
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    console.log('🚀 Making request to:', url);
    console.log('📋 Request method:', config.method);

    try {
      const response = await fetch(url, config);
      
      console.log('📥 Response status:', response.status);

      const contentType = response.headers.get('content-type');
      let data;
      
      if (response.status !== 204 && contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = {};
      }

      if (!response.ok) {
        const errorMessage = data.detail || data.error || data.message || `HTTP error! status: ${response.status}`;
        console.error('❌ Request failed:', errorMessage);
        throw new Error(errorMessage);
      }

      console.log('✅ Request successful');
      return data;
    } catch (error) {
      console.error('❌ Request error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur réseau est survenue');
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    console.log('🔑 Attempting login...');
    const response = await this.request<AuthResponse>('/users/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log('✅ Login successful');
    return response;
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    console.log('👤 Attempting registration...');
    return this.request<{ message: string }>('/users/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    console.log('🚪 Attempting logout...');
    return this.request<{ message: string }>('/users/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async getCurrentUser(): Promise<User> {
    console.log('👤 Fetching current user...');
    const user = await this.request<User>('/users/me/');
    console.log('✅ Current user fetched');
    return user;
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    console.log('🔄 Attempting token refresh...');
    const response = await this.request<{ access: string }>('/users/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
    console.log('✅ Token refreshed successfully');
    return response;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    console.log('📧 Sending forgot password request...');
    return this.request<{ message: string }>('/users/forgot-password/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, data: ResetPasswordData): Promise<{ message: string }> {
    console.log('🔄 Attempting password reset...');
    return this.request<{ message: string }>(`/users/reset-password/${token}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    console.log('📧 Verifying email...');
    return this.request<{ message: string }>(`/users/verify-email/?token=${token}`, {
      method: 'GET',
    });
  }

  async firebaseAuth(idToken: string): Promise<AuthResponse> {
    console.log('🔥 Firebase authentication...');
    return this.request<AuthResponse>('/users/firebase/', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
  }

  // Méthode utilitaire pour gérer le stockage du token
  setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
      const cleanToken = token.trim();
      localStorage.setItem('accessToken', cleanToken);
      console.log('💾 Access token stored in localStorage');
    }
  }

  // Méthode utilitaire pour récupérer le token
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      return token;
    }
    return null;
  }

  // Méthode utilitaire pour supprimer le token
  removeAccessToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      console.log('🗑️ Access token removed from localStorage');
    }
  }

  // Méthode pour stocker le refresh token
  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      const cleanToken = token.trim();
      localStorage.setItem('refreshToken', cleanToken);
      console.log('💾 Refresh token stored in localStorage');
    }
  }

  // Méthode pour récupérer le refresh token
  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  // Méthode pour supprimer tous les tokens
  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      console.log('🧹 All tokens cleared from localStorage');
    }
  }
}

export const authService = new AuthService();