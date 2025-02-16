import { AuthState } from '@/types/auth';

export const mockAuthState = (state: Partial<AuthState>) => {
  vi.mock('@/store/slices/authSlice', () => ({
    useAuth: () => state
  }));
};