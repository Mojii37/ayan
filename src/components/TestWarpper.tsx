import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/slices/authSlice';
import uiReducer from '@store/slices/uiSlice';
const rootReducer = {
  auth: authReducer,
  ui: uiReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

interface TestWrapperProps {
  children: React.ReactNode;
}

const TestWarpper: React.FC<TestWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default TestWarpper;
