const fs = require("fs");

const layouts = JSON.parse(fs.readFileSync("./src/database/seeds/masterFormsMap.json", "utf8"));

exports.seed = function (knex) {
  return knex
    .raw("SET session_replication_role = 'replica';") // Turn off foreign key constraints.
    .then(() => knex("form_layouts").withSchema("config").del())
    .then(() => knex("form_layouts").withSchema("config").insert(layouts))
    .then(() =>
      knex.raw(`SELECT setval('config.form_layouts_id_seq', ${layouts.length}, true);`)
    ) // Resume foreign key constraints.
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};

exports.subcontractors = layouts; // Export the subcontractors array for testing.
