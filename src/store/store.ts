import { configureStore, Middleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';
import cacheReducer from './slices/cacheSlice';
import articlesReducer from './slices/articlesSlice';
import { apiMiddleware } from './middleware/apiMiddleware';
import { cacheMiddleware } from './middleware/cacheMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    settings: settingsReducer,
    cache: cacheReducer,
    articles: articlesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cache/setCachedItem'],
        ignoredActionPaths: ['payload.data'],
        ignoredPaths: ['cache'],
      },
    }).concat(apiMiddleware as Middleware, cacheMiddleware as Middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;