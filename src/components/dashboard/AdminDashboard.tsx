import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Refresh,
  MoreVert,
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  Warning,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DashboardStats } from '../../types/dashboard';

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num);
};

interface Props {
  stats: DashboardStats;
  loading?: boolean;
  error?: string;
  onRefresh: () => void;
}

export const AdminDashboard: React.FC<Props> = ({
  stats,
  loading,
  error,
  onRefresh,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const StatCard = ({
    title,
    value,
    icon,
    trend,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    trend?: number;
  }) => (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4">{formatNumber(value)}</Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: '50%',
            bgcolor: theme.palette.primary.light,
          }}
        >
          {icon}
        </Box>
      </Box>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend > 0 ? (
            <TrendingUp color="success" />
          ) : (
            <TrendingDown color="error" />
          )}
          <Typography
            variant="body2"
            color={trend > 0 ? 'success.main' : 'error.main'}
            sx={{ ml: 1 }}
          >
            {Math.abs(trend)}% نسبت به ماه قبل
          </Typography>
        </Box>
      )}
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          داشبورد مدیریت - {new Date().toLocaleDateString('fa-IR')}
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onRefresh}
            disabled={loading}
          >
            بروزرسانی
          </Button>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StatCard
              title="کاربران فعال"
              value={stats.activeUsers}
              icon={<People color="primary" />}
              trend={5}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="سفارشات جدید"
              value={stats.newOrders}
              icon={<ShoppingCart color="primary" />}
              trend={-2}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="درآمد کل"
              value={stats.totalRevenue}
              icon={<AttachMoney color="primary" />}
              trend={8}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              title="هشدارها"
              value={stats.alerts.length}
              icon={<Warning color="primary" />}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                آمار فروش
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={
                    [
                      /* داده‌های نمودار */
                    ]
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.light}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                وضعیت سیستم
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={stats.systemHealth.cpu}
                      color={stats.systemHealth.cpu > 80 ? 'error' : 'primary'}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    >
                      <Typography variant="caption">CPU</Typography>
                    </Box>
                  </Box>
                </Grid>
                {/* مشابه برای Memory و Disk */}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">فعالیت‌های اخیر</Typography>
                <IconButton size="small" onClick={onRefresh}>
                  <Refresh />
                </IconButton>
              </Box>
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {stats.recentActivities.map(activity => (
                  <Box
                    key={activity.id}
                    sx={{
                      py: 1,
                      borderBottom: 1,
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 0 },
                    }}
                  >
                    <Typography variant="subtitle2">{activity.action}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.user} •{' '}
                      {new Date(activity.timestamp).toLocaleTimeString('fa-IR')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                هشدارها
              </Typography>
              {stats.alerts.map(alert => (
                <Box
                  key={alert.id}
                  sx={{
                    p: 1,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor:
                      alert.type === 'error'
                        ? 'error.light'
                        : alert.type === 'warning'
                          ? 'warning.light'
                          : 'info.light',
                  }}
                >
                  <Typography variant="body2">{alert.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(alert.timestamp).toLocaleString('fa-IR')}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            // اکسپورت داشبورد به PDF
          }}
        >
          خروجی PDF
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            // تنظیمات داشبورد
          }}
        >
          تنظیمات
        </MenuItem>
      </Menu>
    </Box>
  );
};
