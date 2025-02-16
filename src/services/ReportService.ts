// src/services/ReportService.ts
import { ReportConfig, ReportData } from '../types/report';

export class ReportService {
  private static readonly API_URL = '/api/reports';

  static async getReport(config: ReportConfig): Promise<ReportData> {
    try {
      const response = await fetch(`${this.API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('خطا در دریافت گزارش');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  }

  static async exportReport(
    config: ReportConfig,
    format: 'pdf' | 'excel' | 'csv'
  ): Promise<Blob> {
    try {
      const response = await fetch(`${this.API_URL}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...config, format }),
      });

      if (!response.ok) {
        throw new Error('خطا در خروجی گزارش');
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting report:', error);
      throw error;
    }
  }

  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
