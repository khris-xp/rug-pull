import { UserType } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthAppState {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthAppState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthAppState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setAuthUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setAuthAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setAuthRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    deleteAuthState: (state) => {
      (state.user = null), (state.accessToken = null);
    },
  },
});

export const {
  setAuthState,
  setAuthUser,
  setAuthAccessToken,
  setAuthRefreshToken,
  deleteAuthState,
} = authSlice.actions;
