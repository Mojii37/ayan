import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

// ایجاد یک reducer موقت
const tempReducer = (state = {}) => state;

const store = configureStore({
  reducer: tempReducer,
});

type CustomRenderOptions = {
  route?: string;
} & Omit<RenderOptions, 'wrapper'>;

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { route = '/', ...renderOptions } = options;

  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// این خط را حذف کردیم چون به نظر می‌رسد مشکل‌ساز بود
// export const renderHookWithProviders = ...

// نسخه‌ای از رندر با provider‌ها
export { renderWithProviders as render };