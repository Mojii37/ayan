import { Theme, ThemeOptions } from '@mui/material/styles';
import '@mui/material/styles';
import '@mui/material/Typography';

// توسعه تم MUI
declare module '@mui/material/styles' {
  // رابط برای توسعه تم
  interface CustomTheme extends Theme {
    customColors?: {
      danger?: string;
      success?: string;
      warning?: string;
    };
    
    customSpacing?: {
      extraSmall?: number;
      extraLarge?: number;
    };
  }

  // رابط برای تنظیمات اختیاری تم
  interface CustomThemeOptions extends ThemeOptions {
    customColors?: {
      danger?: string;
      success?: string;
      warning?: string;
    };
    
    customSpacing?: {
      extraSmall?: number;
      extraLarge?: number;
    };
  }

  // بازنویسی متدهای createTheme
  function createTheme(options?: CustomThemeOptions): CustomTheme;
}

// توسعه variants تایپوگرافی
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3?: true;
    overline2?: true;
    blogTitle?: true;
    captionBold?: true;
  }
}

// تعریف متغیرهای جهانی
declare global {
  interface Window {
    ENV?: {
      API_URL?: string;
      APP_VERSION?: string;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      REACT_APP_API_URL?: string;
    }
  }
}

// برای اطمینان از export 
export {};