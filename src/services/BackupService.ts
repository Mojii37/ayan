import { BackupConfig, BackupFile } from '../types/backup';

export class BackupService {
  private static readonly API_URL = '/api/backup';

  static async createBackup(
    config: Partial<BackupConfig>
  ): Promise<BackupFile> {
    try {
      const response = await fetch(`${this.API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      return response.json();
    } catch (error) {
      console.error('Error creating backup:', error);
      throw error;
    }
  }

  static async getBackups(): Promise<BackupFile[]> {
    try {
      const response = await fetch(this.API_URL);
      return response.json();
    } catch (error) {
      console.error('Error fetching backups:', error);
      return [];
    }
  }

  static async restoreBackup(id: string): Promise<void> {
    try {
      await fetch(`${this.API_URL}/${id}/restore`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error restoring backup:', error);
      throw error;
    }
  }

  static async deleteBackup(id: string): Promise<void> {
    try {
      await fetch(`${this.API_URL}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting backup:', error);
      throw error;
    }
  }

  static async downloadBackup(id: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.API_URL}/${id}/download`);
      return response.blob();
    } catch (error) {
      console.error('Error downloading backup:', error);
      throw error;
    }
  }

  static async updateConfig(config: BackupConfig): Promise<void> {
    try {
      await fetch(`${this.API_URL}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
    } catch (error) {
      console.error('Error updating config:', error);
      throw error;
    }
  }
}
