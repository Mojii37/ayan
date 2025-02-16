import { Paper, Typography, Divider } from '@mui/material';

export const ResultDisplay = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        نتیجه محاسبات
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>درآمد مشمول مالیات: ۱۰۰,۰۰۰,۰۰۰ ریال</Typography>
      <Typography>مالیات قابل پرداخت: ۲۰,۰۰۰,۰۰۰ ریال</Typography>
    </Paper>
  );
};
