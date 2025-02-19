import { createTheme, ThemeOptions } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// Extend MUI theme types
declare module '@mui/material/styles' {
  interface Palette {
    gold: Palette['primary'];
  }
  interface PaletteOptions {
    gold?: PaletteOptions['primary'];
  }
}

// RTL configuration
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
});

// Color palette types
interface DarkGoldPalette {
  gold: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}

// Dark gold color palette
const darkGold: DarkGoldPalette = {
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

// Theme configuration
const themeOptions: ThemeOptions = {
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Vazirmatn, Arial, sans-serif',
    h1: { color: darkGold.gold.main },
    h2: { color: darkGold.gold.main },
    h3: { color: darkGold.gold.main },
    h4: { color: darkGold.gold.main },
    h5: { color: darkGold.gold.main },
    h6: { color: darkGold.gold.main },
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
    gold: darkGold.gold,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${darkGold.gold.main} ${darkGold.background.default}`,
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            background: darkGold.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: darkGold.gold.main,
            borderRadius: 4,
            '&:hover': {
              backgroundColor: darkGold.gold.dark,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: darkGold.gold.dark,
          },
        },
        contained: {
          backgroundColor: darkGold.gold.main,
          color: darkGold.gold.contrastText,
          '&:hover': {
            backgroundColor: darkGold.gold.dark,
          },
        },
        outlined: {
          borderColor: darkGold.gold.main,
          color: darkGold.gold.main,
          '&:hover': {
            borderColor: darkGold.gold.light,
            backgroundColor: 'rgba(255, 215, 0, 0.04)',
          },
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
          '& .MuiInputLabel-root': {
            color: darkGold.text.secondary,
            '&.Mui-focused': {
              color: darkGold.gold.main,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkGold.background.paper,
          backgroundImage: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: darkGold.gold.dark,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: darkGold.gold.main,
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.04)',
          },
        },
      },
    },
  },
};

// Create and export theme
export const theme = createTheme(themeOptions, faIR);

export type AppTheme = typeof theme;