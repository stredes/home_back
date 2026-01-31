import { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useAuth } from '../auth/auth.context';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    login(res.data.accessToken);
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" gutterBottom>
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
