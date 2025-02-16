// src/types/transaction.ts
export type TransactionType = 'consultation' | 'subscription' | 'course';
export type TransactionStatus =
  | 'pending'
  | 'successful'
  | 'failed'
  | 'refunded';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  trackingCode: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  refundReason?: string;
}

export interface TransactionSummary {
  totalAmount: number;
  successfulCount: number;
  failedCount: number;
  refundedAmount: number;
  periodStart: Date;
  periodEnd: Date;
}
