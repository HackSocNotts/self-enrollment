import * as Knex from 'knex';

/**
 * @param knex
 */
export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('position_groups')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('position_groups').insert([
        {
          role_id: 500364331637014500,
          name: 'President',
        },
        {
          role_id: 638491338530226200,
          name: 'Vice President',
        },
        {
          role_id: 500364736026771460,
          name: 'Development Secretary',
        },
        {
          role_id: 500364505285656600,
          name: 'General Secretary',
        },
        {
          role_id: 500364691701366850,
          name: 'Treasurer',
        },
        {
          role_id: 500364690220908540,
          name: 'Social Medial and Communications Officer',
        },
        {
          role_id: 500364765219127300,
          name: 'Welfare and Inclusivity Secretary',
        },
        {
          role_id: 638491391005294600,
          name: 'Partners Secretary',
        },
        {
          role_id: 555116962703736800,
          name: 'Cyber Security General Secretary',
        },
        {
          role_id: 562384507722792960,
          name: 'Speaker Acquisition Secretary',
        },
        {
          role_id: 512631234694873100,
          name: 'Graphics Officer',
        },
      ]);
    });
}
