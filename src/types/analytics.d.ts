export interface AnalyticsData {
  visitors: {
    total: number;
    unique: number;
    newUsers: number;
    returningUsers: number;
    avgSessionDuration: number;
    bounceRate: number;
  };
  pageViews: {
    total: number;
    perPage: { [key: string]: number };
    mostVisited: Array<{ path: string; views: number }>;
  };
  revenue: {
    total: number;
    today: number;
    thisMonth: number;
    lastMonth: number;
    byService: Array<{ service: string; amount: number }>;
  };
  users: {
    total: number;
    active: number;
    newToday: number;
    growth: number;
    byLocation: Array<{ city: string; count: number }>;
  };
  consultations: {
    total: number;
    completed: number;
    canceled: number;
    pending: number;
    satisfaction: number;
  };
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}

export interface ChipColors {
  pending: 'default';
  running: 'info';
  completed: 'success';
  failed: 'error';
}
declare namespace Analytics {
  interface PageView {
    path: string;
    title: string;
    timestamp: number;
  }

  interface UserEvent {
    type: 'click' | 'scroll' | 'input';
    element: string;
    timestamp: number;
  }

  interface PerformanceMetric {
    name: string;
    value: number;
    timestamp: number;
  }

  interface ErrorEvent {
    message: string;
    stack?: string;
    timestamp: number;
  }

  type EventType = PageView | UserEvent | PerformanceMetric | ErrorEvent;
}

export interface TimeRange {
  start: Date;
  end: Date;
}