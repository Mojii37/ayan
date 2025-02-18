import type { AuthState } from '../types/auth.types';

type ThemeMode = 'light' | 'dark';
type SupportedLanguage = 'en' | 'fa' | 'ar';

export interface RootState {
  auth: AuthState;
  settings: SettingsState;
  ui: UIState;
  cache: CacheState;
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
  [key: string]: CachedData;
  clearExpired: (maxAge?: number) => void;
  getCachedItem<T = unknown>(key: string): CachedData<T> | undefined;
  setCachedItem<T = unknown>(key: string, data: T, ttl?: number): void;
}

export type CacheKey = 
  | 'user-profile'
  | 'dashboard-data'
  | 'recent-activities'
  | 'system-settings';