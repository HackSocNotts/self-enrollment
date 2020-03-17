// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/AppState';
import { Action } from '@martin_hotell/rex-tils/types/redux/types';

const createThunkAction = <T extends string>(
  innerAction: (dispatch: ThunkDispatch<AppState, any, Action<T>>, getState?: () => AppState) => Promise<any>,
): ((dispatch: ThunkDispatch<AppState, any, Action<T>>, getState?: () => AppState) => Promise<any>) => {
  return innerAction;
};

export default createThunkAction;
