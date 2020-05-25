// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import createThunkAction from '../../utils/createThunkAction';
import APIService from '../../Services/API';
import { GitHubProfile } from '../../models/GitHubProfile';
import { FetchGitHubProfileError } from '../../Services/API/errors';

export const GET_PROFILE = '[GitHub] GET_PROFILE';
export const START_GET_PROFILE = '[GitHub] START_GET_PROFILE';
export const GET_PROFILE_SUCCESS = '[GitHub] GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = '[GitHub] GET_PROFILE_FAILED';
export const GET_TEAMS = '[GitHub] GET_TEAMS';
export const START_GET_TEAMS = '[GitHub] START_GET_TEAMS';
export const GET_TEAMS_SUCCESS = '[GitHub] GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILED = '[GitHub] GET_TEAMS_FAILED';
export const ENROL = '[GitHub] ENROL';
export const START_ENROL = '[GitHub] START_ENROL';
export const ENROL_SUCCESS = '[GitHub] ENROL_SUCCESS';
export const ENROL_FAILED = '[GitHub] ENROL_FAILED';

export const Actions = {
  getProfile: () => createAction(GET_PROFILE),
  startGetProfile: () => createAction(START_GET_PROFILE),
  getProfileSuccess: (profile: GitHubProfile | false) => createAction(GET_PROFILE_SUCCESS, { profile }),
  getProfileFailed: (error: string) => createAction(GET_PROFILE_FAILED, { error }),
  getTeams: () => createAction(GET_TEAMS),
  startGetTeams: () => createAction(START_GET_TEAMS),
  getTeamsSuccess: (teams: string[]) => createAction(GET_TEAMS_SUCCESS, { teams }),
  getTeamsFailed: (error: string) => createAction(GET_TEAMS_FAILED, { error }),
  enrol: () => createAction(ENROL),
  startEnrol: () => createAction(START_ENROL),
  enrolSuccess: () => createAction(ENROL_SUCCESS),
  enrolFailed: (error: string) => createAction(ENROL_FAILED, { error }),
};

export const Thunks = {
  getProfile: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.getProfile());
      try {
        dispatch(Actions.startGetProfile());
        const profile = await apiService.getGitHubProfile();
        dispatch(Actions.getProfileSuccess(profile));
      } catch (err) {
        if ((err as FetchGitHubProfileError).profileExists === false) {
          dispatch(Actions.getProfileSuccess(false));
        } else {
          dispatch(Actions.getProfileFailed(err.message));
        }
      }
    }),
  getTeams: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.getTeams());
      try {
        dispatch(Actions.startGetTeams());
        const roles = await apiService.getGitHubTeams();
        dispatch(Actions.getTeamsSuccess(roles));
      } catch (err) {
        dispatch(Actions.getTeamsFailed(err.message));
      }
    }),
  enrol: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.enrol());
      try {
        dispatch(Actions.startEnrol());
        await apiService.gitHubEnrol();
        dispatch(Actions.enrolSuccess());
      } catch (err) {
        dispatch(Actions.enrolFailed(err.message));
      }
    }),
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
