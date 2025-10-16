'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginData, RegisterData } from '@/types/auth';
import { authService } from '@/services/authService';

type AuthContextType = AuthState & {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | undefined>; // ✅ ovaina eto
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; access: string; refresh: string } }
  | { type: 'AUTH_FAIL' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.access,
        refreshTokenValue: action.payload.refresh,
        error: null,
      };

    case 'AUTH_FAIL':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshTokenValue: null,
        error: 'Authentication failed',
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshTokenValue: null,
        loading: false,
        error: null,
      };

    case 'UPDATE_USER':
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshTokenValue: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const user = await authService.getCurrentUser();
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user,
            access: token,
            refresh: localStorage.getItem('refreshToken') || '',
          },
        });
      } else {
        dispatch({ type: 'AUTH_FAIL' });
      }
    } catch {
      dispatch({ type: 'AUTH_FAIL' });
    }
  };

  const login = async (data: LoginData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.login(data);
      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          access: response.access,
          refresh: response.refresh,
        },
      });
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      await authService.register(data);
      dispatch({ type: 'AUTH_FAIL' }); // tsy auto-login
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      if (refresh) {
        const response = await authService.refreshToken(refresh);
        localStorage.setItem('accessToken', response.access);
        return response.access;
      }
    } catch (error) {
      await logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
