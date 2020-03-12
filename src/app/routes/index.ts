/**
 * @file Example Router for /status
 * @author Aaron Osher
 * @copyright HackSoc Nottingham 2019
 */

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
