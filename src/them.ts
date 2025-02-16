import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

// ساخت تم پیش‌فرض برای استفاده از shadows
const defaultTheme = createTheme();

// تعریف type های اضافی برای پالت
declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    customBackground: {
      default: string;
      paper: string;
      light: string;
      dark: string;
    };
  }
  
  interface PaletteOptions {
    neutral?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    customBackground?: {
      default: string;
      paper: string;
      light: string;
      dark: string;
    };
  }
}

// تعریف سایه‌های سفارشی
const customShadows = [
  'none',
  '0px 2px 4px rgba(0, 0, 0, 0.05)',
  '0px 4px 6px rgba(0, 0, 0, 0.07)',
  '0px 6px 8px rgba(0, 0, 0, 0.08)',
  '0px 8px 12px rgba(0, 0, 0, 0.1)',
] as const;

// گرفتن بقیه سایه‌ها از تم پیش‌فرض
const remainingShadows = defaultTheme.shadows.slice(5);

const themeOptions: ThemeOptions = {
  direction: 'rtl',
  typography: {
    fontFamily: '"Vazirmatn", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    neutral: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    customBackground: {
      default: '#f8fafc',
      paper: '#ffffff',
      light: '#f1f5f9',
      dark: '#e2e8f0',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Vazirmatn';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('/fonts/Vazirmatn-Regular.woff2') format('woff2');
        }
        
        body {
          scrollbar-color: #6b6b6b #2b2b2b;
        }
        
        body::-webkit-scrollbar,
        body *::-webkit-scrollbar {
          width: 8px;
          background-color: #2b2b2b;
        }
        
        body::-webkit-scrollbar-thumb,
        body *::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: #6b6b6b;
          min-height: 24px;
          border: 2px solid #2b2b2b;
        }
        
        body::-webkit-scrollbar-thumb:focus,
        body *::-webkit-scrollbar-thumb:focus,
        body::-webkit-scrollbar-thumb:hover,
        body *::-webkit-scrollbar-thumb:hover {
          background-color: #959595;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    ...customShadows,
    ...remainingShadows,
  ] as Theme['shadows'],
};

const theme = createTheme(themeOptions, faIR);

export default theme;