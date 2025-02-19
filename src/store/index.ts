import { configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';
import cacheReducer from './slices/cacheSlice';
import { apiMiddleware } from './middleware/apiMiddleware';
import { cacheMiddleware } from './middleware/cacheMiddleware';
import type { RootState } from '../types/store.types';

// Configure Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    settings: settingsReducer,
    cache: cacheReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cache/setCachedItem'],
        ignoredActionPaths: ['payload.data', 'meta.api'],
        ignoredPaths: ['cache.items', 'cache.service'],
      },
    }).concat([apiMiddleware as Middleware, cacheMiddleware as Middleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer types from store
export type AppDispatch = typeof store.dispatch;

// Define typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { RootState };
export default store;