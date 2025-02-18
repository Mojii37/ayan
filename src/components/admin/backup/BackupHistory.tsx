// src/components/admin/backup/BackupHistory.tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Button 
} from '@mui/material';

interface BackupHistoryItem {
  id: string;
  date: string;
  type: 'database' | 'files';
  status: 'successful' | 'failed';
  size: string;
}

const BackupHistory: React.FC = () => {
  const [backupHistory, setBackupHistory] = useState<BackupHistoryItem[]>([
    {
      id: '1',
      date: '۱۴۰۲/۰۹/۱۵ ساعت ۱۴:۳۰',
      type: 'database',
      status: 'successful',
      size: '۲.۵ گیگابایت'
    },
    {
      id: '2',
      date: '۱۴۰۲/۰۹/۱۰ ساعت ۰۹:۱۵',
      type: 'files',
      status: 'failed',
      size: '۳.۱ گیگابایت'
    }
  ]);

  const getStatusColor = (status: string) => {
    return status === 'successful' ? 'green' : 'red';
  };

  const handleDownloadBackup = (id: string) => {
    // TODO: Implement backup download logic
    console.log(`دانلود بکاپ با شناسه ${id}`);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تاریخچه بکاپ‌ها
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>تاریخ</TableCell>
              <TableCell>نوع</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>حجم</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {backupHistory.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>{backup.date}</TableCell>
                <TableCell>{backup.type === 'database' ? 'پایگاه داده' : 'فایل‌ها'}</TableCell>
                <TableCell>
                  <Typography 
                    color={getStatusColor(backup.status)}
                    variant="body2"
                  >
                    {backup.status === 'successful' ? 'موفق' : 'ناموفق'}
                  </Typography>
                </TableCell>
                <TableCell>{backup.size}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleDownloadBackup(backup.id)}
                    disabled={backup.status !== 'successful'}
                  >
                    دانلود
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BackupHistory;