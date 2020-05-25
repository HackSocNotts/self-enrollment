// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import GitHubService, { GitHubOauthService } from '../services/GitHub';
import { Request, Response } from 'express';
import Database from '../services/Database';
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

  private async teams(jobTitle: string, groups: string[]) {
    const db = Database.getInstance();
    try {
      const positionTeam = (await db.getPositionGroup(jobTitle)).map(group => ({
        slug: group.gitHubTeam,
      }));
      const roleTeam = (await db.findGroups(groups)).map(group => ({
        slug: group.gitHubTeamSlug,
      }));

      return [...positionTeam, ...roleTeam].filter(team => !!team.slug) as {
        slug: string;
      }[];
    } catch (e) {
      throw e;
    }
  }

  @Get('teams')
  public async getTeams(req: Request, res: Response) {
    if (!req.session) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send('Session failed to initialize.')
        .end();
    }

    if (!req.session.groups || !req.session.jobTitle) {
      return res
        .status(BAD_REQUEST)
        .send('Missing Azure AD keys')
        .end();
    }

    try {
      const teams = (await this.teams(req.session.jobTitle, req.session.groups)).map(team => team.slug);

      return res
        .status(OK)
        .json({ teams })
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

    if (!req.session.groups || !req.session.jobTitle || !req.user) {
      return res
        .status(BAD_REQUEST)
        .send('Missing Azure AD keys')
        .end();
    }

    if (!req.session || !req.session.gitHubToken) {
      Logger.Info('No GitHub Token in Session');
      return res
        .status(BAD_REQUEST)
        .send('Missing GitHub Token. Please authenticate.')
        .end();
    }

    try {
      const githubOauthService = new GitHubOauthService(req.session.gitHubToken);
      const { login: username } = await githubOauthService.getProfile();
      const { username: email } = req.user as { username: string };
      const teams = (await this.teams(req.session.jobTitle, req.session.groups)).map(team => team.slug);

      await this.gitHubService.addToOrg(username);
      Logger.Info(`Added ${username} to GitHub Organisation`);

      for (const team of teams) {
        await this.gitHubService.addToTeam(team, username);
        Logger.Info(`Added ${username} to GitHub team: ${team}`);
      }

      await githubOauthService.addEmail(email);
      Logger.Info(`Added ${email} to ${username}'s GitHub account`);
      await githubOauthService.acceptInvitation();
      Logger.Info(`Accepted ${username}'s GitHub Organisation Invitation`);

      return res.status(OK).send('Successfully enrolled.');
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
