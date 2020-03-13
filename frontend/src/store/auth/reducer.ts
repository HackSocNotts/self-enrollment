import { Reducer } from 'react';
import { AuthState } from './types';
import initialState from './initialState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const reducer: Reducer<AuthState, any> = (state, action) => {
  state = state || initialState;

  return state;
};
