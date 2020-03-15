// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { OK, BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Get, Controller } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import DiscordService from '../services/Discord/Discord';
import { InvalidCodeError, ExpiredAccessTokenError, NoAccessTokenError } from '../services/Discord/errors';

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
      return res.status(BAD_REQUEST).send('discord access token is missing.');
    }

    try {
      await this.discordService.getAccessToken(req.query.code);
      return res
        .status(OK)
        .cookie('discord', this.discordService.accessToken, {
          secure: true,
          sameSite: true,
          httpOnly: true,
          expires: new Date(Date.now() + (this.discordService.accessTokenExpiry || 30 * 60 * 1000)),
        })
        .redirect('/');
    } catch (e) {
      if (e instanceof InvalidCodeError) {
        Logger.Warn('Provided with bad Discord Access token');
        res.status(BAD_REQUEST).send('Invalid OAuth Token.');
      } else {
        Logger.Err(e, true);
        res.status(500).send('Unknown Error Occurred');
      }
    }
  }

  @Get('redirectURI')
  public getRedirectURI(_req: Request, res: Response) {
    res.status(OK).json({
      redirectURI: this.discordService.generateRedirectURI(),
    });
  }

  @Get('profile')
  public async getProfile(req: Request, res: Response) {
    if (!req.cookies.discord) {
      Logger.Info('No Discord Access Token in Cookies');
      res.status(BAD_REQUEST).send('Missing Discord Access Token');
    }

    this.discordService.accessToken = req.cookies.discord;

    try {
      const profile = await this.discordService.getProfile();

      return res.status(OK).json(profile);
    } catch (e) {
      if (e instanceof ExpiredAccessTokenError) {
        Logger.Info('Discord Access Token has Expired');
        return res
          .clearCookie('discord')
          .status(UNAUTHORIZED)
          .send('Discord Access Token Expired');
      } else if (e instanceof NoAccessTokenError) {
        Logger.Info('No Discord Access Token Provided');
        return res.status(BAD_REQUEST).send('Missing Discord Access Token');
      } else {
        Logger.Err(e, true);
        return res.status(INTERNAL_SERVER_ERROR).send('Unknown Error Occurred');
      }
    }
  }
}

export default DiscordController;
