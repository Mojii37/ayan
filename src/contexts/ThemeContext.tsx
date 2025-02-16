import React, { createContext, useState, useCallback } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface ThemeContextType {
  theme: {
    direction: 'rtl' | 'ltr';
  };
  toggleDirection: () => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: { direction: 'rtl' },
  toggleDirection: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [],
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  const theme = createTheme({
    direction,
    typography: {
      fontFamily: 'IRANSans, Arial, sans-serif',
    },
  });

  const toggleDirection = useCallback(() => {
    setDirection(prev => (prev === 'rtl' ? 'ltr' : 'rtl'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: { direction }, toggleDirection }}>
      <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};