// src/components/admin/settings/PaymentSettings.tsx
import React from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Grid,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PaymentSettings as PaymentSettingsType } from '../../../types/settings';

interface PaymentSettingsProps {
  settings: PaymentSettingsType;
  onSave: (settings: PaymentSettingsType) => Promise<void>;
}

const validationSchema = Yup.object({
  merchantId: Yup.string().required('شناسه درگاه الزامی است'),
  callbackUrl: Yup.string()
    .url('آدرس بازگشت نامعتبر است')
    .required('آدرس بازگشت الزامی است'),
  minAmount: Yup.number().min(1000, 'حداقل مبلغ ۱,۰۰۰ ریال است'),
  maxAmount: Yup.number().min(
    Yup.ref('minAmount'),
    'حداکثر مبلغ باید بیشتر از حداقل مبلغ باشد'
  ),
});

export const PaymentSettings: React.FC<PaymentSettingsProps> = ({
  settings,
  onSave,
}) => {
  const formik = useFormik({
    initialValues: settings,
    validationSchema,
    onSubmit: async values => {
      try {
        await onSave(values);
      } catch (error) {
        console.error('Error saving payment settings:', error);
      }
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تنظیمات درگاه پرداخت
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="merchantId"
              label="شناسه درگاه"
              value={formik.values.merchantId}
              onChange={formik.handleChange}
              error={
                formik.touched.merchantId && Boolean(formik.errors.merchantId)
              }
              helperText={formik.touched.merchantId && formik.errors.merchantId}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="callbackUrl"
              label="آدرس بازگشت"
              value={formik.values.callbackUrl}
              onChange={formik.handleChange}
              error={
                formik.touched.callbackUrl && Boolean(formik.errors.callbackUrl)
              }
              helperText={
                formik.touched.callbackUrl && formik.errors.callbackUrl
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="minAmount"
              label="حداقل مبلغ (ریال)"
              type="number"
              value={formik.values.minAmount}
              onChange={formik.handleChange}
              error={
                formik.touched.minAmount && Boolean(formik.errors.minAmount)
              }
              helperText={formik.touched.minAmount && formik.errors.minAmount}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="maxAmount"
              label="حداکثر مبلغ (ریال)"
              type="number"
              value={formik.values.maxAmount}
              onChange={formik.handleChange}
              error={
                formik.touched.maxAmount && Boolean(formik.errors.maxAmount)
              }
              helperText={formik.touched.maxAmount && formik.errors.maxAmount}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="sandbox"
                  checked={formik.values.sandbox}
                  onChange={formik.handleChange}
                />
              }
              label="حالت آزمایشی"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={formik.isSubmitting}
              >
                ذخیره تنظیمات
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
