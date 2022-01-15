
exports.up = function(knex) {
  return knex.schema
    .createTable('roles', function(table) {
      table.increments(); //id
      table.string('name').notNullable(); //role name
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('user_roles', function(table) {
      table.increments(); //id
      table.integer('user_id').unsigned().references('users.id');
      table.integer('role_id').unsigned().references('roles.id');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('roles')
    .dropTable('user_roles');
};
