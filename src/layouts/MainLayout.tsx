// src/layouts/MainLayout.tsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {/* Consider adding error handling or loading states here */}
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
