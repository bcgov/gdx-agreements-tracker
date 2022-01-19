exports.up = function (knex) {
  return knex.schema
    .createTable("roles", function (table) {
      table.increments(); //id
      table.string("name").notNullable(); //role name
      table.string("display_name").notNullable(); // Role Name for Humans
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("user_roles", function (table) {
      table.increments(); //id
      table.integer("user_id").unsigned().references("users.id");
      table.integer("role_id").unsigned().references("roles.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex
    .raw("SET session_replication_role = 'replica';")
    .then(() => knex.raw("DROP TABLE user_roles CASCADE;"))
    .then(() => knex.raw("DROP TABLE roles CASCADE;"))
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};
