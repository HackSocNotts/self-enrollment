// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Knex from 'knex';
import knexConfig from '../../../database/knexfile';

class Database {
  private static _instance: Database;
  private readonly db: Knex;

  private constructor() {
    this.db = Knex(knexConfig);
  }

  public static getInstance() {
    if (!this._instance) this._instance = new Database();
    return this._instance;
  }

  public getKnex() {
    return this.db;
  }

  public async addUserIfNotExists({
    id,
    displayName,
    username,
  }: {
    id: string;
    displayName: string;
    username: string;
  }) {
    try {
      const rows = await this.db('users')
        .select()
        .where('user_id', id);
      if (rows.length === 0) {
        /* eslint-disable @typescript-eslint/camelcase */
        await this.db('users').insert({ user_id: id, username, display_name: displayName });
        /* eslint-enable @typescript-eslint/camelcase */
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  public async getUserById(id: string) {
    try {
      const rows = await this.db('users')
        .select()
        .where('user_id', id);

      if (rows.length === 0) {
        throw new Error("User doesn't exists");
      }

      return { id, displayName: rows[0].display_name, username: rows[0].username };
    } catch (err) {
      throw err;
    }
  }
}

export default Database;
