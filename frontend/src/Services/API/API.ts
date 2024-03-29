// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import axios, { AxiosInstance, AxiosError } from 'axios';
import { DiscordProfile, DiscordRoles } from '../../models/DiscordProfile';
import { FetchDiscordProfileError, FetchGitHubProfileError } from './errors';
import { GitHubProfile, GitHubTeams } from '../../models/GitHubProfile';

class APIService {
  private static _instance: APIService;
  private instance: AxiosInstance;

  private constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 10000,
    });
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new APIService();
    }
    return this._instance;
  }

  public async getDiscordReturnURI() {
    try {
      const response = await this.instance.get<{ redirectURI: string }>('/discord/redirectURI');
      return response.data.redirectURI;
    } catch (e) {
      throw new Error('An Unknown Error Occurred');
    }
  }

  public async getDiscordProfile() {
    try {
      const response = await this.instance.get<DiscordProfile>('/discord/profile');
      return response.data;
    } catch (e) {
      const status = (e as AxiosError).response ? e.response.status : 500;
      if (status === 401) {
        throw new FetchDiscordProfileError('Token has expired, please refresh the page.', false);
      } else if (status === 400) {
        throw new FetchDiscordProfileError('Token is invalid. Please refresh the page.', false);
      } else {
        throw new FetchDiscordProfileError('An Unknown Error Occurred. Please try again later.', true);
      }
    }
  }

  public async getDiscordRoles() {
    try {
      const response = await this.instance.get<DiscordRoles>('/discord/roles');
      return response.data.roles;
    } catch (e) {
      const status = (e as AxiosError).response ? e.response.status : 500;
      if (status === 401) {
        throw new Error('Token has expired, please refresh the page.');
      } else if (status === 400) {
        throw new Error('Token is invalid. Please refresh the page.');
      } else {
        throw new Error('An Unknown Error Occurred. Please try again later.');
      }
    }
  }

  public async discordEnrol() {
    try {
      await this.instance.get('/discord/enrol');
      return;
    } catch (e) {
      const status = (e as AxiosError).response ? e.response.status : 500;
      if (status === 401) {
        throw new Error('Token has expired, please refresh the page.');
      } else if (status === 400) {
        throw new Error('Token is invalid. Please refresh the page.');
      } else {
        throw new Error('An Unknown Error Occurred. Please try again later.');
      }
    }
  }

  public async getGitHubProfile() {
    try {
      const response = await this.instance.get<GitHubProfile>('/github/whoami');
      return response.data;
    } catch (e) {
      const status = (e as AxiosError).response ? e.response.status : 500;
      if (status === 400) {
        throw new FetchGitHubProfileError('Token is invalid. Please refresh the page.', false);
      } else {
        throw new Error('An Unknown Error Occurred. Please try again later.');
      }
    }
  }

  public async getGitHubTeams() {
    try {
      const response = await this.instance.get<GitHubTeams>('/github/teams');
      return response.data.teams;
    } catch (e) {
      const status = (e as AxiosError).response ? e.response.status : 500;
      if (status === 400) {
        throw new Error('Token is invalid. Please refresh the page.');
      } else {
        throw new Error('An Unknown Error Occurred. Please try again later.');
      }
    }
  }

  public async gitHubEnrol() {
    try {
      await this.instance.get('/github/enrol');
      return;
    } catch (e) {
      const status = (e as AxiosError).response ? e.response.status : 500;
      if (status === 400) {
        throw new Error('Token is invalid. Please refresh the page.');
      } else {
        throw new Error('An Unknown Error Occurred. Please try again later.');
      }
    }
  }
}

export default APIService;
