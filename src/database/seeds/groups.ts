import * as Knex from 'knex';

/**
 * @param knex
 */
export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries

  return knex('groups')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('groups').insert([
        {
          uuid: '42A9CADA-F8B7-4D01-9D16-BFFC914187E6',
          name: 'discord-users',
          discord_role_name: 'Committee',
          discord_role_id: 639502171364261900,
        },
        {
          uuid: '02655824-7F09-4BE0-A37E-0FC9A5554231',
          name: 'committee',
          discord_role_name: 'Committee (Gold)',
          discord_role_id: 500364627205554200,
        },
        {
          uuid: '3658FA82-1DC9-4397-A3F5-1132389183DA',
          name: 'hacknotts',
          discord_role_name: 'HackNotts Organizer',
          discord_role_id: 506928736445399040,
        },
        {
          uuid: '1A5DCF8C-8589-451A-AD59-DB5F99C02BF0',
          name: 'discord-admin',
          discord_role_name: 'System Administrator',
          discord_role_id: 641096030452056000,
        },
      ]);
    });
}
