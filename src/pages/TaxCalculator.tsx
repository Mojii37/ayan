import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper 
} from '@mui/material';
import { TaxCalculatorForm } from '../components/tax/TaxCalculatorForm';

const TaxCalculatorPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2, 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
          }}
        >
          <Typography 
            variant="h4" 
            color="primary" 
            align="center" 
            gutterBottom 
            sx={{ mb: 3 }}
          >
            محاسبه‌گر مالیاتی
          </Typography>
          
          <TaxCalculatorForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default TaxCalculatorPage;