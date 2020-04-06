// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

if (!process.env.production) {
  require('ts-node/register');
}

export const client = 'mssql';
export const connection = {
  server: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
  directory: 'migrations',
};
export const timezone = 'UTC';

export default {
  client,
  connection,
  pool,
  migrations,
  timezone,
};
