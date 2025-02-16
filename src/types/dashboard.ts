// src/types/dashboard.ts
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  newOrders: number;
  systemHealth: {
    cpu: number;
    memory: number;
    disk: number;
    uptime: number;
  };
  recentActivities: Activity[];
  alerts: Alert[];
}

export interface Activity {
  id: string;
  type: 'login' | 'order' | 'payment' | 'system';
  user: string;
  action: string;
  timestamp: Date;
  details?: unknown;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export interface WidgetConfig {
  id: string;
  type: 'stats' | 'chart' | 'table' | 'activity' | 'alerts';
  title: string;
  refreshInterval?: number;
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
  };
}
