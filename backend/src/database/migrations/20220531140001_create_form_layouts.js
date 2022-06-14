exports.up = function (knex) {
  return knex.schema.withSchema("config").createTable("form_layouts", function (table) {
    table.increments(); //id
    table.string("associated_table").unique();
    table.string("title");
    table.string("description").notNullable();
    table.json("definition");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("form_layouts");
};
