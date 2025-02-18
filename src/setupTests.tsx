import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

// تنظیمات تست
const store = configureStore({
  reducer: rootReducer,
});

// کامپوننتی برای رندر کردن با فراهم‌کنندگان
export const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

// هوک برای رندر کردن با فراهم‌کنندگان
export const renderHookWithProviders = (hook: () => unknown) => {
  return renderHook(() => hook(), {
    wrapper: ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    ),
  });
};