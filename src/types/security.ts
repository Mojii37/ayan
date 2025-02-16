// src/types/security.ts
export type LogLevel = 'info' | 'warning' | 'error' | 'critical';
export type ActivityType =
  | 'login'
  | 'logout'
  | 'failed_login'
  | 'password_change'
  | 'profile_update'
  | 'data_access'
  | 'data_modify'
  | 'settings_change'
  | 'api_access';

export interface SecurityLog {
  id: string;
  timestamp: Date;
  level: LogLevel;
  type: ActivityType;
  userId?: string;
  userName?: string;
  ipAddress: string;
  userAgent: string;
  action: string;
  details: unknown;
}

export interface SecurityAlert {
  id: string;
  timestamp: Date;
  level: LogLevel;
  title: string;
  message: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
}
