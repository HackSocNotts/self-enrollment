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
}

export default Database;
