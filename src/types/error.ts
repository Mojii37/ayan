export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ErrorSource = 'client' | 'server' | 'network' | 'validation';
export type ErrorStatus = 'new' | 'pending' | 'retrying' | 'resolved' | 'failed';

export interface ErrorContext {
  url?: string;
  action?: string;
  component?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
  timestamp?: string;
  userId?: string;
  sessionId?: string;
  route?: string;
  [key: string]: unknown;
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  user?: string;
  severity: ErrorSeverity;
  source: ErrorSource;
  message: string;
  stack?: string;
  status: ErrorStatus;
  retryCount?: number;
  lastRetryAt?: Date;
  context: ErrorContext;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorDetails {
  message: string;
  code: number;
  status?: ErrorStatus;
  severity?: ErrorSeverity;
  data?: Record<string, unknown>;
}

export interface StoredError extends Omit<ErrorLog, 'timestamp' | 'lastRetryAt'> {
  timestamp: string;
  lastRetryAt?: string;
}