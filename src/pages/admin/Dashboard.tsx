import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Article, School, People, Payment } from '@mui/icons-material';

// داده‌های آماری برای نمایش در کارت‌ها
const statsData = [
  {
    title: 'مقالات',
    count: 145,
    icon: <Article />,
    color: '#2196F3',
  },
  {
    title: 'آموزش‌ها',
    count: 89,
    icon: <School />,
    color: '#4CAF50',
  },
  {
    title: 'کاربران',
    count: 1234,
    icon: <People />,
    color: '#FF9800',
  },
  {
    title: 'درآمد ماه',
    count: '۱۲,۵۰۰,۰۰۰',
    icon: <Payment />,
    color: '#F44336',
  },
];

// داده‌های نمودار
const chartData = [
  { name: 'فروردین', visits: 4000, revenue: 2400 },
  { name: 'اردیبهشت', visits: 3000, revenue: 1398 },
  { name: 'خرداد', visits: 2000, revenue: 9800 },
  { name: 'تیر', visits: 2780, revenue: 3908 },
  { name: 'مرداد', visits: 1890, revenue: 4800 },
  { name: 'شهریور', visits: 2390, revenue: 3800 },
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        داشبورد مدیریت
      </Typography>

      <Grid container spacing={3}>
        {statsData.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {React.cloneElement(stat.icon as React.ReactElement, {
                  sx: { fontSize: 40, color: stat.color },
                })}
              </Box>
              <Typography variant="h4" sx={{ mt: 'auto', color: stat.color }}>
                {stat.count}
              </Typography>
              <Typography color="text.secondary">{stat.title}</Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              آمار بازدید و درآمد
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#2196F3" name="بازدید" />
                <Bar dataKey="revenue" fill="#4CAF50" name="درآمد" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              وضعیت سیستم
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                فضای ذخیره‌سازی
              </Typography>
              <LinearProgress variant="determinate" value={70} sx={{ mb: 1 }} />
              <Typography variant="body2">70% استفاده شده</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                پردازش سرور
              </Typography>
              <LinearProgress variant="determinate" value={45} sx={{ mb: 1 }} />
              <Typography variant="body2">45% استفاده شده</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;