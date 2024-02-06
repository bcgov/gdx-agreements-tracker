exports.up = function (knex) {
  return knex.schema.withSchema("config").createTable("db_logs", function (table) {
    table
      .increments("id")
      .primary()
      .notNullable()
      .defaultTo(knex.raw("nextval('config.id_seq'::regclass)"));
    table.text("api_method");
    table.text("api_user");
    table.timestamp("api_date", { precision: 6 }).notNullable().defaultTo(knex.fn.now());
    table.json("api_body");
    table.text("api_url");
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema("config").dropTable("db_logs");
};
