// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  } else {
    return res.status(UNAUTHORIZED).send('Not authorized. User must be logged in');
  }
};

export default isAuthenticated;
