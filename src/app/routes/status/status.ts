/**
 * @file Example Router for /status
 * @author Aaron Osher
 * @copyright HackSoc Nottingham 2019
 */

import { Router, Request, Response } from 'express';
import Joi from '@hapi/joi';
import { celebrate, errors } from 'celebrate';

/**
 * Router for Status Checking
 */
const router = Router();

/**
 * Use @hapi/joi to validate request schemas
 */
const rootSchema = {
  query: {
    token: Joi.string()
      .token()
      .required(),
  },
};

router.get('/', celebrate(rootSchema), (_req: Request, res: Response): void => {
  res.send('Status Checks not implemented yet.');
});

router.use(errors());

export default router;
