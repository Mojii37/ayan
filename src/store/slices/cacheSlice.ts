import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CacheState, CachedData } from '../../types/store.types';
import { cacheService } from '../../services/CacheService';

const initialState: CacheState = {
  items: {}
};

interface SetCacheItemPayload {
  key: string;
  data: unknown;
  ttl?: number;
  tags?: string[];
}

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCacheItem: (state, action: PayloadAction<SetCacheItemPayload>) => {
      const { key, data, ttl = 3600000, tags = [] } = action.payload;
      const now = Date.now();
      
      state.items[key] = {
        data,
        createdAt: now,
        expiresAt: now + ttl,
        version: '1.0',
        tags
      };
      
      cacheService.setCachedItem(key, data, ttl, tags);
    },
    
    removeCacheItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      cacheService.removeItem(action.payload); // تغییر نام متد
    },
    
    clearCache: (state) => {
      state.items = {};
      cacheService.clearAll();
    },

    clearExpiredCache: (state, action: PayloadAction<number | undefined>) => {
      const maxAge = action.payload || 86400000; // 24 hours default
      const now = Date.now();

      Object.entries(state.items).forEach(([key, item]) => {
        if (item.expiresAt < now || (now - item.createdAt > maxAge)) {
          delete state.items[key];
        }
      });

      cacheService.clearExpired(maxAge);
    }
  },
});

export const { 
  setCacheItem, 
  removeCacheItem, 
  clearCache,
  clearExpiredCache 
} = cacheSlice.actions;

export const selectCacheItem = <T>(
  state: { cache: CacheState }, 
  key: string
): T | undefined => {
  const item = state.cache.items[key] as CachedData<T> | undefined;
  if (!item || Date.now() > item.expiresAt) {
    return undefined;
  }
  return item.data;
};

export default cacheSlice.reducer;