import type { AuthState } from '../types/auth.types';

export interface RootState {
  auth: AuthState;
  settings: SettingsState;
  ui: UIState;
  cache: CacheState;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export interface UIState {
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

export interface CachedData<T = unknown> {
  data: T;
  expiresAt: number;
}

export interface CacheState {
  [key: string]: CachedData;
}