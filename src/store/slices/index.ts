import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from './uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export default rootReducer;