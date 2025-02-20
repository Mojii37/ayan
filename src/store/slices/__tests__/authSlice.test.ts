import { describe, it, expect } from 'vitest';
import authReducer, { setCredentials, logout } from '../authSlice';
import type { User, AuthState } from '../../../types/auth.types';
import { MOCK_DATA, mockToken, mockRefreshToken } from '../../../utils/mockData';

describe('authSlice', () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    lastLogin: null,
    loading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const mockUser: User = {
      ...MOCK_DATA.currentUser
    };

    const actual = authReducer(
      initialState,
      setCredentials({
        user: mockUser,
        token: mockToken,
        refreshToken: mockRefreshToken,
        lastLogin: MOCK_DATA.currentDateTime
      })
    );

    expect(actual).toEqual({
      isAuthenticated: true,
      user: mockUser,
      token: mockToken,
      refreshToken: mockRefreshToken,
      lastLogin: MOCK_DATA.currentDateTime,
      loading: false,
      error: null
    });
  });

  it('should handle logout', () => {
    const loggedInState: AuthState = {
      isAuthenticated: true,
      user: MOCK_DATA.currentUser,
      token: mockToken,
      refreshToken: mockRefreshToken,
      lastLogin: MOCK_DATA.currentDateTime,
      loading: false,
      error: null
    };

    const actual = authReducer(loggedInState, logout());
    expect(actual).toEqual(initialState);
  });
});