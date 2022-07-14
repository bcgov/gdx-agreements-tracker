exports.up = function (knex) {
    return knex.schema.createTable("picker_options", function (table) {
        table.renameColumn("associated_table", "associated_form")
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("picker_options");
  };
  