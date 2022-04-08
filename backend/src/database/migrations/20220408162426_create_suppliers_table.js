exports.up = function (knex) {
  return knex.schema.createTable("suppliers", function (table) {
    table.increments(); //id
    table.string("name").notNullable();
    table.string("signing_authority").notNullable();
    table.string("financial_contact");
    table.string("province_state");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("suppliers");
};
