// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

/**
 * HackSoc Core API Express App
 */
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use('/api', routes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

app.use(errors());

export default app;
