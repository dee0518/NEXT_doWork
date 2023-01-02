import { configureStore, Reducer, AnyAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducer, { ReducerStateType } from 'store/modules';

const makeStore = () =>
  configureStore({
    reducer: reducer as Reducer<ReducerStateType, AnyAction>,
    devTools: process.env.NODE_ENV !== 'production',
  });

export type Appstore = ReturnType<typeof makeStore>;
export type ReducerType = ReturnType<typeof reducer>;
export type AppDispatch = Appstore['dispatch'];

export const wrapper = createWrapper<Appstore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
