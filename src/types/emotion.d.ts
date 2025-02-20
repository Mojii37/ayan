import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
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
}