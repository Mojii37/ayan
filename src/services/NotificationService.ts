import { Notification} from '../types/notification';

export class NotificationService {
  private static readonly API_URL = '/api/notifications';


  static async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const response = await fetch(`${this.API_URL}/${userId}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  static async markAsRead(notificationId: string): Promise<void> {
    try {
      await fetch(`${this.API_URL}/${notificationId}/read`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  static async markAllAsRead(userId: string): Promise<void> {
    try {
      await fetch(`${this.API_URL}/read-all/${userId}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  static async sendNotification(
    notification: Partial<Notification>
  ): Promise<void> {
    try {
      await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  static async deleteNotification(notificationId: string): Promise<void> {
    try {
      await fetch(`${this.API_URL}/${notificationId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }
}
