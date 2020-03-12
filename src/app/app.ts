/**
 * @file Manages the root express application
 * @author Aaron Osher
 * @copyright HackSoc Nottingham 2019
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import { errors } from 'celebrate';

/**
 * HackSoc Core API Express App
 */
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);
app.use('/api', routes);

app.use(errors());

export default app;
