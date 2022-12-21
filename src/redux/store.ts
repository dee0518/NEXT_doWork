import { configureStore } from '@reduxjs/toolkit';
import auth from 'redux/auth';
import schedule from 'redux/schedule';

export const store = configureStore({
  reducer: { auth: auth.reducer, schedule: schedule.reducer },
});

export type ReducerType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
