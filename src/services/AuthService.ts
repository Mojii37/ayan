import { 
  LoginCredentials, 
  AuthResponse, 
  AuthError, 
  RegisterData,
  RefreshTokenResponse 
} from '../types/auth.types';

export class AuthService {
  private static baseUrl = import.meta.env.VITE_API_URL;

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData: AuthError = await response.json();
        throw new Error(errorData.message || 'خطا در ورود');
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'خطای نامشخص در فرآیند ورود'
      );
    }
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: AuthError = await response.json();
        throw new Error(errorData.message || 'خطا در ثبت نام');
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'خطای نامشخص در فرآیند ثبت نام'
      );
    }
  }

  static async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData: AuthError = await response.json();
        throw new Error(errorData.message || 'خطا در بروزرسانی توکن');
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'خطای نامشخص در بروزرسانی توکن'
      );
    }
  }

  static async logout(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData: AuthError = await response.json();
        throw new Error(errorData.message || 'خطا در خروج');
      }
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'خطای نامشخص در فرآیند خروج'
      );
    }
  }
}