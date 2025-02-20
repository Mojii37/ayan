import axios from 'axios';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse,
  ResetPasswordCredentials 
} from '../types/auth.types';

class AuthService {
  private static readonly API_URL = '/api/auth';
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // ذخیره توکن در localStorage
  private static setTokens(token: string, refreshToken?: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  // دریافت توکن از localStorage
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // پاک کردن توکن‌ها
  private static clearTokens() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // ورود کاربر
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.API_URL}/login`, credentials);
      const data = response.data as AuthResponse;
      this.setTokens(data.token, data.refreshToken);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ثبت‌نام کاربر جدید
  static async register(userData: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.API_URL}/register`, userData);
      const data = response.data as AuthResponse;
      this.setTokens(data.token, data.refreshToken);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // خروج از سیستم
  static logout(): void {
    this.clearTokens();
  }

  // بازیابی رمز عبور
  static async resetPassword(data: ResetPasswordCredentials): Promise<void> {
    try {
      await axios.post(`${this.API_URL}/reset-password`, data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // تازه‌سازی توکن
  static async refreshAccessToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (!refreshToken) throw new Error('رفرش توکن موجود نیست');

      const response = await axios.post(`${this.API_URL}/refresh-token`, {
        refreshToken
      });
      
      const { token } = response.data;
      localStorage.setItem(this.TOKEN_KEY, token);
      return token;
    } catch (error) {
      this.clearTokens();
      throw this.handleError(error);
    }
  }

  // مدیریت خطاها
  private static handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'خطای ناشناخته رخ داد';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('خطای ناشناخته رخ داد');
  }
}

export default AuthService;