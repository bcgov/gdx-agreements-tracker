exports.up = function (knex) {
  return knex.schema.withSchema("config").createTable("db_logs", function (table) {
    table
      .increments("id")
      .primary()
      .notNullable()
      .defaultTo(knex.raw("nextval('config.id_seq'::regclass)"));
    table.string("api_method");
    table.string("api_user");
    table.timestamp("api_date", { precision: 6 }).notNullable().defaultTo(knex.fn.now());
    table.json("api_body");
    table.string("api_url");
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema("config").dropTable("db_logs");
};
