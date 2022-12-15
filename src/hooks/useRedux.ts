import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ReducerType, AppDispatch } from 'redux/store';

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<ReducerType> = useSelector;
