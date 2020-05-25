// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import GitHubService, { GitHubOauthService } from '../services/GitHub';
import { Request, Response } from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import { Logger } from '@overnightjs/logger';

@Controller('api/github')
@ClassMiddleware(isAuthenticated)
class GitHubController {
  private readonly gitHubService: GitHubService;

  public constructor() {
    this.gitHubService = new GitHubService();
  }

  @Get('check_membership/:username')
  public async checkMembership(req: Request, res: Response) {
    const { username } = req.params;

    try {
      if (!this.gitHubService.getToken()) {
        await this.gitHubService.auth();
      }
      const membershipStatus = await this.gitHubService.checkMembership(username);
      return res.status(OK).json(membershipStatus);
    } catch (e) {
      Logger.Err(e, true);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Unknown Error Occurred')
        .end();
    }
  }

  @Get('whoami')
  public async whoami(req: Request, res: Response) {
    if (!req.session || !req.session.gitHubToken) {
      Logger.Info('No GitHub Token in Session');
      return res
        .status(BAD_REQUEST)
        .send('Missing GitHub Token. Please authenticate.')
        .end();
    }

    const githubOauthService = new GitHubOauthService(req.session.gitHubToken);

    try {
      const profile = await githubOauthService.getProfile();
      return res
        .status(OK)
        .json(profile)
        .end();
    } catch (e) {
      Logger.Err(e, true);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Server Error Occured.')
        .end();
    }
  }
}

export default GitHubController;
