import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';

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
      <Grid container spacing={2}>
        {cards.map((c) => (
          <Grid item xs={12} md={4} key={c.label}>
            <Card>
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
          </Grid>
        ))}
      </Grid>
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
