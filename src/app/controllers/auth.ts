// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import passport from 'passport';
// import { UNAUTHORIZED } from 'http-status-codes';

// interface User {
//   name: string;
// }

@Controller('auth')
class AuthController {
  @Get('login')
  @Middleware(passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }))
  public authLogin(_req: Request, res: Response) {
    Logger.Info('Login was called.');
    return res.redirect('/');
  }

  @Post('return')
  @Middleware(passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }))
  public authReturn(req: Request, res: Response) {
    return res.redirect('/auth/whoami');
  }

  @Get('logout')
  public logout(req: Request, res: Response) {
    req.logout();
    return res.redirect('/');
  }

  @Get('whoami')
  public whoAmI(req: Request, res: Response) {
    return res.json({ user: req.user });
  }
}

export default AuthController;
