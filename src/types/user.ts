export type UserRole = 'admin' | 'user' | 'editor';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}