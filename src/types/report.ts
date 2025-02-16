export type ReportType = 'table' | 'chart' | 'summary';
export type ChartType = 'bar' | 'line' | 'pie' | 'area';
export type TimeRange = 'today' | 'week' | 'month' | 'year' | 'custom';
export type DataType = 'text' | 'number' | 'date' | 'boolean';
export type FilterOperator = 'eq' | 'gt' | 'lt' | 'contains' | 'between';
export type DateFormatPattern = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface ReportFilter {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | Date | DateRange;
}

export interface ReportColumn {
  field: string;
  title: string;
  type: DataType;
  formatPattern?: DateFormatPattern;
}

export interface ChartConfig {
  type: ChartType;
  xAxis: string;
  yAxis: string[];
  stacked?: boolean;
}

export interface ReportConfig {
  id: string;
  title: string;
  type: ReportType;
  dataSource: string;
  filters: ReportFilter[];
  columns?: ReportColumn[];
  chart?: ChartConfig;
  timeRange?: TimeRange;
  customRange?: DateRange;
  refreshInterval?: number;
}

export interface ReportSummary {
  [key: string]: number;
}

export interface ReportMetadata {
  total: number;
  filtered: number;
  page: number;
  pageSize: number;
}

export interface ReportData<T = Record<string, unknown>> {
  columns: string[];
  rows: T[];
  summary?: ReportSummary;
  metadata?: ReportMetadata;
}

export const isDateRange = (value: unknown): value is DateRange => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'start' in value &&
    'end' in value &&
    value.start instanceof Date &&
    value.end instanceof Date
  );
};

export const isValidFilterValue = (
  value: unknown,
  type: DataType
): value is string | number | boolean | Date | DateRange => {
  switch (type) {
    case 'text':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'date':
      return value instanceof Date || isDateRange(value);
    default:
      return false;
  }
};

export type TypedReportConfig<T> = Omit<ReportConfig, 'columns'> & {
  columns?: Array<ReportColumn & { field: keyof T }>;
};

export interface UserReportData {
  id: string;
  name: string;
  joinDate: Date;
  active: boolean;
  visits: number;
}

export const createUserReport = (): TypedReportConfig<UserReportData> => ({
  id: 'user-report',
  title: 'گزارش فعالیت کاربران',
  type: 'table',
  dataSource: 'users',
  filters: [],
  columns: [
    { field: 'name', title: 'نام کاربر', type: 'text' },
    { field: 'joinDate', title: 'تاریخ عضویت', type: 'date', formatPattern: 'YYYY-MM-DD HH:mm:ss' },
    { field: 'active', title: 'وضعیت', type: 'boolean' },
    { field: 'visits', title: 'تعداد بازدید', type: 'number' }
  ]
});

export const DEFAULT_PAGE_SIZE = 20;

export const REFRESH_INTERVALS = {
  FAST: 30,
  NORMAL: 300,
  SLOW: 3600,
} as const;

export const formatters = {
  date: (value: Date, pattern: DateFormatPattern = 'YYYY-MM-DD'): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    if (pattern.includes('HH:mm:ss')) {
      Object.assign(options, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }

    return new Intl.DateTimeFormat('fa-IR', options).format(value);
  },
  number: (value: number): string => {
    return new Intl.NumberFormat('fa-IR').format(value);
  },
  boolean: (value: boolean): string => {
    return value ? 'فعال' : 'غیرفعال';
  }
};