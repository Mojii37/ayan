// src/pages/PaymentVerification.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { ZarinpalService } from '../services/payment/zarinpal';
import { CheckCircle, Error } from '@mui/icons-material';

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [refId, setRefId] = useState<number | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const authority = searchParams.get('Authority');
      const status = searchParams.get('Status');

      if (!authority || status !== 'OK') {
        setStatus('error');
        setLoading(false);
        return;
      }

      try {
        // مقدار amount باید از سشن یا ریداکس خوانده شود
        const amount = Number(localStorage.getItem('payment_amount'));
        const result = await ZarinpalService.verifyPayment({
          authority,
          amount,
        });

        setRefId(result.refId);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        {status === 'success' ? (
          <>
            <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              پرداخت با موفقیت انجام شد
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              شماره پیگیری: {refId}
            </Typography>
          </>
        ) : (
          <>
            <Error sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              پرداخت ناموفق
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              متاسفانه مشکلی در پرداخت بوجود آمده است
            </Typography>
          </>
        )}

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate('/')}
        >
          بازگشت به صفحه اصلی
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentVerification;
