// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { config } from 'dotenv';

if (!process.env.production) {
  require('ts-node/register');
}
config({ path: __dirname + '/../../.env' });

export const client = process.env.DB_CLIENT;
export const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: (process.env.DB_SSL === 'true'),
  options: {
    port: process.env.DB_PORT,
    enableArithAbort: true,
  },
};
export const pool = {
  min: 2,
  max: 10,
};
export const migrations = {
  tableName: 'knex_migrations',
  directory: __dirname + '/migrations',
};
export const seeds = {
  directory: __dirname + '/seeds',
};
export const timezone = 'UTC';

export default {
  client,
  connection,
  pool,
  migrations,
  timezone,
};
