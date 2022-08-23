exports.up = function (knex) {
  return knex.schema.alterTable('public.users', (table) => {
          table.smallint('role_id')
        });
};

exports.down = function (knex) {
};
