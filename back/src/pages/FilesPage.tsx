import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function FilesPage() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    api.get('/files').then((res) => setFiles(res.data.items || []));
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Archivos
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }}>
        Subir archivo
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Versión</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.originalName}</TableCell>
              <TableCell>{f.version}</TableCell>
              <TableCell>{f.isActive ? 'Activo' : 'Inactivo'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
