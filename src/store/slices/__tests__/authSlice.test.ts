import { describe, it, expect } from 'vitest';
import authReducer, { setCredentials, logout } from '@/store/slices/authSlice';
import type { AuthState } from '@/types/auth.types';
import { MOCK_DATA } from '@/mocks/auth.mock';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    tokens: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    lastLogin: null
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const actual = authReducer(
      initialState,
      setCredentials({
        user: MOCK_DATA.currentUser,
        tokens: {
          accessToken: MOCK_DATA.mockToken,
          refreshToken: MOCK_DATA.mockRefreshToken
        },
        lastLogin: MOCK_DATA.currentDateTime
      })
    );

    expect(actual).toEqual({
      isAuthenticated: true,
      user: MOCK_DATA.currentUser,
      tokens: {
        accessToken: MOCK_DATA.mockToken,
        refreshToken: MOCK_DATA.mockRefreshToken
      },
      lastLogin: MOCK_DATA.currentDateTime,
      loading: false,
      error: null
    });
  });

  it('should handle logout', () => {
    const loggedInState: AuthState = {
      isAuthenticated: true,
      user: MOCK_DATA.currentUser,
      tokens: {
        accessToken: MOCK_DATA.mockToken,
        refreshToken: MOCK_DATA.mockRefreshToken
      },
      lastLogin: MOCK_DATA.currentDateTime,
      loading: false,
      error: null
    };

    const actual = authReducer(loggedInState, logout());
    expect(actual).toEqual(initialState);
  });
});