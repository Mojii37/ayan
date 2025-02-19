import React, { useState, useCallback } from 'react';
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

interface BackupHistoryProps {
  initialBackups?: BackupHistoryItem[];
  onDownload?: (id: string) => void;
  onBackupUpdate?: (backups: BackupHistoryItem[]) => void;
}

const initialBackupData: BackupHistoryItem[] = [
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
];

export const BackupHistory: React.FC<BackupHistoryProps> = ({ 
  initialBackups,
  onDownload,
  onBackupUpdate 
}) => {
  const [backups, setBackups] = useState<BackupHistoryItem[]>(
    initialBackups || initialBackupData
  );

  const updateBackups = useCallback((newBackups: BackupHistoryItem[]) => {
    setBackups(newBackups);
    onBackupUpdate?.(newBackups);
  }, [onBackupUpdate]);

  const updateBackup = useCallback((id: string, newData: Partial<BackupHistoryItem>) => {
    const updatedBackups = backups.map(backup => 
      backup.id === id ? { ...backup, ...newData } : backup
    );
    updateBackups(updatedBackups);
  }, [backups, updateBackups]);

  const addBackup = useCallback((newBackup: BackupHistoryItem) => {
    const updatedBackups = [...backups, newBackup];
    updateBackups(updatedBackups);
  }, [backups, updateBackups]);

  const removeBackup = useCallback((id: string) => {
    const updatedBackups = backups.filter(backup => backup.id !== id);
    updateBackups(updatedBackups);
  }, [backups, updateBackups]);

  const getStatusColor = (status: BackupHistoryItem['status']) => {
    return status === 'successful' ? 'green' : 'red';
  };

  const handleDownloadBackup = (id: string) => {
    if (onDownload) {
      onDownload(id);
    } else {
      console.log(`دانلود بکاپ با شناسه ${id}`);
    }
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
            {backups.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>{backup.date}</TableCell>
                <TableCell>
                  {backup.type === 'database' ? 'پایگاه داده' : 'فایل‌ها'}
                </TableCell>
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