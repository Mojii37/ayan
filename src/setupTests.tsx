import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import React from 'react';

// Import your reducers
import rootReducer from '@store/rootReducer'; // اگر مسیر متفاوت است، تغییر دهید
import type { RootState } from '@store/types'; // اگر مسیر متفاوت است، تغییر دهید

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  route?: string;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  window.history.pushState({}, 'Test page', route);

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { renderWithProviders as render };