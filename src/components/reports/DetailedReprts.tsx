import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { 
  AnalyticsData, 
  UserAnalytics, 
  RevenueAnalytics, 
  ConsultationAnalytics 
} from '../../types/analytics';

interface DetailedReportsProps {
  data: AnalyticsData;
}

type ReportType = 'users' | 'revenue' | 'consultations';

type ReportDataType = {
  users: UserAnalytics;
  revenue: RevenueAnalytics;
  consultations: ConsultationAnalytics;
};


interface TableConfig<T> {
  headers: string[];
  getRowData: (item: T) => React.ReactNode[];
}

const REPORT_TYPES: Record<ReportType, string> = {
  users: 'کاربران',
  revenue: 'درآمد',
  consultations: 'مشاوره‌ها',
} as const;

const TABLE_CONFIGS: {
  [K in ReportType]: TableConfig<ReportDataType[K]>
} = {
  users: {
    
    headers: ['نام کاربر', 'تاریخ عضویت', 'تعداد مشاوره', 'مجموع پرداخت'],
    getRowData: (user: UserAnalytics) => [
      user.name,
      new Date(user.joinDate).toLocaleDateString('fa-IR'),
      user.consultationCount,
      new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
      }).format(user.totalPayment),
    ],
  },
  revenue: {
    headers: ['تاریخ', 'نوع خدمت', 'تعداد', 'مبلغ کل'],
    getRowData: (revenue: RevenueAnalytics) => [
      new Date(revenue.date).toLocaleDateString('fa-IR'),
      revenue.serviceType,
      revenue.count,
      new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
      }).format(revenue.totalAmount),
    ],
  },
  consultations: {
    headers: ['تاریخ', 'مشاور', 'کاربر', 'وضعیت', 'امتیاز'],
    getRowData: (consultation: ConsultationAnalytics) => [
      new Date(consultation.date).toLocaleDateString('fa-IR'),
      consultation.advisorName,
      consultation.userName,
      consultation.status,
      consultation.rating,
    ],
  },
};

export const DetailedReports = ({ data }: DetailedReportsProps): JSX.Element => {
  const [reportType, setReportType] = useState<ReportType>('users');

  const handleGenerateReport = async (): Promise<void> => {
    try {
      console.info(`Generating ${reportType} report...`);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const currentConfig = useMemo(() => TABLE_CONFIGS[reportType], [reportType]);
  
  const reportData = useMemo(() => {
    return data[reportType]?.data ?? [];
  }, [data, reportType]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          گزارش‌های تفصیلی
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <ButtonGroup variant="outlined">
            {(Object.entries(REPORT_TYPES) as [ReportType, string][]).map(([type, label]) => (
              <Button
                key={`btn-${type}`}
                onClick={() => setReportType(type)}
                variant={reportType === type ? 'contained' : 'outlined'}
                sx={{ minWidth: 100 }}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
          <Button
            startIcon={<Download />}
            onClick={handleGenerateReport}
            variant="contained"
            color="primary"
          >
            دریافت گزارش
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {currentConfig.headers.map((header, index) => (
                <TableCell key={`header-${index}`}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           {reportData.map((item, index) => (
           <TableRow key={`row-${index}`}>
              {currentConfig.getRowData(item as ReportDataType[typeof reportType]).map(
          (cell, cellIndex) => (
          <TableCell key={`cell-${index}-${cellIndex}`}>{cell}</TableCell>
                 )
                    )}
                   </TableRow>
                   ))}
                 </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DetailedReports;