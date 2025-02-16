export type TransactionStatus = 'pending' | 'successful' | 'failed' | 'refunded';

export interface Transaction {
  id: string;
  trackingCode: string;
  userName: string;
  type: 'consultation' | 'subscription' | 'course';
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}