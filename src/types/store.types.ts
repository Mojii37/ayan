import { ThunkAction, Action } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
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

export interface RootState {
  auth: AuthState;
  cache: CacheState;
  [key: string]: unknown;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface ApiRequest {import { ThunkAction, Action } from '@reduxjs/toolkit';

export interface User {
  id: string | number;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
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

export interface RootState {
  auth: AuthState;
  cache: CacheState;
  [key: string]: unknown;
}

export interface ApiRequest {
  endpoint: string;
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface ApiMeta {
  api: ApiRequest;
  success?: boolean;
  [key: string]: unknown;
}

export interface ApiAction extends Action<string> {
  meta: ApiMeta;
  payload?: unknown;
  error?: boolean;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
  endpoint: string;
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface ApiMeta {
  api: ApiRequest;
  success?: boolean;
  [key: string]: unknown;
}

export interface ApiAction extends Action<string> {
  meta: ApiMeta;
  payload?: unknown;
  error?: boolean;
}