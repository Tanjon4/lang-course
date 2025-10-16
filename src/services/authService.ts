import { LoginData, RegisterData, AuthResponse, User, ApiError } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur réseau est survenue');
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me/');
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    return this.request<{ access: string }>('/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/forgot-password/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, data: ResetPasswordData): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/auth/reset-password/${token}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/verify-email/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, `?token=${token}`);
  }

  async firebaseAuth(idToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/firebase/', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
  }
}

export const authService = new AuthService();