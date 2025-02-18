// src/components/admin/analytics/KeyMetrics.tsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { 
  AccountCircle as UsersIcon, 
  AttachMoney as RevenueIcon, 
  Article as ContentIcon 
} from '@mui/icons-material';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, color }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 2, 
      display: 'flex', 
      alignItems: 'center', 
      height: '100%' 
    }}
  >
    <Box 
      sx={{ 
        backgroundColor: color, 
        color: 'white', 
        borderRadius: '50%', 
        p: 1, 
        mr: 2 
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Box>
  </Paper>
);

const KeyMetrics: React.FC = () => {
  // این مقادیر باید از سرویس یا API دریافت شوند
  const metrics = [
    {
      icon: <UsersIcon />,
      title: 'کاربران فعال',
      value: '1,256',
      color: '#3f51b5'
    },
    {
      icon: <RevenueIcon />,
      title: 'درآمد ماهانه',
      value: '۵۰,۰۰۰,۰۰۰ تومان',
      color: '#4caf50'
    },
    {
      icon: <ContentIcon />,
      title: 'مقالات منتشر شده',
      value: '۱۲۳',
      color: '#ff9800'
    }
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} md={4} key={index}>
          <MetricCard 
            icon={metric.icon}
            title={metric.title}
            value={metric.value}
            color={metric.color}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default KeyMetrics;