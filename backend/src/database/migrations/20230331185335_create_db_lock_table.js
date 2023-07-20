exports.up = function (knex) {
  return knex.schema.withSchema("data").createTable("db_lock", function (table) {
    table.increments().primary(); //id column
    table.string("locked_table");
    table.string("locked_by");
    table.specificType("locked_row_ids", "INT[]");
    table.date("locked_date");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("db_lock");
};
