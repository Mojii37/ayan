import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';
import cacheReducer from './slices/cacheSlice';
import apiMiddleware from './middleware/api';

// تعریف و پیکربندی استور
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
        ignoredActionPaths: ['payload.data'],
        ignoredPaths: ['cache'],
      },
    }).concat(apiMiddleware),
});

// تعریف تایپ‌های اصلی
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// تعریف تایپ‌های کمکی برای استفاده در کامپوننت‌ها
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;