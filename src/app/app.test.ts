// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import app from './app';
import request from 'supertest';

xdescribe('root', () => {
  it('should 200 with no path', async () => {
    await request(app)
      .get('')
      .expect(200);
  });
});
