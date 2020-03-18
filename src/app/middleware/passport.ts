// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AAD_CLIENT_ID, AAD_CLIENT_SECRET, AAD_IDENTITY_METADATA, BASE_URL } from '../../config';
import AzureAD from '../services/AzureAD';
import Database from '../services/Database';
// import { Logger } from '@overnightjs/logger';
import { OIDCStrategy } from 'passport-azure-ad';
import passport from 'passport';
import { Logger } from '@overnightjs/logger';

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: AAD_IDENTITY_METADATA as string,
      clientID: AAD_CLIENT_ID as string,
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl: (BASE_URL as string) + '/auth/return',
      clientSecret: AAD_CLIENT_SECRET as string,
      passReqToCallback: true,
    },
    /* eslint-disable @typescript-eslint/camelcase */
    async (req, _iss, _sub, _profile, _jwtClaims, _access_token, _refresh_token, params, done) => {
      /* eslint-enable @typescript-eslint/camelcase */
      if (!req.session) {
        return done('No Session');
      }
      req.session.azureADToken = params.access_token;
      const azureAD = new AzureAD(params.access_token);
      const db = Database.getInstance();

      const profile = await azureAD.getUserDetails();

      try {
        await db.addUserIfNotExists({ id: profile.id, email: profile.mail, displayName: profile.displayName });
        Logger.Info(profile, true);
        return done(null, profile);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user: { id: string }, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const db = Database.getInstance();

  try {
    const profile = await db.getUserById(id);
    return done(null, profile);
  } catch (err) {
    return done(err);
  }
});
