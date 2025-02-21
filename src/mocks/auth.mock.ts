import { User } from '@/types/auth.types';

export const MOCK_DATA = {
  currentUser: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user' as User['role']
  },
  mockToken: 'mock-access-token',
  mockRefreshToken: 'mock-refresh-token',
  currentDateTime: new Date().toISOString()
};