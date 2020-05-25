// Copyright (c) 2020 HackSoc Nottingham

//

// This software is released under the MIT License.

// https://opensource.org/licenses/MIT

import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Request, Response } from 'express';
import GitHubService from '../services/GitHub';
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
}

export default GitHubController;
