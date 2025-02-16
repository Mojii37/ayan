// src/types/backup.ts
export type BackupType = 'full' | 'partial' | 'settings';
export type BackupStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface BackupConfig {
  type: BackupType;
  includeFiles: boolean;
  includeDatabase: boolean;
  includeSettings: boolean;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    dayOfWeek?: number;  // Optional, only for 'weekly'
    dayOfMonth?: number; // Optional, only for 'monthly'
  };
  retention: {
    count: number;
    days: number;
  };
  compression: boolean;
  encrypt: boolean;
}

export interface BackupFile {
  id: string;
  filename: string;
  type: BackupType;
  createdAt: Date;
  size: number;
  status: BackupStatus;
  error?: string;
  metadata: {
    version: string;
    checksum: string;
    encrypted: boolean;
    compressed: boolean;
  };
}
