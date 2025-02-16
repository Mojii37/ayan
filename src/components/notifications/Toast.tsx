// src/components/notifications/Toast.tsx
import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface ToastProps {
  open: boolean;
  type: AlertColor;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  open,
  type,
  message,
  onClose,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
