// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import 'isomorphic-fetch';
import { AuthenticationProvider, Client } from '@microsoft/microsoft-graph-client';

class InternalAuthenticationProvider implements AuthenticationProvider {
  private readonly accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getAccessTokenSync() {
    return this.accessToken;
  }

  public async getAccessToken() {
    return this.accessToken;
  }
}

class AzureAD {
  private readonly authProvider: InternalAuthenticationProvider;
  private readonly client: Client;

  public constructor(accessToken: string) {
    this.authProvider = new InternalAuthenticationProvider(accessToken);
    this.client = Client.initWithMiddleware({
      authProvider: this.authProvider,
    });
  }

  public async getUserDetails() {
    try {
      const userDetails = await this.client.api('/me').get();
      return userDetails;
    } catch (error) {
      throw error;
    }
  }

  public async getGroups() {
    try {
      const result = await this.client.api('/me/transitiveMemberOf').get();
      const groups = result.value;
      return groups.map((group: { id: string }) => group.id) as string[];
    } catch (error) {
      throw error;
    }
  }
}

export default AzureAD;
