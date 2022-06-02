exports.up = function (knex) {
  /**
   * Add new columns to schema
   *
   * @returns {schema}
   */
  function pickerOptionsWithDefault() {
    return knex.schema.alterTable("picker_options", function (table) {
      table.string("form_tab");
    });
  }

  return pickerOptionsWithDefault();
};

/**
 * Delete all columns in table
 *
 * @returns {schema}
 */

exports.down = function (knex) {
  return knex.schema.alterTable("picker_options", function (table) {
    table.dropColumn("form_tab");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("picker_options");
};
