exports.up = function (knex) {
  return knex.schema.withSchema("data").table("db_lock", function (t) {
    t.dropColumn("locked_row_id");
    t.specificType("locked_row_ids", "INT[]");
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema("data").table("db_lock", function (t) {
    t.dropColumn("locked_row_ids");
    t.integer("locked_row_id").unsigned();
  });
};
