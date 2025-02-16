import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {

  }
  interface ThemeOptions extends Partial<Theme> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
  
  }
}