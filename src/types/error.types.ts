import type { ReactNode } from 'react';

export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
  DEBUG = 'debug'
}

export enum ErrorSource {
  CLIENT = 'client',
  SERVER = 'server',
  NETWORK = 'network',
  VALIDATION = 'validation',
  DATABASE = 'database',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  EXTERNAL_SERVICE = 'external_service',
  CHAT = 'chat',
  UNKNOWN = 'unknown'
}

export enum ErrorStatus {
  NEW = 'new',
  PENDING = 'pending',
  RETRYING = 'retrying',
  RESOLVED = 'resolved',
  FAILED = 'failed',
  IGNORED = 'ignored'
}

export interface SystemInfo {
  browser: string;
  browserVersion?: string;
  os: string;
  osVersion?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  screenResolution?: string;
  language?: string;
  timeZone?: string;
}

export interface ErrorContext extends SystemInfo {
  url?: string;
  action?: string;
  component?: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;  
  route?: string;
  requestId?: string;
  environment: 'development' | 'production' | 'test';
  version?: string;
  customData?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  user?: {
    id: string;
    username: string;
    email?: string;
  };
  severity: ErrorSeverity;
  source: ErrorSource;
  message: string;
  stack?: string;
  status: ErrorStatus;
  retryCount: number;
  maxRetries: number;
  lastRetryAt?: Date;
  resolvedAt?: Date;
  context: ErrorContext;
  relatedErrors?: string[];
  tags?: string[];
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetOnRouteChange?: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export const isErrorResponse = (response: unknown): response is ErrorResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    !response.success &&
    'error' in response
  );
};

export const isErrorLog = (error: unknown): error is ErrorLog => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'id' in error &&
    'timestamp' in error &&
    'severity' in error &&
    'source' in error &&
    'message' in error &&
    'status' in error
  );
};

export type ErrorHandler = (error: Error, errorInfo?: React.ErrorInfo) => void;
export type ErrorLogger = (log: ErrorLog) => Promise<void>;

export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_RETRY_DELAY = 1000;