/**
 * @file Manages the root express application
 * @author Aaron Osher
 * @copyright HackSoc Nottingham 2019
 */

import request from 'supertest';
import app from './app';

describe('root', () => {
  it('should 200 with no path', async () => {
    await request(app)
      .get('')
      .expect(200);
  });
});
