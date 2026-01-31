import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#5EEAD4', dark: '#0F766E', light: '#A7F3D0' },
    secondary: { main: '#F97316' },
    background: { default: '#0B0F14', paper: '#0F1623' },
    text: { primary: '#E5E7EB', secondary: '#94A3B8' },
  },
  typography: {
    fontFamily: '"Archivo", "IBM Plex Sans", system-ui, -apple-system, sans-serif',
    h1: { fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-0.03em' },
    h2: { fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-0.02em' },
    h3: { fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-0.02em' },
    h4: { fontFamily: '"JetBrains Mono", monospace' },
    h5: { fontFamily: '"JetBrains Mono", monospace' },
    h6: { fontFamily: '"JetBrains Mono", monospace' },
    button: { fontWeight: 600, letterSpacing: '0.06em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0B0F14',
          backgroundImage:
            'radial-gradient(1200px 600px at 20% -10%, rgba(94,234,212,0.25), transparent 60%),' +
            'radial-gradient(900px 500px at 110% 10%, rgba(249,115,22,0.2), transparent 55%),' +
            'linear-gradient(120deg, rgba(148,163,184,0.06) 1px, transparent 1px),' +
            'linear-gradient(0deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 40px 40px, 40px 40px',
          backgroundPosition: 'center, center, 0 0, 0 0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(11, 15, 20, 0.72)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(148,163,184,0.2)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(12, 18, 28, 0.95)',
          borderRight: '1px solid rgba(148,163,184,0.16)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(160deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))',
          border: '1px solid rgba(148,163,184,0.16)',
          boxShadow:
            '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(148,163,184,0.18)',
        },
        head: {
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#A7F3D0',
          fontSize: '0.75rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '4px 12px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(94,234,212,0.12)',
            border: '1px solid rgba(94,234,212,0.3)',
          },
        },
      },
    },
  },
});
