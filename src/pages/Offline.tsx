// src/pages/Offline.tsx
import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { WifiOff, Refresh } from '@mui/icons-material';

export const Offline: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Paper sx={{ p: 4 }}>
          <WifiOff sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            عدم دسترسی به اینترنت
          </Typography>
          <Typography color="text.secondary" paragraph>
            متأسفانه در حال حاضر به اینترنت دسترسی ندارید. برخی از امکانات در
            حالت آفلاین در دسترس هستند.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ mt: 2 }}
          >
            تلاش مجدد
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
