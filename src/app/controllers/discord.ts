// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { ExpiredAccessTokenError, InvalidCodeError, NoAccessTokenError } from '../services/Discord/errors';
import { Request, Response } from 'express';
import DiscordService from '../services/Discord/Discord';
import { Logger } from '@overnightjs/logger';

@Controller('api/discord')
class DiscordController {
  private readonly discordService: DiscordService;

  public constructor() {
    this.discordService = new DiscordService();
  }

  @Get('return')
  public async getOAuthReturn(req: Request, res: Response) {
    if (!req.query.code) {
      Logger.Info('No code provided to discord oauth return');
      return res
        .status(BAD_REQUEST)
        .send('discord access token is missing.')
        .end();
    }

    try {
      await this.discordService.getAccessToken(req.query.code);
      if (req.session) {
        req.session.discord = this.discordService.accessToken;
        await new Promise((resolve, reject) => {
          (req.session as Express.Session).save(err => {
            if (err) {
              return reject(err);
            }
            return resolve(err);
          });
        });
        return res.status(OK).redirect('/');
      } else {
        throw new Error('Failed to access session');
      }
    } catch (e) {
      if (e instanceof InvalidCodeError) {
        Logger.Warn('Provided with bad Discord Access token');
        return res
          .status(BAD_REQUEST)
          .send('Invalid OAuth Token.')
          .end();
      } else {
        Logger.Err(e, true);
        return res
          .status(500)
          .send('Unknown Error Occurred')
          .end();
      }
    }
  }

  @Get('redirectURI')
  public getRedirectURI(_req: Request, res: Response) {
    res
      .status(OK)
      .json({
        redirectURI: this.discordService.generateRedirectURI(),
      })
      .end();
  }

  @Get('profile')
  public async getProfile(req: Request, res: Response) {
    if (!req.session || !req.session.discord) {
      Logger.Info('No Discord Access Token in Session');
      return res
        .status(BAD_REQUEST)
        .send('Missing Discord Access Token')
        .end();
    }

    this.discordService.accessToken = req.session.discord;

    try {
      const profile = await this.discordService.getProfile();

      return res.status(OK).json(profile);
    } catch (e) {
      if (e instanceof ExpiredAccessTokenError) {
        Logger.Info('Discord Access Token has Expired');
        req.session.discord = undefined;
        return res
          .status(UNAUTHORIZED)
          .send('Discord Access Token Expired')
          .end();
      } else if (e instanceof NoAccessTokenError) {
        Logger.Info('No Discord Access Token Provided');
        return res
          .status(BAD_REQUEST)
          .send('Missing Discord Access Token')
          .end();
      } else {
        Logger.Err(e, true);
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send('Unknown Error Occurred')
          .end();
      }
    }
  }
}

export default DiscordController;
