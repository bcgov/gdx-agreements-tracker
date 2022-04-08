const suppliers = [
  {
    id: 1,
    name: "ITI",
    signing_authority: "Lara",
    financial_contact: "Executive",
    province_state: "CA",
  },
  {
    id: 2,
    name: "Jacob",
    signing_authority: "Sierra",
    financial_contact: "UX Designer",
    province_state: "BC",
  },
  {
    id: 3,
    name: "Jackie",
    signing_authority: "James",
    financial_contact: "Director",
    province_state: "ON",
  },
  {
    id: 4,
    name: "Jefferson",
    signing_authority: "Marston",
    financial_contact: "Scrum Master",
    province_state: "AB",
  },
  {
    id: 5,
    name: "John",
    signing_authority: "Lara",
    financial_contact: "Product Owner",
    province_state: "BC",
  },
];

exports.seed = function (knex) {
  return knex
    .raw("SET session_replication_role = 'replica';") // Turn off foreign key constraints.
    .then(() => knex("suppliers").del())
    .then(() => knex("suppliers").insert(suppliers))
    .then(() => knex.raw(`SELECT setval('public.suppliers_id_seq', ${suppliers.length}, true);`)) // Resume foreign key constraints.
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};

exports.suppliers = suppliers; // Export the suppliers array for testing.
