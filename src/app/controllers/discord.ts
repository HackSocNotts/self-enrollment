// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { OK, BAD_REQUEST } from 'http-status-codes';
import { Get, Controller } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import DiscordService from '../services/Discord/Discord';
import { InvalidCodeError } from '../services/Discord/errors';

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
          expires: new Date(Date.now() + (this.discordService.accessTokenExpiry || 30 * 60)),
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
}

export default DiscordController;
