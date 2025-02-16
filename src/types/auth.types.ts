export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
  firstName?: string;
  lastName?: string;
}

export type UserRole = 'admin' | 'user' | 'editor' | 'viewer';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}