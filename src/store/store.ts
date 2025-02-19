import { configureStore } from '@reduxjs/toolkit';
import { apiMiddleware } from './middleware/apiMiddleware';
import { cacheMiddleware } from './middleware/cacheMiddleware';
import authReducer from './slices/authSlice';
import type { RootState } from '../types/store.types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiMiddleware, cacheMiddleware),
});

export type AppDispatch = typeof store.dispatch;