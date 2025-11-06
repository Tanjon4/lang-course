// contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginData, RegisterData } from '@/types/auth';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

type AuthContextType = AuthState & {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | undefined>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; access: string; refresh: string } }
  | { type: 'AUTH_FAIL' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

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
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshTokenValue: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    console.log('🔄 Starting authentication check...');
    
    const accessToken = authService.getAccessToken();
    const refreshTokenValue = authService.getRefreshToken();
    
    console.log('🔍 Tokens check:', { 
      accessToken: !!accessToken, 
      refreshToken: !!refreshTokenValue 
    });

    if (!accessToken || !refreshTokenValue) {
      console.log('❌ No tokens found, user is not authenticated');
      dispatch({ type: 'AUTH_FAIL' });
      return;
    }

    try {
      console.log('👤 Fetching current user data...');
      const user = await authService.getCurrentUser();
      
      console.log('✅ Authentication successful, user:', user);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user,
          access: accessToken,
          refresh: refreshTokenValue,
        },
      });
    } catch (error: any) {
      console.error('❌ getCurrentUser failed:', error);
      
      // Si erreur 401, essayez de rafraîchir le token
      if (error.message && error.message.includes('401')) {
        console.log('🔄 Token expired, attempting refresh...');
        try {
          const newAccessToken = await refreshTokenFunc();
          if (newAccessToken) {
            console.log('✅ Token refreshed, fetching user again...');
            const user = await authService.getCurrentUser();
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: {
                user,
                access: newAccessToken,
                refresh: refreshTokenValue,
              },
            });
            return;
          }
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
        }
      }
      
      // Si tout échoue, nettoyez
      console.log('🧹 Cleaning up invalid tokens');
      authService.clearTokens();
      dispatch({ type: 'AUTH_FAIL' });
    }
  };

  const login = async (data: LoginData) => {
    console.log('🔑 Starting login process...');
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await authService.login(data);
      
      console.log('✅ Login response received:', response);
      
      // Stockez les tokens
      authService.setAccessToken(response.access);
      authService.setRefreshToken(response.refresh);
      
      console.log('💾 Tokens stored in localStorage');
      
      // Récupérez les infos utilisateur
      const user = await authService.getCurrentUser();
      
      console.log('✅ User data fetched:', user);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user,
          access: response.access,
          refresh: response.refresh,
        },
      });
      
      console.log('🎉 User fully authenticated and context updated');
      
      // Redirection basée sur le rôle
      const currentPath = window.location.pathname;
      const langMatch = currentPath.match(/^\/([a-z]{2})\//);
      const lang = langMatch ? langMatch[1] : 'fr';
      
      console.log('🌍 Detected language:', lang);
      console.log('👤 User role:', user.role);
      
      if (user.role === "admin") {
        console.log('🚀 Redirecting admin to profile');
        router.push(`/${lang}/auth/profile`);
      } else if (user.role === "student") {
        console.log('🚀 Redirecting student to user dashboard');
        router.push(`/${lang}/dashboard/user`);
      } else {
        console.log('🚀 Redirecting to home page');
        router.push(`/${lang}`);
      }
      
    } catch (error) {
      console.error('❌ Login failed:', error);
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      await authService.register(data);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL' });
      throw error;
    }
  };

  const logout = async () => {
    console.log('🚪 Starting logout process...');
    try {
      const refreshToken = authService.getRefreshToken();
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authService.clearTokens();
      dispatch({ type: 'LOGOUT' });
      
      // Redirection après logout
      const currentPath = window.location.pathname;
      const langMatch = currentPath.match(/^\/([a-z]{2})\//);
      const lang = langMatch ? langMatch[1] : 'fr';
      
      router.push(`/${lang}/auth/login`);
      console.log('✅ Logout completed and redirected to login');
    }
  };

  const refreshTokenFunc = async (): Promise<string | undefined> => {
    try {
      const refresh = authService.getRefreshToken();
      if (refresh) {
        const response = await authService.refreshToken(refresh);
        authService.setAccessToken(response.access);
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
        refreshToken: refreshTokenFunc,
        checkAuth,
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