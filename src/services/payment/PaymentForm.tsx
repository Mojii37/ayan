import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ZarinpalService } from './ZarinPal';

interface PaymentFormProps {
  amount: number;
  description: string;
  onError: (error: string) => void;
  userInfo?: {
    mobile?: string;
    email?: string;
  };
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  description,
  onError,
  userInfo,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const callbackUrl = `${window.location.origin}/payment/verify`;
      const response = await ZarinpalService.requestPayment({
        amount,
        description,
        callbackUrl,
        mobile: userInfo?.mobile,
        email: userInfo?.email,
      });

      // Redirect to the payment gateway
      window.location.href = response.url;
    } catch (_error) {
      const message = 'Error connecting to payment gateway';
      setErrorMessage(message);
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom align="center">
        Payment Information
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Amount to Pay:
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
          'Pay Online'
        )}
      </Button>
    </Paper>
  );
};