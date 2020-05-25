import * as Knex from 'knex';

/**
 * @param knex
 */
export async function up(knex: Knex): Promise<any> {
  const groups = knex.schema.alterTable('groups', table => {
    table.text('github_team_slug');
  });
  const position_groups = knex.schema.alterTable('position_groups', table => {
    table.text('github_team_slug');
  });

  return Promise.all([groups, position_groups]);
}

/**
 * @param knex
 */
export async function down(knex: Knex): Promise<any> {
  const groups = knex.schema.alterTable('groups', table => {
    table.dropColumn('github_team_slug');
  });
  const position_groups = knex.schema.alterTable('position_groups', table => {
    table.dropColumn('github_team_slug');
  });

  return Promise.all([groups, position_groups]);
}
