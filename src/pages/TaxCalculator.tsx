import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { TaxCalculatorForm } from '../components/tax/TaxCalculatorForm';

const TaxCalculatorPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          محاسبه‌گر مالیات آیان تراز
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 4 }}
        >
          با استفاده از این ابزار می‌توانید مالیات خود را به صورت دقیق محاسبه
          کنید
        </Typography>

        <TaxCalculatorForm />
      </Box>
    </Container>
  );
};

export default TaxCalculatorPage;
