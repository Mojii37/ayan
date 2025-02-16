import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useAppSelector } from '../store';

export const DevTools: React.FC = () => {
  const auth = useAppSelector(state => state.auth);
  const ui = useAppSelector(state => state.ui);

  const clearLocalStorage = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  const isDevelopment = import.meta.env.DEV;

  return isDevelopment ? (
    <Paper
      sx={{ p: 2, m: 2, position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}
    >
      <Typography variant="h6">DevTools</Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Auth State:</Typography>
        <pre style={{ maxHeight: '100px', overflow: 'auto' }}>
          {JSON.stringify(auth, null, 2)}
        </pre>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">UI State:</Typography>
        <pre style={{ maxHeight: '100px', overflow: 'auto' }}>
          {JSON.stringify(ui, null, 2)}
        </pre>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={clearLocalStorage}
        >
          پاک کردن LocalStorage
        </Button>
      </Box>
    </Paper>
  ) : null;
};
