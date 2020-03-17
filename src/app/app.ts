// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express, { Request, RequestHandler, Response } from 'express';
import bodyParser from 'body-parser';
// @ts-ignore
import connectSessionKnex from 'connect-session-knex';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Database from './services/Database';
import DiscordController from './controllers/discord';
import { errors } from 'celebrate';
import { Logger } from '@overnightjs/logger';
import path from 'path';
import { Server } from '@overnightjs/core';
import session from 'express-session';
import { SESSION_SECRET } from '../config';

class SelfEnrollmentServer extends Server {
  public constructor() {
    super(process.env.NODE_ENV === 'development');
    this.app.use(express.static(path.join(__dirname, '../../frontend/build')));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors());

    const KnexSessionStore = connectSessionKnex(session);
    const DB = Database.getInstance();

    const store = new KnexSessionStore({
      knex: DB.getKnex(),
      tableName: 'sessions',
    });

    this.app.use(
      session({
        secret: SESSION_SECRET as string,
        cookie: {
          maxAge: 60 * 60 * 1000,
        },
        store: store,
      }),
    );

    // Should always be last call in constructor
    this.setupControllers();
  }

  private setupControllers() {
    const discordController = new DiscordController();

    super.addControllers([discordController], undefined, (errors() as unknown) as RequestHandler);
  }

  public start(port: number) {
    this.app.get('/*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
    this.app.listen(port, () => {
      Logger.Imp('Server listening on port: ' + port);
    });
  }
}

export default SelfEnrollmentServer;
