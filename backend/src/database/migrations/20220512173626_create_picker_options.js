exports.up = function (knex) {
  return knex.schema.createTable("picker_options", function (table) {
    table.increments(); //id
    table.string("name").unique();
    table.string("title");
    table.string("description").notNullable();
    table.json("definition");
    table.string("associated_form");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("picker_options");
};
