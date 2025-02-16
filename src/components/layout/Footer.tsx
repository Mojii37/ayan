import React from 'react';
import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} My Application
      </Typography>
    </Box>
  );
}
