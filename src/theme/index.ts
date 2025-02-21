import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import { rtlCache } from '../utils/rtl';
import { type CustomThemeColors } from '../types/theme';

interface CustomPalette {
  gold: {
    main: string;
    light: string;
    dark: string;
    darker: string;
    contrastText: string;
    shine: string;
  };
  background: {
    default: string;
    paper: string;
    darker: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    gold: string;
  };
}

const colors: CustomThemeColors = {
  gold: {
    main: '#FFD700',
    light: '#FFE144',
    dark: '#B8860B',
    darker: '#8B6914',
    contrastText: '#000000',
    shine: 'linear-gradient(45deg, #FFD700 30%, #FDB931 90%)',
  },
  background: {
    default: '#0A0A0A',
    paper: '#121212',
    darker: '#000000',
    overlay: 'rgba(0, 0, 0, 0.8)',
  }
};

const commonStyles = {
  borderRadius: 8,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  goldBorder: `1px solid ${colors.gold.dark}`,
  goldGlow: `0 0 10px ${colors.gold.main}40`,
  goldGradient: colors.gold.shine,
} as const;

const themeOptions: ThemeOptions = {
  direction: 'rtl',
  typography: {
    fontFamily: 'IRANSans, Vazirmatn, Arial, sans-serif',
    h1: { color: colors.gold.main, fontWeight: 700 },
    h2: { color: colors.gold.main, fontWeight: 700 },
    h3: { color: colors.gold.main, fontWeight: 600 },
    h4: { color: colors.gold.main, fontWeight: 600 },
    h5: { color: colors.gold.main, fontWeight: 500 },
    h6: { color: colors.gold.main, fontWeight: 500 },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: colors.gold.main,
      light: colors.gold.light,
      dark: colors.gold.dark,
      contrastText: colors.gold.contrastText,
    },
    secondary: {
      main: colors.gold.dark,
      light: colors.gold.main,
      dark: colors.gold.darker,
      contrastText: '#ffffff',
    },
    background: colors.background,
    text: colors.text,
    gold: colors.gold,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: colors.background.default,
          color: colors.text.primary,
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.gold.main} ${colors.background.default}`,
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            background: colors.background.darker,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.gold.dark,
            borderRadius: 4,
            '&:hover': {
              backgroundColor: colors.gold.main,
              boxShadow: commonStyles.goldGlow,
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          ...commonStyles,
          fontWeight: 700,
          letterSpacing: 1,
        },
        contained: {
          background: commonStyles.goldGradient,
          color: colors.gold.contrastText,
          '&:hover': {
            background: colors.gold.dark,
            boxShadow: commonStyles.goldGlow,
          },
        },
        outlined: {
          borderColor: colors.gold.dark,
          color: colors.gold.main,
          '&:hover': {
            borderColor: colors.gold.main,
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            boxShadow: commonStyles.goldGlow,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: colors.background.paper,
          border: commonStyles.goldBorder,
          '&:hover': {
            boxShadow: commonStyles.goldGlow,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          backgroundImage: 'none',
          '&:hover': {
            boxShadow: commonStyles.goldGlow,
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions, faIR);
export type AppTheme = typeof theme;
export { colors as themeColors, rtlCache };