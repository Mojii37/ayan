// src/components/admin/transactions/FinancialReport.tsx
import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
} from '@mui/icons-material';
import { TransactionSummary } from '../../../types/transaction';

interface FinancialReportProps {
  summary: TransactionSummary;
  dailyData: Array<{
    date: string;
    income: number;
    transactions: number;
  }>;
}

export const FinancialReport: React.FC<FinancialReportProps> = ({
  summary,
  dailyData,
}) => {
  const theme = useTheme();

  const statsCards = [
    {
      title: 'درآمد کل',
      value: new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
      }).format(summary.totalAmount),
      icon: <AccountBalance />,
      color: theme.palette.primary.main,
    },
    {
      title: 'تراکنش‌های موفق',
      value: summary.successfulCount,
      icon: <TrendingUp />,
      color: theme.palette.success.main,
    },
    {
      title: 'تراکنش‌های ناموفق',
      value: summary.failedCount,
      icon: <TrendingDown />,
      color: theme.palette.error.main,
    },
    {
      title: 'مبلغ بازگشتی',
      value: new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
      }).format(summary.refundedAmount),
      icon: <Receipt />,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {statsCards.map(card => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${card.color}20`,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography color="textSecondary">{card.title}</Typography>
                </Box>
                <Typography variant="h5" sx={{ color: card.color }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              نمودار درآمد روزانه
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke={theme.palette.primary.main}
                  name="درآمد"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              تعداد تراکنش‌های روزانه
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="transactions"
                  fill={theme.palette.primary.main}
                  name="تراکنش‌ها"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
