// src/services/DashboardService.ts
import { DashboardStats } from '../types/dashboard';

export class DashboardService {
  private static readonly API_URL = '/api/dashboard';

  static async getStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(this.API_URL);

      if (!response.ok) {
        throw new Error('خطا در دریافت آمار داشبورد');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  static async exportDashboard(format: 'pdf'): Promise<Blob> {
    try {
      const response = await fetch(`${this.API_URL}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ format }),
      });

      if (!response.ok) {
        throw new Error('خطا در خروجی داشبورد');
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting dashboard:', error);
      throw error;
    }
  }
}
