// src/components/admin/analytics/PerformanceChart.tsx
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Paper, 
  Typography, 
  Grid, 
  Box 
} from '@mui/material';

// Sample data (replace with actual data from your backend)
const performanceData = [
  { month: 'فروردین', visitors: 4000, revenue: 2400 },
  { month: 'اردیبهشت', visitors: 3000, revenue: 1398 },
  { month: 'خرداد', visitors: 2000, revenue: 9800 },
  { month: 'تیر', visitors: 2780, revenue: 3908 },
  { month: 'مرداد', visitors: 1890, revenue: 4800 },
  { month: 'شهریور', visitors: 2390, revenue: 3800 },
];

export const PerformanceChart: React.FC = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        عملکرد ماهانه
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box height={300}>
            <Typography variant="subtitle1" align="center">
              بازدیدکنندگان
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height={300}>
            <Typography variant="subtitle1" align="center">
              درآمد
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PerformanceChart;