const subcontractors = [
  {
    id: 1,
    name: "ITI",
  },
  {
    id: 2,
    name: "Jacob",
  },
  {
    id: 3,
    name: "Jackie",
  },
  {
    id: 4,
    name: "Jefferson",
  },
  {
    id: 5,
    name: "John",
  },
];

exports.seed = function (knex) {
  return knex
    .raw("SET session_replication_role = 'replica';") // Turn off foreign key constraints.
    .then(() => knex("subcontractors").del())
    .then(() => knex("subcontractors").insert(subcontractors))
    .then(() =>
      knex.raw(`SELECT setval('public.subcontractors_id_seq', ${subcontractors.length}, true);`)
    ) // Resume foreign key constraints.
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};

exports.subcontractors = subcontractors; // Export the subcontractors array for testing.
