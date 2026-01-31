import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

const cards = [
  { label: 'Usuarios activos', value: '—' },
  { label: 'Archivos activos', value: '—' },
  { label: 'Descargas hoy', value: '—' },
];

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Panel técnico</Typography>
        <Typography color="text.secondary">
          Estado operativo del sistema y métricas clave.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent>
              <Typography variant="overline">{c.label}</Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                {c.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Última actualización: ahora
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Card>
        <CardContent sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h6">Estado de módulos</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label="Auth: OK" color="primary" variant="outlined" />
            <Chip label="Files: OK" color="primary" variant="outlined" />
            <Chip label="Audit: LOCAL" color="secondary" variant="outlined" />
            <Chip label="Storage: LOCAL" color="primary" variant="outlined" />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
