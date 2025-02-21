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


export interface AuthState {
  isAuthenticated: boolean;
}
export interface AuthState {
  user: unknown | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export interface CacheState {
  [key: string]: CachedData;
}

export interface CachedData<T = unknown> {
  data: T;
  expiresAt: number;
  createdAt: number;
  version?: string;
  tags?: string[];
}
export type CacheKey = 
  | 'user-profile'
  | 'dashboard-data'
  | 'recent-activities'
  | 'system-settings';