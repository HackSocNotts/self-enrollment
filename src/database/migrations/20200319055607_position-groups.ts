import * as Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('position_groups', table => {
    table.bigInteger('role_id').unique();
    table.text('name');
  });
}

/**
 * @param knex
 */
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('position_groups');
}
