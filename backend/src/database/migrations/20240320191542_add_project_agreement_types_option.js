exports.up = function (knex) {
  return knex.schema
    .withSchema("config")
    .createTable("project_agreement_types_option", function (table) {
      table
        .increments("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("nextval('config.id_seq'::regclass)"));
      table.string("label");
      table.string("value");
    });
};

exports.down = function (knex) {
  return knex.schema.withSchema("config").dropTable("project_agreement_types_option");
};
