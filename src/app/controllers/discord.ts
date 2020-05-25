// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes';
import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { ExpiredAccessTokenError, InvalidCodeError, NoAccessTokenError } from '../services/Discord/errors';
import { Request, Response } from 'express';
import Database from '../services/Database';
import DiscordService from '../services/Discord/Discord';
import isAuthenticated from '../middleware/isAuthenticated';
import { Logger } from '@overnightjs/logger';

@Controller('api/discord')
@ClassMiddleware(isAuthenticated)
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

  private async roles(jobTitle: string, groups: string[]) {
    const db = Database.getInstance();
    try {
      const positionGroup = (await db.getPositionGroup(jobTitle)).map(group => ({
        name: group.name,
        id: group.role,
      }));
      const roleGroups = (await db.findGroups(groups)).map(group => ({
        name: group.discordRoleName,
        id: group.discordRoleId,
      }));

      return [...positionGroup, ...roleGroups].filter(role => !!role.id && !!role.name) as {
        name: string;
        id: number;
      }[];
    } catch (e) {
      throw e;
    }
  }

  @Get('roles')
  public async getRoles(req: Request, res: Response) {
    if (!req.session) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Session failed to initialize.')
        .end();
    }

    if (!req.session.groups && !req.session.jobTitle) {
      return res
        .status(BAD_REQUEST)
        .send('Missing Azure AD keys')
        .end();
    }

    try {
      const roles = (await this.roles(req.session.jobTitle, req.session.groups)).map(group => group.name);

      return res
        .status(OK)
        .json({ roles })
        .end();
    } catch (e) {
      Logger.Err(e, true);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Unknown Error Occurred')
        .end();
    }
  }

  @Get('enrol')
  public async enrol(req: Request, res: Response) {
    if (!req.session) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Session failed to initialize.')
        .end();
    }

    if (!req.session.groups && !req.session.jobTitle) {
      return res
        .status(BAD_REQUEST)
        .send('Missing Azure AD keys')
        .end();
    }

    try {
      const roles = (await this.roles(req.session.jobTitle, req.session.groups)).map(group => group.id);

      const enrolmentResult = await this.discordService.enroll(
        roles,
        req.user ? (req.user as { displayName: string }).displayName : undefined,
      );

      if (enrolmentResult) {
        return res.status(OK).send('Successfully enrolled.');
      } else {
        throw new Error('User enrollment failed');
      }
    } catch (e) {
      if (e instanceof ExpiredAccessTokenError) {
        return res.status(UNAUTHORIZED).send('Token Expired');
      }
      Logger.Err(e, true);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Unknown Error Occurred')
        .end();
    }
  }
}

export default DiscordController;
