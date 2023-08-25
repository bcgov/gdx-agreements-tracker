exports.up = function (knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS pgaudit');
  };
  
  exports.down = function (knex) {
    return knex.schema.raw('DROP EXTENSION IF EXISTS pgaudit');
  };
  