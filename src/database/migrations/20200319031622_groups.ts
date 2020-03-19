import * as Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('groups', table => {
    table.uuid('uuid').unique();
    table.text('name');
    table.text('discord_role_name');
    table.bigInteger('discord_role_id');
  });
}

/**
 * @param knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('groups');
}
