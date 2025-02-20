import { createTheme, ThemeOptions } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

// Import cache from separate file
import cacheRtl from '../utils/rtl-cache';

// Extend MUI theme types
declare module '@mui/material/styles' {
  interface Palette {
    gold: Palette['primary'];
  }
  interface PaletteOptions {
    gold?: PaletteOptions['primary'];
  }
  interface TypeBackground {
    darker?: string;
    overlay?: string;
  }
}

// Custom palette interface
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

// Theme colors
const colors: CustomPalette = {
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
  },
  text: {
    primary: '#FFD700',
    secondary: '#B8860B',
    gold: '#FFE144',
  },
};

// [بقیه کد بدون تغییر]

// Export
export { cacheRtl, colors as themeColors };
export type AppTheme = typeof theme;
export const theme = createTheme(themeOptions, faIR);
// Common component styles
const commonStyles = {
  borderRadius: 8,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  goldBorder: `1px solid ${colors.gold.dark}`,
  goldGlow: `0 0 10px ${colors.gold.main}40`,
  goldGradient: colors.gold.shine,
};

// Theme options
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
  shape: {
    borderRadius: commonStyles.borderRadius,
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
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: colors.background.darker,
          borderBottom: commonStyles.goldBorder,
          backdropFilter: 'blur(8px)',
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
              borderColor: colors.gold.dark,
              transition: commonStyles.transition,
            },
            '&:hover fieldset': {
              borderColor: colors.gold.main,
              boxShadow: commonStyles.goldGlow,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.gold.light,
              boxShadow: commonStyles.goldGlow,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            '&.Mui-focused': {
              color: colors.gold.main,
            },
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
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
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.gold.dark,
          '&::before, &::after': {
            borderColor: colors.gold.dark,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.gold.main,
          transition: commonStyles.transition,
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            boxShadow: commonStyles.goldGlow,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.background.overlay,
          border: commonStyles.goldBorder,
          color: colors.gold.main,
          boxShadow: commonStyles.goldGlow,
        },
      },
    },
  },
};

export { cacheRtl, colors as themeColors };
export type AppTheme = typeof theme;
export const theme = createTheme(themeOptions, faIR);