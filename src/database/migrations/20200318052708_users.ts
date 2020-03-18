import * as Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table.uuid('user_id').unique();
    table.text('display_name');
    table.string('email');
    table.integer('discord_id');
  });
}

/**
 * @param knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('users');
}
