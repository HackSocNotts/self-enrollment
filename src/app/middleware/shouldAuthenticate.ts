// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextFunction, Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
// import { UNAUTHORIZED } from 'http-status-codes';

const shouldAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    Logger.Info('User logged in');
    return next();
  }
  Logger.Warn('User not logged in. Redirecting...');
  return res.redirect('/auth/login');
};

export default shouldAuthenticate;
