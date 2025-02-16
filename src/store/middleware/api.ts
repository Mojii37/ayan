import { Middleware, AnyAction, Dispatch } from 'redux';
import type { RootState } from '../store';

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

const isApiAction = (action: AnyAction): action is ApiAction => {
  return action.type.startsWith('api/');
};

const apiMiddleware: Middleware<Dispatch, RootState> = 
  store => next => action => {
    const result = next(action);

    if (isApiAction(action)) {
      try {
        const state = store.getState();
        const token = state.auth?.token;

        if (token) {
          const updatedPayload = {
            ...action.payload,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              ...action.payload?.headers,
              Authorization: `Bearer ${token}`,
            },
          };

          (next as Dispatch<ApiAction>)({
            ...action,
            payload: updatedPayload
          });
        }
      } catch (error) {
        console.error('API Middleware Error:', error);
      }
    }

    return result;
  };

export default apiMiddleware;