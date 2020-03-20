// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { GroupsSchema, PositionGroupsSchema, UsersSchema } from './schemas';
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
        await this.db<UsersSchema>('users').insert({ user_id: id, username, display_name: displayName });
        /* eslint-enable @typescript-eslint/camelcase */
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  public async getUserById(id: string) {
    try {
      const rows = await this.db<UsersSchema>('users')
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

  public async getPositionGroup(jobTitle: string) {
    try {
      const rows = await this.db<PositionGroupsSchema>('position_groups')
        .select()
        .where('name', jobTitle);

      if (rows.length === 0) {
        return [];
      }

      return [{ role: rows[0].role_id, name: rows[0].name }];
    } catch (err) {
      throw err;
    }
  }

  public async findGroups(groupIds: string[]) {
    try {
      const rows = await this.db<GroupsSchema>('groups')
        .select()
        .whereIn('uuid', groupIds);

      return rows.map(row => ({
        uuid: row.uuid,
        name: row.name,
        discordRoleName: row.discord_role_name,
        discordRoleId: row.discord_role_id,
      }));
    } catch (err) {
      throw err;
    }
  }
}

export default Database;
