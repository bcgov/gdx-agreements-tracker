const {AllCapabilities} = require("../AllCapabilities/index.ts");

const autoId = AllCapabilities.map((capability, index) => {
  return { id: index, name: capability };
});

exports.seed = (knex) => {
  const tableName = "capabilities";
  // Deletes ALL existing entries
  return knex
    .raw("SET session_replication_role = 'replica';")
    .then(() => knex(tableName).del())
    .then(() => knex(tableName).insert(autoId))
    .then(() =>
      knex.raw(`SELECT setval('public.capabilities_id_seq', ${AllCapabilities.length}, true);`)
    )
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};
