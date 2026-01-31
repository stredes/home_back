import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    api.get('/audit').then((res) => setLogs(res.data.items || []));
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Auditoría
      </Typography>
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
          {logs.map((l) => (
            <TableRow key={l.id}>
              <TableCell>{l.actorUserId}</TableCell>
              <TableCell>{l.action}</TableCell>
              <TableCell>{l.entity}</TableCell>
              <TableCell>{new Date(l.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

type AuditLog = {
  id: string;
  actorUserId: string;
  action: string;
  entity: string;
  createdAt: string;
};
