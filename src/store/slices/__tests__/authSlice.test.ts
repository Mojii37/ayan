import authReducer, { setCredentials, logout } from '../authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const user = { id: 1, name: 'Test User' };
    const actual = authReducer(
      initialState,
      setCredentials({ user, token: 'token' })
    );
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.user).toEqual(user);
    expect(actual.token).toEqual('token');
  });

  it('should handle logout', () => {
    const actual = authReducer(
      { isAuthenticated: true, user: { id: 1, name: 'Test User' }, token: 'token' }, 
      logout()
    );
    expect(actual).toEqual(initialState);
  });
});