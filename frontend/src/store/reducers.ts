import { AppState } from './AppState';
import { AuthReducer } from './auth';
import { DiscordReducer } from './discord';
import { Reducer } from 'react';

type Reducers<TAppState> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [R in keyof TAppState]: Reducer<TAppState[R], any>;
};

const RootReducer: Reducers<AppState> = {
  auth: AuthReducer,
  discord: DiscordReducer,
};

export default RootReducer;
