exports.up = function (knex) {
  return knex.schema
    .createTable("capabilities", function (table) {
      table.increments(); //id
      table.string("name").notNullable(); // capability name
      table.string("description"); // plaintext description of the capability
    })
    .createTable("role_capabilities", function (table) {
      table.increments(); //id
      table.integer("role_id").unsigned().references("roles.id");
      table.integer("capability_id").unsigned().references("capabilities.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex
    .raw("SET session_replication_role = 'replica';")
    .then(() => knex.raw("DROP TABLE role_capabilities CASCADE;"))
    .then(() => knex.raw("DROP TABLE capabilities CASCADE;"))
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};
