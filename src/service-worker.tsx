import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Import your reducers
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';

// Root reducer
const rootReducer = {
  auth: authReducer,
  ui: uiReducer,
};

// Store setup function
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// Default store
const store = setupStore();

// Provider wrapper
const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Enhanced render function
export const renderWithProviders = (
  ui: React.ReactElement, 
  options = {}
) => {
  return render(ui, { 
    wrapper: TestProvider, 
    ...options 
  });
};

// Export Testing Library utilities
export * from '@testing-library/react';
export { TestProvider };