import { useState } from 'react';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useAuth } from '../auth/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (!res.data?.accessToken) {
        setError('No se recibió token de acceso');
        return;
      }
      login(res.data.accessToken);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message || 'Credenciales inválidas');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: 'min(980px, 100%)',
          p: { xs: 3, md: 5 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="overline" color="text.secondary">
            SECURE ACCESS
          </Typography>
          <Typography variant="h3" sx={{ lineHeight: 1.1 }}>
            Control de Descargas
          </Typography>
          <Typography color="text.secondary">
            Consola técnica para auditoría, usuarios y archivos. Autenticación
            endurecida con refresh seguro y storage local para entorno dev.
          </Typography>
          <Divider sx={{ borderColor: 'rgba(148,163,184,0.2)' }} />
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Credenciales locales
            </Typography>
            <Typography variant="body2">admin@local.test</Typography>
            <Typography variant="body2">secret</Typography>
          </Box>
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h5">Iniciar sesión</Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error ? <Typography color="error">{error}</Typography> : null}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message;
  }
  return undefined;
}
