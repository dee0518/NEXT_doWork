import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iUserInfo } from 'types/auth';

type authType = {
  isLoggedIn: boolean;
  user: iUserInfo | null;
};

const initialState: authType = {
  isLoggedIn: false,
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<iUserInfo>): void => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>): void => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = auth.actions;
export default auth;
