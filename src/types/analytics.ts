export interface UserAnalytics {
  name: string;
  joinDate: string;
  consultationCount: number;
  totalPayment: number;
}

export interface RevenueAnalytics {
  date: string;
  serviceType: string;
  count: number;
  totalAmount: number;
}

export interface ConsultationAnalytics {
  date: string;
  advisorName: string;
  userName: string;
  status: string;
  rating: number;
}

export interface RevenueByService {
  service: string;
  amount: number;
}

export interface UserLocation {
  city: string;
  count: number;
}

export interface PageView {
  path: string;
  views: number;
}

export interface AnalyticsData {
  users: {
    active: number;
    growth: number;
    total: number;
    byLocation: UserLocation[];
    data: UserAnalytics[];
  };
  visitors: {
    total: number;
    unique: number;
    growth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    byService: RevenueByService[];
    data: RevenueAnalytics[];
  };
  consultations: {
    total: number;
    satisfaction: number;
    data: ConsultationAnalytics[];
  };
  pageViews: {
    total: number;
    mostVisited: PageView[];
  };
}

export interface TimeRange {
  start: Date;
  end: Date;
}