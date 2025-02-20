import { configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';
import cacheReducer from './slices/cacheSlice';
import { apiMiddleware } from './middleware/apiMiddleware';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    settings: settingsReducer,
    cache: cacheReducer,
    articles: articlesReducer  // اضافه کردن به reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cache/setCachedItem'],
        ignoredActionPaths: ['payload.data'],
        ignoredPaths: ['cache'],
      },
    }).concat(apiMiddleware as Middleware),  // اضافه کردن type casting
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;