// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  GITHUB_APP_ID,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_INSTALLATION_ID,
  GITHUB_PRIVATE_KEY,
} from '../../../config';
import { createAppAuth } from '@octokit/auth-app';
import { InstallationAccessTokenData } from '@octokit/auth-app/dist-types/types';
import { Octokit } from '@octokit/rest';
import { Optional } from '../../../utils/types';

class GitHub {
  private readonly app: Octokit;
  private token: Optional<string>;

  public constructor() {
    this.app = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        id: parseInt(GITHUB_APP_ID),
        privateKey: GITHUB_PRIVATE_KEY,
        installationId: parseInt(GITHUB_INSTALLATION_ID),
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
      },
    });
  }

  public async auth() {
    try {
      const { token } = (await this.app.auth({ type: 'installation' })) as InstallationAccessTokenData;
      this.token = token;
    } catch (e) {
      throw e;
    }
  }

  public getToken() {
    return this.token;
  }
}

export default GitHub;
