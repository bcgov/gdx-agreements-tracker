
exports.up = function(knex) {
  return knex.schema
    .createTable('capabilities', function(table) {
      table.increments(); //id
      table.string('name').notNullable(); //capability name
    })
    .createTable('role_capabilities', function(table) {
      table.increments(); //id
      table.integer('role_id').unsigned().references('roles.id');
      table.integer('capability_id').unsigned().references('capabilities.id');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('capabilities')
    .dropTable('role_capabilities');
};
