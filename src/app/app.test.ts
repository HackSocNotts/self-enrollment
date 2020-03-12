// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import request from 'supertest';
import app from './app';

describe('root', () => {
  it('should 200 with no path', async () => {
    await request(app)
      .get('')
      .expect(200);
  });
});
