import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface SecurityLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  user: string;
  ip: string;
  action: string;
}

interface SecurityLogsProps {
  logs: SecurityLog[];
}

const levelColors: Record<SecurityLog['level'], 'info' | 'warning' | 'error'> =
  {
    info: 'info',
    warning: 'warning',
    error: 'error',
  };

export const SecurityLogs: React.FC<SecurityLogsProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log =>
    Object.values(log).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box>
      <TextField
        fullWidth
        margin="normal"
        placeholder="جستجو در لاگ‌ها..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>تاریخ</TableCell>
              <TableCell>سطح</TableCell>
              <TableCell>پیام</TableCell>
              <TableCell>کاربر</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString('fa-IR')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={log.level}
                    color={levelColors[log.level]}
                    size="small"
                  />
                </TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
