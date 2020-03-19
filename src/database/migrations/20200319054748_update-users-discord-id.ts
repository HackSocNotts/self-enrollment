import * as Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', table => {
    table.bigInteger('discord_id').alter();
  });
}

/**
 * @param knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', table => {
    table.integer('discord_id').alter();
  });
}
