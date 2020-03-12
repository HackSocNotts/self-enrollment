// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express from 'express';
import request from 'supertest';
import status from '../status';

const app = express();
app.use(status);

describe('root', () => {
  it('should return 400 with no token', async () => {
    await request(app)
      .get('/')
      .expect(400);
  });

  it('should return 200 with toke', async () => {
    await request(app)
      .get('/')
      .query({ token: 'token' })
      .expect(200);
  });
});
