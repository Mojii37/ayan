import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CacheState, CachedData } from '../../types/store.types';
import { cacheService } from '../../services/CacheService';

const initialState: Omit<CacheState, 'clearExpired' | 'getCachedItem' | 'setCachedItem'> = {};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCacheItem: (state, action: PayloadAction<{ key: string; data: CachedData }>) => {
      const { key, data } = action.payload;
      state[key] = data;
    },
    removeCacheItem: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    clearCache: (state) => {
      return initialState;
    },
  },
});

export const { setCacheItem, removeCacheItem, clearCache } = cacheSlice.actions;
export default cacheSlice.reducer;