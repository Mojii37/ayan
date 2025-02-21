import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '@/types/auth.types';

interface SetCredentialsPayload {
  user: User;
  token: string;
  refreshToken: string;
  lastLogin: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  lastLogin: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user, token, refreshToken, lastLogin } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.lastLogin = lastLogin;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.lastLogin = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;