import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';
import cacheReducer from './slices/cacheSlice';
import apiMiddleware from './middleware/api';

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
        // Ignore these action types
        ignoredActions: ['cache/setCachedItem'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.data'],
        // Ignore these paths in the state
        ignoredPaths: ['cache'],
      },
    }).concat(apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;