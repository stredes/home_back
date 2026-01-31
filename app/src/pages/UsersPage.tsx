import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/api';

export default function UsersPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    const roles = users.flatMap((user) => user.roles || []).length;
    return {
      total: users.length,
      roles,
    };
  }, [users]);

  useEffect(() => {
    let mounted = true;
    api
      .get('/users')
      .then((res) => {
        if (!mounted) return;
        setUsers(res.data.items || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError('No pudimos cargar los usuarios.');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="overline" color="text.secondary">
              Identity / Access
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Usuarios y permisos
            </Typography>
            <Typography color="text.secondary">
              Gestión de cuentas activas y niveles de acceso.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined">Exportar</Button>
            <Button variant="contained">Crear usuario</Button>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Usuarios activos
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            {summary.total}
          </Typography>
          <Chip label="managed" size="small" color="info" sx={{ mt: 1 }} />
        </Paper>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Roles asociados
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            {summary.roles}
          </Typography>
          <Chip label="policy" size="small" color="success" sx={{ mt: 1 }} />
        </Paper>
      </Stack>

      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={1} sx={{ p: 2.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Directorio de usuarios
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estado de acceso, roles y propietarios.
            </Typography>
          </Box>
          <Chip label={loading ? 'syncing' : `${summary.total} users`} size="small" />
        </Stack>
        <Divider />

        <Box sx={{ px: 2.5, pb: 2.5, pt: 1.5 }}>
          {error ? (
            <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed' }}>
              <Typography color="error.main" sx={{ fontWeight: 600 }}>
                {error}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verifica el servicio de usuarios e intenta nuevamente.
              </Typography>
            </Paper>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Roles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {user.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.nombre}</TableCell>
                    <TableCell>
                      {(user.roles || []).map((role) => role.role?.name).filter(Boolean).join(', ') || '—'}
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed' }}>
                        <Typography sx={{ fontWeight: 600 }}>Sin usuarios registrados</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Crea el primer usuario para iniciar el control de acceso.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Box>
      </Paper>
    </Stack>
  );
}

type UserSummary = {
  id: string;
  email: string;
  nombre: string;
  roles?: { role?: { name?: string } }[];
};
