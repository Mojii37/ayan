import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../types/store.types';

interface ApiRequest {
  endpoint: string;
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: {
    count: number;
    delay: number;
  };
  cache?: {
    key?: string;
    ttl?: number;
  };
}

interface ApiMeta {
  api: ApiRequest;
  success?: boolean;
  [key: string]: unknown;
}

interface ApiAction {
  type: string;
  meta: ApiMeta;
  payload?: unknown;
  error?: boolean;
}

function isApiAction(action: unknown): action is ApiAction {
  return (
    typeof action === 'object' &&
    action !== null &&
    'meta' in (action as Record<string, unknown>) &&
    typeof (action as Record<string, unknown>).meta === 'object' &&
    'api' in ((action as Record<string, unknown>).meta as Record<string, unknown>)
  );
}

export const apiMiddleware: Middleware<unknown, RootState> = store => next => action => {
  if (!isApiAction(action)) {
    return next(action);
  }

  const { endpoint, method = 'GET', body, headers = {} } = action.meta.api;
  const state = store.getState();
  const token = state.auth.token;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  return fetch(endpoint, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(async response => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return next({
        ...action,
        payload: data,
        meta: { ...action.meta, success: true },
      });
    })
    .catch(error => {
      if (error instanceof Error) {
        return next({
          ...action,
          payload: error.message,
          error: true,
          meta: { ...action.meta, success: false },
        });
      }
      return next(action);
    });
};

export const createApiAction = (
  type: string,
  request: ApiRequest,
  extraMeta: Record<string, unknown> = {}
): ApiAction => ({
  type,
  meta: {
    api: request,
    ...extraMeta,
  },
});