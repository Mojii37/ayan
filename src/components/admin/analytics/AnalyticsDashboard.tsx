// src/components/admin/analytics/AnalyticsDashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  People,
  Visibility,
  TrendingUp,
  Assignment,
} from '@mui/icons-material';

// تعریف تایپ‌های اطلاعاتی
interface AnalyticsData {
  users: {
    active: number;
    growth: number;
    byLocation: Array<{ city: string; count: number }>;
  };
  visitors: {
    total: number;
    unique: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    byService: Array<{ service: string; amount: number }>;
  };
  consultations: {
    total: number;
    satisfaction: number;
  };
  pageViews: {
    mostVisited: Array<{ path: string; views: number }>;
  };
}

interface TimeRange {
  start: Date;
  end: Date;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  onTimeRangeChange: (range: TimeRange) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const TIME_RANGES = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
} as const;

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}> = ({ icon, title, value, subtitle, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: `${color}20`,
            color,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography color="textSecondary">{title}</Typography>
      </Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const ChartContainer: React.FC<{
  title: string;
  children: React.ReactElement;
}> = ({ title, children }) => (
  <Paper sx={{ p: 3, height: 400 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Box sx={{ width: '100%', height: '90%' }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </Box>
  </Paper>
);

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  data, 
  onTimeRangeChange 
}) => {
  const [timeRange, setTimeRange] = useState<keyof typeof TIME_RANGES>('7d');

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    const range = event.target.value as keyof typeof TIME_RANGES;
    setTimeRange(range);
    
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - TIME_RANGES[range]);
    
    onTimeRangeChange({ start, end });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
    }).format(amount);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">داشبورد تحلیلی</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>بازه زمانی</InputLabel>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="بازه زمانی"
          >
            <MenuItem value="7d">۷ روز گذشته</MenuItem>
            <MenuItem value="30d">۳۰ روز گذشته</MenuItem>
            <MenuItem value="90d">۹۰ روز گذشته</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<People />}
            title="کاربران فعال"
            value={data.users.active}
            subtitle={`${data.users.growth}% رشد نسبت به ماه قبل`}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Visibility />}
            title="بازدیدکنندگان"
            value={data.visitors.total}
            subtitle={`${data.visitors.unique} بازدید یکتا`}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<TrendingUp />}
            title="درآمد"
            value={formatCurrency(data.revenue.total)}
            subtitle={`${formatCurrency(data.revenue.thisMonth)} در این ماه`}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Assignment />}
            title="مشاوره‌ها"
            value={data.consultations.total}
            subtitle={`${data.consultations.satisfaction}% رضایت‌مندی`}
            color="#F44336"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <ChartContainer title="روند بازدید">
            <LineChart data={data.pageViews.mostVisited}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="path" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#2196F3"
                name="تعداد بازدید"
              />
            </LineChart>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartContainer title="درآمد به تفکیک خدمات">
            <PieChart>
              <Pie
                data={data.revenue.byService}
                dataKey="amount"
                nameKey="service"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.revenue.byService.map((entry, index) => (
                  <Cell
                    key={`pie-cell-${entry.service}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </Grid>

        <Grid item xs={12}>
          <ChartContainer title="پراکندگی کاربران">
            <BarChart data={data.users.byLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="count"
                fill="#2196F3"
                name="تعداد کاربران"
              />
            </BarChart>
          </ChartContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;