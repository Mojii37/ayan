import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
// سایر reducerها را اینجا import کنید

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  // سایر reducerها را اینجا اضافه کنید
});

export default rootReducer;
