import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import { TaxCalculator } from '../../services/tax/TaxCalculator';

interface FormData {
  income: string;
  costs: string;
  type: 'personal' | 'business';
}

export const TaxCalculatorForm = () => {
  const [formData, setFormData] = useState<FormData>({
    income: '',
    costs: '',
    type: 'personal',
  });
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const tax = TaxCalculator.calculateIncomeTax({
      income: Number(formData.income),
      costs: Number(formData.costs),
      type: formData.type,
    });
    setResult(tax);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>نوع مالیات</InputLabel>
          <Select
            name="type"
            value={formData.type}
            label="نوع مالیات"
            onChange={handleChange}
          >
            <MenuItem value="personal">شخصی</MenuItem>
            <MenuItem value="business">تجاری</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="درآمد سالیانه"
          name="income"
          type="number"
          value={formData.income}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="هزینه‌های قابل کسر"
          name="costs"
          type="number"
          value={formData.costs}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Button variant="contained" type="submit" fullWidth>
          محاسبه مالیات
        </Button>

        {result !== null && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6">
              مالیات قابل پرداخت: {result.toLocaleString()} ریال
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};