import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ZarinpalService } from './ZarinpalService';
import { PaymentRequest, PaymentResponse } from '../../types/payment.types';

interface PaymentFormProps {
  amount: number;
  description: string;
  onError: (error: string) => void;
  onSuccess?: (response: PaymentResponse) => void;
  userInfo?: {
    mobile?: string;
    email?: string;
  };
  metadata?: Record<string, unknown>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  description,
  onError,
  onSuccess,
  userInfo,
  metadata
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const paymentRequest: PaymentRequest = {
        amount,
        description,
        callbackUrl: '/payment/verify',
        mobile: userInfo?.mobile,
        email: userInfo?.email,
        metadata
      };

      const response = await ZarinpalService.requestPayment(paymentRequest);
      
      if (onSuccess) {
        onSuccess(response);
      }

      // Save payment amount in localStorage for verification
      localStorage.setItem('payment_amount', amount.toString());
      
      // Redirect to the payment gateway
      window.location.href = response.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error connecting to payment gateway';
      setErrorMessage(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom align="center">
        اطلاعات پرداخت
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          مبلغ قابل پرداخت:
        </Typography>
        <Typography variant="h5" color="primary">
          {new Intl.NumberFormat('fa-IR').format(amount)} ریال
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'پرداخت آنلاین'
        )}
      </Button>
    </Paper>
  );
};