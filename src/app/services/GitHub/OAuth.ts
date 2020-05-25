// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_ORGANISATION } from '../../../config';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { NoTokenError } from './errors';
import { OAuthAccesTokenAuthentication } from '@octokit/auth-app/dist-types/types';
import { Octokit } from '@octokit/rest';
import { Optional } from '../../../utils/types';
import qs from 'querystring';

class GitHubOAuthService {
  //@ts-ignore
  private readonly app: Octokit;
  private static readonly scopes = ['emails:write'];
  private token: Optional<string>;

  public constructor(token?: string) {
    if (token) {
      this.app = new Octokit({
        auth: token,
      });
      this.token = token;
      return;
    }

    this.app = new Octokit({
      authStrategy: createOAuthAppAuth,
      auth: {
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
      },
    });
  }

  private static serializeScopes() {
    return this.scopes.reduce((acc, val) => acc + val + ' ', '').trim();
  }

  public static generateRedirectURI(state: string) {
    return (
      `https://github.com/login/oauth/authorize?` +
      qs.stringify({
        /* eslint-disable @typescript-eslint/camelcase */
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: `${BASE_URL}/api/github/oauth`,
        scope: this.serializeScopes(),
        state,
        /* eslint-enable @typescript-eslint/camelcase */
      })
    );
  }

  public async auth(code: string, state: string) {
    try {
      const { token } = (await this.app.auth({
        type: 'token',
        code,
        state,
      })) as OAuthAccesTokenAuthentication;

      this.token = token;
      return token;
    } catch (e) {
      throw e;
    }
  }

  public async getProfile() {
    if (!this.token) throw new NoTokenError();

    try {
      return (await this.app.users.getAuthenticated()).data;
    } catch (e) {
      throw e;
    }
  }

  public async addEmail(email: string) {
    return this.app.users.addEmails({
      emails: [email],
    });
  }

  public async acceptInvitation() {
    return this.app.orgs.updateMembership({
      org: GITHUB_ORGANISATION,
      state: 'active',
    });
  }
}

export default GitHubOAuthService;
