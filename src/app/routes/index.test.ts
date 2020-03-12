// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express from 'express';
import request from 'supertest';
import index from '../routes';

const app = express();
app.use(index);

describe('root', () => {
  it('should return with name and version', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .expect('HackSoc Nottingham Core version 1.0.0');
  });
});
