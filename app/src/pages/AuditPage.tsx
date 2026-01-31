import {
  Box,
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

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    const last = logs[0]?.createdAt;
    return {
      total: logs.length,
      lastActivity: last ? new Date(last).toLocaleString() : 'Sin actividad',
    };
  }, [logs]);

  useEffect(() => {
    let mounted = true;
    api
      .get('/audit')
      .then((res) => {
        if (!mounted) return;
        setLogs(res.data.items || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError('No pudimos cargar la auditoría.');
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
              Security / Audit
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Auditoría operacional
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Registro de acciones críticas y eventos de acceso.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label={loading ? 'syncing' : 'ready'} size="small" />
            <Chip label={`${summary.total} eventos`} size="small" color="info" />
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Eventos registrados
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            {summary.total}
          </Typography>
          <Chip label="live" size="small" color="success" sx={{ mt: 1 }} />
        </Paper>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Última actividad
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
            {summary.lastActivity}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Zona horaria local
          </Typography>
        </Paper>
      </Stack>

      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={1} sx={{ p: 2.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Timeline de eventos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Actividad por usuario, entidad y timestamp.
            </Typography>
          </Box>
          <Chip label={loading ? 'audit syncing' : 'audit ready'} size="small" />
        </Stack>
        <Divider />

        <Box sx={{ px: 2.5, pb: 2.5, pt: 1.5 }}>
          {error ? (
            <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed' }}>
              <Typography color="error.main" sx={{ fontWeight: 600 }}>
                {error}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revisa el estado del servicio antes de reintentar.
              </Typography>
            </Paper>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Actor</TableCell>
                  <TableCell>Acción</TableCell>
                  <TableCell>Entidad</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Stack spacing={0.4}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {log.actorUserId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {log.id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.entity}</TableCell>
                    <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                {!loading && logs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed' }}>
                        <Typography sx={{ fontWeight: 600 }}>Sin eventos registrados</Typography>
                        <Typography variant="body2" color="text.secondary">
                          La auditoría comenzará a llenarse cuando se use el sistema.
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

type AuditLog = {
  id: string;
  actorUserId: string;
  action: string;
  entity: string;
  createdAt: string;
};
