// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AccessTokenResponse, User } from './models';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  BASE_URL,
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_GUILD_ID,
} from '../../../config';
import { ExpiredAccessTokenError, InvalidCodeError, NoAccessTokenError } from './errors';
import { Logger } from '@overnightjs/logger';
import qs from 'querystring';

class DiscordService {
  private instance: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  private botToken: string;
  private scopes: string[];
  public accessToken?: string;
  public accessTokenExpiry?: number;

  public constructor() {
    this.clientId = DISCORD_CLIENT_ID;
    this.clientSecret = DISCORD_CLIENT_SECRET;
    this.botToken = DISCORD_BOT_TOKEN;
    this.scopes = ['identify', 'guilds.join'];
    this.instance = axios.create({
      baseURL: 'https://discordapp.com/api',
      timeout: 1000,
    });
  }

  private serializeScopes() {
    return this.scopes.reduce((acc, val) => acc + val + ' ', '').trim();
  }

  public generateRedirectURI() {
    return (
      `${this.instance.defaults.baseURL}/oauth2/authorize?` +
      qs.stringify({
        /* eslint-disable @typescript-eslint/camelcase */
        client_id: this.clientId,
        redirect_uri: `${BASE_URL}/api/discord/return`,
        response_type: 'code',
        scope: this.serializeScopes(),
        /* eslint-enable @typescript-eslint/camelcase */
      })
    );
  }

  public async getAccessToken(code: string) {
    const requestData = {
      /* eslint-disable @typescript-eslint/camelcase */
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${BASE_URL}/api/discord/return`,
      scope: this.serializeScopes(),
      /* eslint-enable @typescript-eslint/camelcase */
    };

    const config: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const response = await this.instance.post<AccessTokenResponse>(
        '/oauth2/token',
        qs.stringify(requestData),
        config,
      );

      this.accessToken = response.data.access_token;
      this.accessTokenExpiry = response.data.expires_in;
    } catch (e) {
      Logger.Err(e.response.data, true);
      if (e.response.status === 400) {
        throw new InvalidCodeError();
      } else {
        throw new Error(e);
      }
    }
  }

  public async getProfile() {
    if (!this.accessToken) {
      throw new NoAccessTokenError();
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + this.accessToken,
      },
    };

    try {
      const response = await this.instance.get<User>('/users/@me', config);

      return response.data;
    } catch (e) {
      Logger.Err(e, true);
      if (e.response.status === 401 || e.response.status === 403) {
        throw new ExpiredAccessTokenError();
      } else {
        throw new Error(e);
      }
    }
  }

  public async enroll(roles: number[], nickname?: string) {
    try {
      Logger.Info('getProfile 1');
      const user = await this.getProfile();
      Logger.Info('getProfile 2');

      const requestData = {
        /* eslint-disable @typescript-eslint/camelcase */
        access_token: this.accessToken,
        nick: nickname || user.username,
        roles,
        /* eslint-enable @typescript-eslint/camelcase */
      };

      const config: AxiosRequestConfig = {
        headers: {
          Authorization: 'Bot ' + this.botToken,
        },
      };

      const url = `/guilds/${DISCORD_GUILD_ID}/members/${user.id}`;
      Logger.Imp(
        {
          url,
          config,
          requestData,
        },
        true,
      );

      const putResponse = await this.instance.put(url, requestData, config);

      if (putResponse.status === 201) {
        return true;
      }

      const roleAssignments: Promise<AxiosResponse>[] = [];

      for (const role of roles) {
        roleAssignments.push(this.instance.put(`${url}/roles/${role}`, undefined, config));
      }

      await Promise.all(roleAssignments);
      return true;
    } catch (e) {
      Logger.Err(e, true);
      if (e instanceof NoAccessTokenError || e.response.status === 401 || e.response.status === 403) {
        Logger.Warn(e, true);
        throw new ExpiredAccessTokenError();
      } else {
        throw new Error(e);
      }
    }
  }

  public async status() {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bot ' + this.botToken,
      },
    };

    try {
      await this.instance.get('/users/@me', config);
      return;
    } catch (e) {
      throw e;
    }
  }
}

export default DiscordService;
