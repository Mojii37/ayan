import { Middleware } from '@reduxjs/toolkit';
import { cacheService } from '../../services/CacheService';

interface CachePayload {
  key: string;
  data: unknown;
  ttl?: number;
}

interface CacheAction {
  type: string;
  payload: CachePayload;
}

function isCacheAction(action: unknown): action is CacheAction {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in (action as Record<string, unknown>) &&
    'payload' in (action as Record<string, unknown>) &&
    typeof (action as Record<string, unknown>).payload === 'object' &&
    'key' in ((action as Record<string, unknown>).payload as Record<string, unknown>)
  );
}

export const cacheMiddleware: Middleware<unknown> = () => next => action => {
  if (isCacheAction(action) && action.type === 'cache/setCacheItem') {
    const { key, data, ttl } = action.payload;
    try {
      cacheService.setCachedItem(key, data, ttl);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Cache middleware error:', error.message);
      }
    }
  }
  return next(action);
};

export const createCacheAction = (
  key: string,
  data: unknown,
  ttl?: number
): CacheAction => ({
  type: 'cache/setCacheItem',
  payload: { key, data, ttl }
});