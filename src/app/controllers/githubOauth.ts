// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { GitHubOauthService } from '../services/GitHub';
import { Logger } from '@overnightjs/logger';
import { v4 as uuidv4 } from 'uuid';

@Controller('api/github/oauth')
class GitHubOauthController {
  @Get('start')
  public startOauth(req: Request, res: Response) {
    if (!req.session) {
      Logger.Err('Session not acessible');
      return res
        .status(500)
        .send('Server error occured. Check logs.')
        .end();
    }

    const state = uuidv4();
    req.session.gitHubOauthState = state;

    const redirectUri = GitHubOauthService.generateRedirectURI(state);

    return res.redirect(redirectUri);
  }

  @Get('')
  public async processCode(req: Request, res: Response) {
    const { code, state } = req.query;

    if (!req.session) {
      Logger.Err('Session not acessible');
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Server error occured. Check logs.')
        .end();
    }

    if (!state || !req.session.gitHubOauthState || state !== req.session.gitHubOauthState) {
      return res
        .status(BAD_REQUEST)
        .send('Invalid State. Try again.')
        .end();
    }

    try {
      const githubOauthService = new GitHubOauthService();
      const token = await githubOauthService.auth(code, state);

      req.session.gitHubToken = token;

      return res
        .status(OK)
        .send(token)
        .end();
    } catch (e) {
      Logger.Err(e, true);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('An error occured')
        .end();
    }
  }
}

export default GitHubOauthController;
