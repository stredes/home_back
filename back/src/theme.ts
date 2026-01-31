import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0B5FFF' },
    secondary: { main: '#FF7A00' },
    background: { default: '#F6F8FB' },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
  },
});
