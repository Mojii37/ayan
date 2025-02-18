export type UserRole = 'admin' | 'user' | 'editor';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: number | string;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}