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
  START_GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  START_ENROL,
  ENROL_SUCCESS,
  ENROL_FAILED,
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
        attempts: 0,
        redirectURI,
      };
    }

    case GET_REDIRECT_URI_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        attempts: state.attempts + 1,
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
        attempts: 0,
        profile,
      };
    }

    case GET_PROFILE_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        attempts: state.attempts + 1,
        error,
      };
    }

    case START_GET_ROLES: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ROLES_SUCCESS: {
      const { roles } = action.payload;
      return {
        ...state,
        loading: false,
        attempts: 0,
        roles,
      };
    }

    case GET_ROLES_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        attempts: state.attempts + 1,
        error,
      };
    }

    case START_ENROL: {
      return {
        ...state,
        loading: true,
      };
    }

    case ENROL_SUCCESS: {
      return {
        ...state,
        loading: false,
        attempts: 0,
        enrolSuccess: true,
      };
    }

    case ENROL_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        attempts: state.attempts + 1,
        error,
      };
    }

    default: {
      return state;
    }
  }
};
