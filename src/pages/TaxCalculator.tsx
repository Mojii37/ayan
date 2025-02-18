import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { TaxCalculatorForm } from '../components/tax/TaxCalculatorForm';

const TaxCalculatorPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Tax Calculator
        </Typography>
        <TaxCalculatorForm />
      </Box>
    </Container>
  );
};

export default TaxCalculatorPage;