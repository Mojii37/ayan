export interface DateTimeProps {
    date: Date;
    format?: string;
    showIcon?: boolean;
    showTimeAgo?: boolean;
    variant?: 'h6' | 'body1' | 'body2';
    color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary';
    updateInterval?: number;
  }