import type { ReactNode } from 'react';

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
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
  UNKNOWN = 'unknown'
}

export enum ErrorStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
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
  environment: 'string' | 'development' | 'production' | 'test';
  version?: string;
  customData?: Record<string, unknown>;
  [key: string]: any;
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

export interface ErrorDetails {
  message: string;
  code: number;
  status: ErrorStatus;
  severity: ErrorSeverity;
  source: ErrorSource;
  timestamp: string;
  data?: Record<string, unknown>;
  suggestions?: string[];
  debugInfo?: {
    requestId?: string;
    errorId?: string;
    stack?: string;
  };
}

export interface StoredError extends Omit<ErrorLog, 'timestamp' | 'lastRetryAt' | 'resolvedAt'> {
  timestamp: string;
  lastRetryAt?: string;
  resolvedAt?: string;
}

export interface ErrorResponse {
  success: false;
  error: ErrorDetails;
}

export interface ErrorServiceConfig {
  maxRetries: number;
  retryDelay: number;
  logEndpoint: string;
  environment: string;
  version: string;
  debug?: boolean;
  tags?: string[];
  ignoredErrors?: string[];
}

export type ErrorHandler = (error: Error, errorInfo?: React.ErrorInfo) => void;

export const isErrorResponse = (response: unknown): response is ErrorResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    !response.success &&
    'error' in response
  );
};

export const isStoredError = (error: unknown): error is StoredError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'id' in error &&
    'timestamp' in error &&
    'severity' in error &&
    'source' in error &&
    'message' in error
  );
};