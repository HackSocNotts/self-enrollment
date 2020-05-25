// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Reducer } from 'react';
import { GitHubState } from './types';
import initialState from './initialState';
import {
  Actions,
  START_GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  START_GET_TEAMS,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED,
  START_ENROL,
  ENROL_SUCCESS,
  ENROL_FAILED,
} from './actions';

export const reducer: Reducer<GitHubState, Actions> = (state, action) => {
  state = state || initialState;

  switch (action.type) {
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

    case START_GET_TEAMS: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TEAMS_SUCCESS: {
      const { teams } = action.payload;
      return {
        ...state,
        loading: false,
        attempts: 0,
        teams,
      };
    }

    case GET_TEAMS_FAILED: {
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
        enrolSuccess: true,
        attempts: 0,
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
