import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  Chip,
} from '@mui/material';

const drawerWidth = 240;
const items = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Usuarios', to: '/users' },
  { label: 'Archivos', to: '/files' },
  { label: 'Auditoría', to: '/audit' },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              CORE CONTROL / DOWNLOADS
            </Typography>
            <Chip
              size="small"
              label="STORAGE: LOCAL"
              color="primary"
              variant="outlined"
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Operador • Console
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ px: 1.5, pt: 2, pb: 1 }}>
          <Typography variant="overline" color="text.secondary">
            NAV
          </Typography>
        </Box>
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.to}
              component={RouterLink}
              to={item.to}
              selected={location.pathname === item.to}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ sx: { fontWeight: 600, letterSpacing: '0.04em' } }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 'auto', px: 2, pb: 3 }}>
          <Typography variant="caption" color="text.secondary">
            build: dev-local • v0.1
          </Typography>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
