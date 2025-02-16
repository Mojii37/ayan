import { LoginCredentials, LoginResponse } from '../types/auth.types';

export class AuthService {
  private static baseUrl = process.env.REACT_APP_API_URL;

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'An error occurred during login'
      );
    }
  }

  static async logout(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'An error occurred during logout'
      );
    }
  }
}
