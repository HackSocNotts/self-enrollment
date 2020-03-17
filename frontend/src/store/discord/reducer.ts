// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Reducer } from 'react';
import { DiscordState } from './types';
import initialState from './initialState';
import {
  Actions,
  START_GET_REDIRECT_URI,
  GET_REDIRECT_URI_SUCCESS,
  GET_REDIRECT_URI_FAILED,
  START_GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
} from './actions';

export const reducer: Reducer<DiscordState, Actions> = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case START_GET_REDIRECT_URI: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_REDIRECT_URI_SUCCESS: {
      const { redirectURI } = action.payload;
      return {
        ...state,
        loading: false,
        redirectURI,
      };
    }

    case GET_REDIRECT_URI_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }

    case START_GET_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PROFILE_SUCCESS: {
      const { profile } = action.payload;
      return {
        ...state,
        loading: false,
        profile,
      };
    }

    case GET_PROFILE_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }

    default: {
      return state;
    }
  }
};
