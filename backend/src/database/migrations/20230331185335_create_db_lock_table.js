exports.up = function (knex) {
  return knex.schema.withSchema("data").createTable("db_lock", function (table) {
    table.increments().primary(); //id column
    table.string("locked_table");
    table.string("locked_by");
    table.integer("locked_row_id").unsigned();
    table.date("locked_date");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("db_lock");
};
