export type UserRole = 'admin' | 'user' | 'guest';


export interface User {
  id: string;
  name: string;
  username: string;
  email: string; 
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  isActive: boolean;
  firstName: string;
  lastName: string;
  createdAt: string;
  avatar?: string;
  permissions?: string[];
  lastActivity?: Date;
  updatedAt: string;
}
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  refreshToken: string | null;
  lastLogin: string | null;
}

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordCredentials {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export type AuthAction = 
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN'; payload: string }
  | { type: 'UPDATE_USER'; payload: Partial<User> };