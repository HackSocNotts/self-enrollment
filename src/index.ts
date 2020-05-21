// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Database from './app/services/Database';
import SelfEnrollmentServer from './app';

const PORT = ((process.env.PORT as unknown) as number) || 3000;

if (process.env.production) {
  const db = Database.getInstance();
  const knexInstance = db.getKnex();
  knexInstance.migrate.latest();
}

const selfEnrollmentServer = new SelfEnrollmentServer();
selfEnrollmentServer.start(PORT);
