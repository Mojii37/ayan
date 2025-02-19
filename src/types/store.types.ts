import type { User } from './user';

export type ThemeMode = 'light' | 'dark' | 'system';
export type SupportedLanguage = 'en' | 'fa' | 'ar';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface SettingsState {
  theme: ThemeMode;
  language: SupportedLanguage;
  notifications: {
    enabled: boolean;
    sound: boolean;
    email: boolean;
  };
  preferences: {
    compactMode: boolean;
    accessibilityMode: boolean;
  };
}

export interface UIState {
  loading: {
    [key: string]: {
      status: boolean;
      timestamp?: number;
    }
  };
  errors: {
    [key: string]: {
      message: string | null;
      code?: number;
      timestamp?: number;
    }
  };
  globalNotification?: {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  };
}

export interface CachedData<T = unknown> {
  data: T;
  expiresAt: number;
  createdAt: number;
  version?: string;
  tags?: string[];
}

export interface CacheState {
  items: Record<string, CachedData<unknown>>;
}

export type CacheKey = 
  | 'user-profile'
  | 'dashboard-data'
  | 'recent-activities'
  | 'system-settings';

export interface RootState {
  auth: AuthState;
  settings: SettingsState;
  ui: UIState;
  cache: CacheState;
}