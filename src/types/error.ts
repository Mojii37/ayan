export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ErrorSource = 'client' | 'server' | 'network' | 'validation';

export interface ErrorLog {
  id: string;
  timestamp: Date;
  user?: string;
  severity: ErrorSeverity;
  source: ErrorSource;
  message: string;
  stack?: string;
  context: {
    url?: string;
    action?: string;
    component?: string;
    // به جای any از unknown استفاده می‌کنیم که type-safe تر هست
    [key: string]: unknown;
  };
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorDetails {
  message: string;
  code: number;
  data?: Record<string, unknown>;
}