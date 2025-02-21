import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomColors {
    main: string;
    light: string;
    dark: string;
    darker: string;
    contrastText: string;
    shine: string;
  }

  interface CustomBackground {
    default: string;
    paper: string;
    darker: string;
    overlay: string;
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

  interface Palette {
    gold: CustomColors;
  }

  interface PaletteOptions {
    gold?: Partial<CustomColors>;
  }

  interface TypeBackground extends CustomBackground {}
}

declare module '@emotion/react' {
  interface Theme {
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

export {};