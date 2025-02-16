// src/types/notification.ts
export type NotificationType =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'payment'
  | 'consultation'
  | 'message';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  userId: string;
  link?: string;
  data?: unknown;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: NotificationType;
  variables: string[];
}
