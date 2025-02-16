import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    // اضافه کردن پراپرتی‌های سفارشی theme در صورت نیاز
  }
  
  interface ThemeOptions extends Partial<Theme> {
    // اضافه کردن پراپرتی‌های سفارشی theme options در صورت نیاز
  }

  interface Palette {
    neutral: Palette['primary'];
    customBackground: {
      default: string;
      paper: string;
      light: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    customBackground?: {
      default: string;
      paper: string;
      light: string;
      dark: string;
    };
  }

  interface TypeBackground {
    default: string;
    paper: string;
    light: string;
    dark: string;
  }
}

// این export برای رفع خطای unused variable
export interface CustomTheme extends Theme {}