import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { faIR } from 'date-fns/locale';
import { CacheProvider } from '@emotion/react';
import { store } from './store';
import { theme, rtlCache } from './theme';
import App from './App';
import './index.css';

const globalStyles = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html, body': {
    minHeight: '100vh',
    direction: 'rtl',
    scrollBehavior: 'smooth',
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily,
  },
  '::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '::-webkit-scrollbar-track': {
    background: theme.palette.background.default,
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.gold.main,
    borderRadius: '4px',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      background: theme.palette.gold.dark,
    },
  },
  'a': {
    color: theme.palette.gold.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.gold.light,
    },
  },
};

const ErrorPage: React.FC = () => (
  <div 
    role="alert" 
    style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem',
      color: theme.palette.gold.main,
      backgroundColor: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
    }}
  >
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>خطا</h1>
    <p style={{ fontSize: '1.1rem' }}>صفحه مورد نظر یافت نشد</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found in document');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={faIR}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);