// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Router, Request, Response } from 'express';
import statusRotuer from './status/status';

/**
 * Global Router
 */
const router = Router();

/**
 * @todo Use package.json for version and name
 */
router.get('/', (_req: Request, res: Response): void => {
  res.send('HackSoc Nottingham Core version 1.0.0');
});

router.use('/status', statusRotuer);

export default router;
