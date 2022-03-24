const contacts = [
  {
    id: 1,
    first_name: "Mike",
    last_name: "Lara",
    job_title: "Technical Analyst",
    ministry_id: "CITZ",
    notes: "This is a note about Lara",
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Gonzalez",
    job_title: "Business Analyst",
    ministry_id: "CITZ",
    notes: "This is a note about Sarah",
  },
  {
    id: 3,
    first_name: "John",
    last_name: "Lara",
    job_title: "Developer",
    ministry_id: "CITZ",
    notes: "This is a note about John",
  },
  {
    id: 4,
    first_name: "Jacob",
    last_name: "Valencia",
    job_title: "IT Admin",
    ministry_id: "CITZ",
    notes: "This is a note about Jacob",
  },
  {
    id: 5,
    first_name: "Eric",
    last_name: "Richardson",
    job_title: "Director",
    ministry_id: "CITZ",
    notes: "This is a note about Eric",
  },
];

exports.seed = function (knex) {
  return knex
    .raw("SET session_replication_role = 'replica';") // Turn off foreign key constraints.
    .then(() => knex("contacts").del())
    .then(() => knex("contacts").insert(contacts))
    .then(() => knex.raw(`SELECT setval('public.contacts_id_seq', ${contacts.length}, true);`)) // Resume foreign key constraints.
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};

exports.contacts = contacts; // Export the contacts array for testing.
