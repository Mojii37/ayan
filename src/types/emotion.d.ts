import '@emotion/react';
import type { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
  export interface Theme extends MuiTheme {
    palette: {
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
    };
  }
