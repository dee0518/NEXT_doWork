import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iUserInfo } from 'types/auth';

type authType = {
  isLoggedIn: boolean;
  user: iUserInfo | null;
};

const initialState: authType = {
  isLoggedIn: false,
  user: {
    id: '',
    email: 'abc@email.com',
    displayName: 'jane',
    career: 'Frontend-Developer',
    profile: '',
    introduce: '저는 UI와 데이터를 연결하는 것이 즐겁고 협업을 위해 좀 더 세밀한 부분을 알고 싶습니다.',
  },
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
