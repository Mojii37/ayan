// src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { LoginCredentials, User } from '../types/auth.types';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(AuthService.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await AuthService.login(credentials);
        setUser(response.user);
        navigate('/dashboard');
      } catch (err) {
        setError('نام کاربری یا رمز عبور اشتباه است');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, [navigate]);

  const checkAuth = useCallback(() => {
    const isAuth = AuthService.isAuthenticated();
    if (!isAuth) {
      setUser(null);
      navigate('/login');
    }
    return isAuth;
  }, [navigate]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    isAuthenticated: AuthService.isAuthenticated(),
    hasPermission: AuthService.hasPermission,
  };
};
