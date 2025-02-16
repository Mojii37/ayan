import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  MoreVert,
  Refresh,
  FilterList,
} from '@mui/icons-material'; 
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers';
import { ReportConfig, ReportData } from '../../types/report';

interface Props {
  config: ReportConfig;
  data: ReportData;
  loading?: boolean;
  error?: string;
  onRefresh: () => void;
  onExport: (format: 'pdf' | 'excel' | 'csv') => void;
  onConfigChange: (config: ReportConfig) => void;
}
export const ReportViewer: React.FC<Props> = ({
  config,
  data,
  loading,
  error,
  onRefresh,
  onExport,
  onConfigChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: config.customRange?.start || new Date(),
    end: config.customRange?.end || new Date(),
  });

  useEffect(() => {
    const interval =
      config.refreshInterval &&
      setInterval(onRefresh, config.refreshInterval * 1000);
    return () => interval && clearInterval(interval);
  }, [config.refreshInterval, onRefresh]);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    setAnchorEl(null);
    onExport(format);
  };

  const renderChart = () => {
    if (!config.chart) return null;

    const ChartComponent = {
      bar: BarChart,
      line: LineChart,
      pie: PieChart,
      area: AreaChart,
    }[config.chart.type];

    const DataComponent = {
      bar: Bar,
      line: Line,
      pie: Pie,
      area: Area,
    }[config.chart.type];

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <ResponsiveContainer>
          <ChartComponent data={data.rows}>
            {config.chart.type !== 'pie' && (
              <>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={config.chart.xAxis} />
                <YAxis />
              </>
            )}
            <Tooltip />
            <Legend />
            {config.chart.yAxis.map((axis, index) => (
              <DataComponent
                key={axis}
                type="monotone"
                dataKey={axis}
                stackId={config.chart.stacked ? '1' : undefined}
                fill={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderTable = () => {
    const columns: GridColDef[] =
      config.columns?.map(col => ({
        field: col.field,
        headerName: col.title,
        flex: 1,
        type: col.type,
        valueFormatter: col.format
          ? params => new Intl.NumberFormat('fa-IR').format(params.value)
          : undefined,
      })) || [];

    return (
      <DataGrid
        rows={data.rows}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={data.metadata?.total || 0}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{ height: 400 }}
      />
    );
  };

  const renderSummary = () => {
    if (!data.summary) return null;

    return (
      <Grid container spacing={3}>
        {Object.entries(data.summary).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {key}
              </Typography>
              <Typography variant="h4">
                {new Intl.NumberFormat('fa-IR').format(value)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">{config.title}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            فیلترها
          </Button>
          <Button
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

      {showFilters && (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <DatePicker
                label="از تاریخ"
                value={dateRange.start}
                onChange={date =>
                  setDateRange({ ...dateRange, start: date || new Date() })
                }
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="تا تاریخ"
                value={dateRange.end}
                onChange={date =>
                  setDateRange({ ...dateRange, end: date || new Date() })
                }
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                onClick={() =>
                  onConfigChange({
                    ...config,
                    customRange: dateRange,
                  })
                }
              >
                اعمال فیلتر
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !error && (
        <>
          {config.type === 'chart' && renderChart()}
          {config.type === 'table' && renderTable()}
          {config.type === 'summary' && renderSummary()}
        </>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleExport('pdf')}>خروجی PDF</MenuItem>
        <MenuItem onClick={() => handleExport('excel')}>خروجی Excel</MenuItem>
        <MenuItem onClick={() => handleExport('csv')}>خروجی CSV</MenuItem>
      </Menu>
    </Paper>
  );
};
