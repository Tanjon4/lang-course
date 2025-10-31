import { LoginData, RegisterData, AuthResponse, User, ApiError, ResetPasswordData } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Configuration par défaut
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si disponible
    // Vérification de l'existence de localStorage (pour compatibilité SSR)
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken');
    }
    
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      // Vérifier si la réponse est vide (204 No Content)
      const contentType = response.headers.get('content-type');
      let data;
      
      if (response.status !== 204 && contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = {};
      }

      if (!response.ok) {
        const errorMessage = data.error || data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
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
    return this.request<AuthResponse>('/users/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me/');
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    return this.request<{ access: string }>('/users/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/users/forgot-password/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, data: ResetPasswordData): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/users/reset-password/${token}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    // Correction : utilisation correcte des paramètres de requête
    return this.request<{ message: string }>(`/users/verify-email/?token=${token}`, {
      method: 'GET',
    });
  }

  async firebaseAuth(idToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/users/firebase/', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
  }

  // Méthode utilitaire pour gérer le stockage du token
  setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  // Méthode utilitaire pour récupérer le token
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  // Méthode utilitaire pour supprimer le token
  removeAccessToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }
}

export const authService = new AuthService();