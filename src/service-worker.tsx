import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';
import { Provider } from 'react-redux';

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

const AllTheProviders: React.FC<TestWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: AllTheProviders });
};

export * from '@testing-library/react';
export { renderWithProviders as render };
export default AllTheProviders;