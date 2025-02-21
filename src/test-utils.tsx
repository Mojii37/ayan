import { render, RenderOptions, cleanup, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { RootState } from './types/store.types';
import * as vitest from 'vitest';
import authReducer from './store/slices/authSlice';
import uiReducer from './store/slices/uiSlice';
import settingsReducer from './store/slices/settingsSlice';
import articlesReducer from './store/slices/articlesSlice';
import cacheReducer from './store/slices/cacheSlice';
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { store as appStore } from './store';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { faIR } from 'date-fns/locale';

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }

  interface ResizeObserverMock {
    observe: typeof vitest.vi.fn;
    unobserve: typeof vitest.vi.fn;
    disconnect: typeof vitest.vi.fn;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  settings: settingsReducer,
  articles: articlesReducer,
  cache: cacheReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['cache/setCachedItem'],
          ignoredActionPaths: ['payload.data', 'meta.api'],
          ignoredPaths: ['cache.items', 'cache.service'],
          warnAfter: 100,
        },
      })
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof setupStore>;
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
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={faIR}>
            {children}
          </LocalizationProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  return { 
    store, 
    ...render(ui, { wrapper: Wrapper, ...renderOptions }) 
  };
}

// Custom render for testing with app store
const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={faIR}>
          {children}
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Setup test environment
vitest.beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vitest.vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vitest.vi.fn(),
      removeListener: vitest.vi.fn(),
      addEventListener: vitest.vi.fn(),
      removeEventListener: vitest.vi.fn(),
      dispatchEvent: vitest.vi.fn(),
    })),
  });

  const resizeObserverMock = vitest.vi.fn().mockImplementation(() => ({
    observe: vitest.vi.fn(),
    unobserve: vitest.vi.fn(),
    disconnect: vitest.vi.fn(),
  }));

  window.ResizeObserver = resizeObserverMock;
  
  // @ts-expect-error - scrollTo is not defined in global
  window.scrollTo = vitest.vi.fn();
});

// Cleanup after each test
vitest.afterEach(() => {
  cleanup();
  vitest.vi.clearAllMocks();
});