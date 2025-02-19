import authReducer, { setCredentials, logout } from '../authSlice';
import type { User, AuthState } from '../../../types/store.types';

describe('authSlice', () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const user: User = { 
      id: 1, 
      name: 'Test User' 
    };
    const actual = authReducer(
      initialState,
      setCredentials({ user, token: 'token' })
    );
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.user).toEqual(user);
    expect(actual.token).toEqual('token');
  });

  it('should handle logout', () => {
    const user: User = { 
      id: 1, 
      name: 'Test User' 
    };
    const actual = authReducer(
      { isAuthenticated: true, user, token: 'token', loading: false, error: null }, 
      logout()
    );
    expect(actual).toEqual(initialState);
  });
});