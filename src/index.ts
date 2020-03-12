// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express from 'express';
import app from './app';

const server = express();
const PORT = ((process.env.PORT as unknown) as number) || 3000;

server.use(app);

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
