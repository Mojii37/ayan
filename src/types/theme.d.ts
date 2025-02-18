import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gold: {
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
    gold?: {
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

  interface TypeBackground {
    default: string;
    paper: string;
    light: string;
    dark: string;
  }

  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export {};