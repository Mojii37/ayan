// src/services/SecurityService.ts
import { SecurityLog, SecurityAlert } from '../types/security';

export class SecurityService {
  private static readonly API_URL = '/api/security';

  static async getLogs(params: {
    startDate?: Date;
    endDate?: Date;
    level?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<{ logs: SecurityLog[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(
        `${this.API_URL}/logs?${queryParams.toString()}`
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching security logs:', error);
      return { logs: [], total: 0 };
    }
  }

  static async getAlerts(): Promise<SecurityAlert[]> {
    try {
      const response = await fetch(`${this.API_URL}/alerts`);
      return response.json();
    } catch (error) {
      console.error('Error fetching security alerts:', error);
      return [];
    }
  }

  static async resolveAlert(
    alertId: string,
    resolvedBy: string
  ): Promise<void> {
    try {
      await fetch(`${this.API_URL}/alerts/${alertId}/resolve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resolvedBy }),
      });
    } catch (error) {
      console.error('Error resolving security alert:', error);
    }
  }

  static async logActivity(activity: Partial<SecurityLog>): Promise<void> {
    try {
      await fetch(`${this.API_URL}/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  static async exportLogs(params: {
    startDate?: Date;
    endDate?: Date;
    level?: string;
    type?: string;
  }): Promise<Blob> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(
        `${this.API_URL}/logs/export?${queryParams.toString()}`
      );
      return response.blob();
    } catch (error) {
      console.error('Error exporting logs:', error);
      throw error;
    }
  }
}
