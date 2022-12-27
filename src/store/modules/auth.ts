import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iUserInfo } from 'types/auth';

export type authType = {
  user: iUserInfo | null;
};

const initialState: authType = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<iUserInfo>): void => {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
