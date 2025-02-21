import { type ReactNode, type ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error, resetError: () => void) => ReactNode);
  }




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

export type ErrorHandler = (error: Error, errorInfo?: React.ErrorInfo) => void;
export type ErrorLogger = (log: ErrorLog) => Promise<void>;

export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_RETRY_DELAY = 1000;