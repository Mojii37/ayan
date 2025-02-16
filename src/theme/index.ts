import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// تنظیمات RTL
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// پالت رنگ‌های مشکی و طلایی
const darkGold = {
  gold: {
    main: '#FFD700',
    light: '#FFE144',
    dark: '#B8860B',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
  text: {
    primary: '#FFD700',
    secondary: '#B8860B',
  },
};

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Vazirmatn, Arial, sans-serif',
    h1: {
      color: darkGold.gold.main,
    },
    h2: {
      color: darkGold.gold.main,
    },
    h3: {
      color: darkGold.gold.main,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: darkGold.gold.main,
      light: darkGold.gold.light,
      dark: darkGold.gold.dark,
      contrastText: darkGold.gold.contrastText,
    },
    secondary: {
      main: '#B8860B',
      light: '#DAA520',
      dark: '#8B6914',
      contrastText: '#ffffff',
    },
    background: darkGold.background,
    text: darkGold.text,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: darkGold.gold.dark,
          },
        },
        contained: {
          backgroundColor: darkGold.gold.main,
          color: darkGold.gold.contrastText,
        },
        outlined: {
          borderColor: darkGold.gold.main,
          color: darkGold.gold.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkGold.background.paper,
          borderRadius: 8,
          border: `1px solid ${darkGold.gold.dark}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkGold.background.paper,
          borderBottom: `1px solid ${darkGold.gold.dark}`,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: darkGold.gold.dark,
            },
            '&:hover fieldset': {
              borderColor: darkGold.gold.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: darkGold.gold.light,
            },
          },
        },
      },
    },
  },
}, faIR);

export default theme;