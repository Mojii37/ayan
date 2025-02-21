import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import type { RenderOptions } from '@testing-library/react';
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';
import settingsReducer from './store/slices/settingsSlice';
import articlesReducer from './store/slices/articlesSlice';

const rootReducer = {
  auth: authReducer,
  ui: uiReducer,
  settings: settingsReducer,
  articles: articlesReducer,
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
): ReturnType<typeof render> & { store: ReturnType<typeof setupStore> } {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}


  interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    route?: string;
  }
  

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';