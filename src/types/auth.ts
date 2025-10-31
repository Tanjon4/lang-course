// types/auth.ts
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  is_email_verified: boolean;
  provider?: string;
  date_joined?: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
  created?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

// ✅ ResetPasswordData
export interface ResetPasswordData {
  password: string;
  password2: string;
  token?: string;
}

// ✅ ApiError
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

// ✅ AuthState
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshTokenValue: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
}

// ✅ Types supplémentaires utiles pour l'authentification
export interface RefreshTokenData {
  refresh: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface FirebaseAuthData {
  id_token: string;
}