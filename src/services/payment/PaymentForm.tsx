import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ZarinpalService } from '../../services/payment/zarinpal';

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
  const [error, setError] = React.useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const callbackUrl = `${window.location.origin}/payment/verify`;
      const response = await ZarinpalService.requestPayment({
        amount,
        description,
        callbackUrl,
        mobile: userInfo?.mobile,
        email: userInfo?.email,
      });

      // ریدایرکت به درگاه پرداخت
      window.location.href = response.url;
    } catch (err) {
      setError('خطا در اتصال به درگاه پرداخت');
      onError('خطا در اتصال به درگاه پرداخت');
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
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