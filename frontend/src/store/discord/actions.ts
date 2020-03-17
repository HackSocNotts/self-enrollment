// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import createThunkAction from '../../utils/createThunkAction';
import APIService from '../../Services/API';
import { DiscordProfile } from '../../models/DiscordProfile';

export const GET_REDIRECT_URI = '[Discord] GET_REDIRECT_URI';
export const START_GET_REDIRECT_URI = '[Discord] START_GET_REDIRECT_URI';
export const GET_REDIRECT_URI_SUCCESS = '[Discord] GET_REDIRECT_URI_SUCCESS';
export const GET_REDIRECT_URI_FAILED = '[Discord] GET_REDIRECT_URI_FAILED';
export const GET_PROFILE = '[Discord] GET_PROFILE';
export const START_GET_PROFILE = '[Discord] START_GET_PROFILE';
export const GET_PROFILE_SUCCESS = '[Discord] GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = '[Discord] GET_PROFILE_FAILED';

export const Actions = {
  getRedirectURI: () => createAction(GET_REDIRECT_URI),
  startGetRedirectURI: () => createAction(START_GET_REDIRECT_URI),
  getRedirectURISuccess: (redirectURI: string) => createAction(GET_REDIRECT_URI_SUCCESS, { redirectURI }),
  getRedirectURIFailed: (error: string) => createAction(GET_REDIRECT_URI_FAILED, { error }),
  getProfile: () => createAction(GET_PROFILE),
  startGetProfile: () => createAction(START_GET_PROFILE),
  getProfileSuccess: (profile: DiscordProfile) => createAction(GET_PROFILE_SUCCESS, { profile }),
  getProfileError: (error: string) => createAction(GET_PROFILE_FAILED, { error }),
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
        dispatch(Actions.getRedirectURIFailed(err.getMessage()));
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
        dispatch(Actions.getRedirectURIFailed(err.getMessage()));
      }
    }),
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
