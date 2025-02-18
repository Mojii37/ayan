// src/store/middleware/apiMiddleware.ts
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../';

export interface ApiAction extends AnyAction {
  type: string;
  payload?: {
    headers?: Record<string, string>;
    body?: unknown;
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    [key: string]: unknown;
  };
}

const apiMiddleware: Middleware<{}, RootState> = 
  (api: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => 
  (next: Dispatch<AnyAction>) => 
  (action: ApiAction) => {
    const result = next(action);

    if (action.type.startsWith('api/')) {
      try {
        const state = api.getState();
        const token = state.auth?.token;

        if (token) {
          const updatedPayload = {
            ...action.payload,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              ...action.payload?.headers,
              'Authorization': `Bearer ${token}`,
            },
          };

          next({
            ...action,
            payload: updatedPayload
          });
        }
      } catch (error) {
        console.error('خطای میانی‌افزار API:', error);
      }
    }

    return result;
  };

export default apiMiddleware;