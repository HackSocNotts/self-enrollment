// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, RequestHandler } from 'express';
import path from 'path';
import { errors } from 'celebrate';
import { Server } from '@overnightjs/core';
import DiscordController from './controllers/discord';
import { Logger } from '@overnightjs/logger';

class SelfEnrollmentServer extends Server {
  public constructor() {
    super(process.env.NODE_ENV === 'development');
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.setupControllers();
  }

  private setupControllers() {
    const discordController = new DiscordController();

    super.addControllers([discordController], undefined, (errors() as unknown) as RequestHandler);
  }

  public start(port: number) {
    this.app.use(express.static(path.join(__dirname, '../../frontend/build')));
    this.app.get('/*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
    this.app.listen(port, () => {
      Logger.Imp('Server listening on port: ' + port);
    });
  }
}

export default SelfEnrollmentServer;
