exports.up = function (knex) {
  return knex.raw("CREATE SCHEMA IF NOT EXISTS config");
};

exports.down = function (knex) {
  return knex.raw(
    "SET session_replication_role = 'replica'; DROP SCHEMA data CASCADE; SET session_replication_role = 'origin';"
  );
};

