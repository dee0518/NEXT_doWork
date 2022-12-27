import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { scheduleType } from 'types/schedule';

import auth, { authType } from 'store/modules/auth';
import schedule from 'store/modules/schedule';

export type ReducerStateType = { auth: authType; schedule: scheduleType };

const reducer = (state: ReducerStateType, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }

  return combineReducers({
    auth,
    schedule,
  })(state, action);
};

export default reducer;
