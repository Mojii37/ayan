import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
