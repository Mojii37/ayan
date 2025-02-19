import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../types/store.types';
import { cacheService } from '../../services/CacheService';

export interface CacheState {
  items: Record<string, unknown>;
}

const initialState: CacheState = {
  items: {}
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCacheItem: (
      state,
      action: PayloadAction<{ key: string; data: unknown; ttl?: number }>
    ) => {
      const { key, data, ttl } = action.payload;
      state.items[key] = data;
      // همزمان در localStorage هم ذخیره می‌کنیم
      cacheService.setCachedItem(key, data, ttl);
    },
    removeCacheItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.items[key];
      // از localStorage هم حذف می‌کنیم
      localStorage.removeItem(key);
    },
    clearCache: (state) => {
      state.items = {};
      // localStorage را هم پاک می‌کنیم
      cacheService.clearExpired(0);
    },
  },
});

// Actions
export const { setCacheItem, removeCacheItem, clearCache } = cacheSlice.actions;

// Selectors
export const selectCacheItem = (state: RootState, key: string) => state.cache.items[key];

export default cacheSlice.reducer;