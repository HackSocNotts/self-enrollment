// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import createThunkAction from '../../utils/createThunkAction';
import APIService from '../../Services/API';
import { DiscordProfile } from '../../models/DiscordProfile';
import { FetchDiscordProfileError } from '../../Services/API/errors';

export const GET_REDIRECT_URI = '[Discord] GET_REDIRECT_URI';
export const START_GET_REDIRECT_URI = '[Discord] START_GET_REDIRECT_URI';
export const GET_REDIRECT_URI_SUCCESS = '[Discord] GET_REDIRECT_URI_SUCCESS';
export const GET_REDIRECT_URI_FAILED = '[Discord] GET_REDIRECT_URI_FAILED';
export const GET_PROFILE = '[Discord] GET_PROFILE';
export const START_GET_PROFILE = '[Discord] START_GET_PROFILE';
export const GET_PROFILE_SUCCESS = '[Discord] GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = '[Discord] GET_PROFILE_FAILED';
export const GET_ROLES = '[Discord] GET_ROLE';
export const START_GET_ROLES = '[Discord] START_GET_ROLE';
export const GET_ROLES_SUCCESS = '[Discord] GET_ROLE_SUCCESS';
export const GET_ROLES_FAILED = '[Discord] GET_ROLE_FAILED';
export const ENROL = '[Discord] ENROL';
export const START_ENROL = '[Discord] START_ENROL';
export const ENROL_SUCCESS = '[Discord] ENROL_SUCCESS';
export const ENROL_FAILED = '[Discord] ENROL_FAILED';

export const Actions = {
  getRedirectURI: () => createAction(GET_REDIRECT_URI),
  startGetRedirectURI: () => createAction(START_GET_REDIRECT_URI),
  getRedirectURISuccess: (redirectURI: string) => createAction(GET_REDIRECT_URI_SUCCESS, { redirectURI }),
  getRedirectURIFailed: (error: string) => createAction(GET_REDIRECT_URI_FAILED, { error }),
  getProfile: () => createAction(GET_PROFILE),
  startGetProfile: () => createAction(START_GET_PROFILE),
  getProfileSuccess: (profile: DiscordProfile | false) => createAction(GET_PROFILE_SUCCESS, { profile }),
  getProfileFailed: (error: string) => createAction(GET_PROFILE_FAILED, { error }),
  getRoles: () => createAction(GET_ROLES),
  startGetRoles: () => createAction(START_GET_ROLES),
  getRolesSuccess: (roles: string[]) => createAction(GET_ROLES_SUCCESS, { roles }),
  getRolesFailed: (error: string) => createAction(GET_ROLES_FAILED, { error }),
  enrol: () => createAction(ENROL),
  startEnrol: () => createAction(START_ENROL),
  enrolSuccess: () => createAction(ENROL_SUCCESS),
  enrolFailed: (error: string) => createAction(ENROL_FAILED, { error }),
};

export const Thunks = {
  getRedirectURI: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.getRedirectURI());
      try {
        dispatch(Actions.startGetRedirectURI());
        const redirectURI = await apiService.getDiscordReturnURI();
        dispatch(Actions.getRedirectURISuccess(redirectURI));
      } catch (err) {
        dispatch(Actions.getRedirectURIFailed(err.message));
      }
    }),
  getProfile: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.getProfile());
      try {
        dispatch(Actions.startGetProfile());
        const profile = await apiService.getDiscordProfile();
        dispatch(Actions.getProfileSuccess(profile));
      } catch (err) {
        if ((err as FetchDiscordProfileError).profileExists === false) {
          dispatch(Actions.getProfileSuccess(false));
        } else {
          dispatch(Actions.getProfileFailed(err.message));
        }
      }
    }),
  getRoles: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.getRoles());
      try {
        dispatch(Actions.startGetRoles());
        const roles = await apiService.getDiscordRoles();
        dispatch(Actions.getRolesSuccess(roles));
      } catch (err) {
        dispatch(Actions.getRolesFailed(err.message));
      }
    }),
  enrol: () =>
    createThunkAction(async dispatch => {
      const apiService = APIService.getInstance();
      dispatch(Actions.enrol());
      try {
        dispatch(Actions.startEnrol());
        await apiService.discordEnrol();
        dispatch(Actions.enrolSuccess());
      } catch (err) {
        dispatch(Actions.enrolFailed(err.message));
      }
    }),
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
