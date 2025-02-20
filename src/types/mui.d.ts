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
  
  export {};