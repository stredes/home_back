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

export default function FilesPage() {
  const [files, setFiles] = useState<FileSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    const active = files.filter((file) => file.isActive).length;
    return {
      total: files.length,
      active,
      inactive: files.length - active,
    };
  }, [files]);

  useEffect(() => {
    let mounted = true;
    api
      .get('/files')
      .then((res) => {
        if (!mounted) return;
        setFiles(res.data.items || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError('No pudimos cargar los archivos.');
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
              Workspace / Files
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Archivos del sistema
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Control de versiones y disponibilidad por ambiente.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined">Importar</Button>
            <Button variant="contained">Subir archivo</Button>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {[
          { label: 'Total', value: summary.total, tone: 'default' as const },
          { label: 'Activos', value: summary.active, tone: 'success' as const },
          { label: 'Inactivos', value: summary.inactive, tone: 'warning' as const },
        ].map((item) => (
          <Paper key={item.label} sx={{ flex: 1, p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
              {item.value}
            </Typography>
            <Chip
              label={item.tone === 'default' ? 'snapshot' : item.tone}
              color={item.tone === 'default' ? 'default' : item.tone}
              size="small"
              sx={{ mt: 1 }}
            />
          </Paper>
        ))}
      </Stack>

      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={1} sx={{ p: 2.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Catálogo de archivos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estado en tiempo real por versión desplegada.
            </Typography>
          </Box>
          <Chip label={loading ? 'syncing' : `${summary.total} items`} size="small" />
        </Stack>
        <Divider />

        <Box sx={{ px: 2.5, pb: 2.5, pt: 1.5 }}>
          {error ? (
            <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed' }}>
              <Typography color="error.main" sx={{ fontWeight: 600 }}>
                {error}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verifica la conexión con la API e intenta nuevamente.
              </Typography>
            </Paper>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Versión</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {file.originalName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{file.version}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        color={file.isActive ? 'success' : 'default'}
                        label={file.isActive ? 'Activo' : 'Inactivo'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && files.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Paper variant="outlined" sx={{ p: 2, borderStyle: 'dashed' }}>
                        <Typography sx={{ fontWeight: 600 }}>Sin archivos aún</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sube tu primer archivo para comenzar a versionar.
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

type FileSummary = {
  id: string;
  originalName: string;
  version: string | number;
  isActive: boolean;
};
