import type { AnyAction } from '@reduxjs/toolkit';

export interface ApiRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

export interface ApiMeta {
  api: ApiRequest;
  success?: boolean;
  [key: string]: unknown;
}

export interface ApiAction extends AnyAction {
  type: string;
  meta: ApiMeta;
  payload?: unknown;
  error?: boolean;
}