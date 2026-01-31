import { Card, CardContent, Grid, Typography } from '@mui/material';

const cards = [
  { label: 'Usuarios activos', value: '—' },
  { label: 'Archivos activos', value: '—' },
  { label: 'Descargas hoy', value: '—' },
];

export default function DashboardPage() {
  return (
    <Grid container spacing={2}>
      {cards.map((c) => (
        <Grid item xs={12} md={4} key={c.label}>
          <Card>
            <CardContent>
              <Typography variant="overline">{c.label}</Typography>
              <Typography variant="h4">{c.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
