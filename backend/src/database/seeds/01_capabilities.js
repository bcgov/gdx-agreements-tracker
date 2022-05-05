const capabilities = [
  {
    id: 1,
    name: "users_create_all",
  },
  {
    id: 2,
    name: "users_update_all",
  },
  {
    id: 3,
    name: "users_delete_all",
  },
  {
    id: 4,
    name: "users_read_all",
  },
  {
    id: 5,
    name: "users_create_mine",
  },
  {
    id: 6,
    name: "users_update_mine",
  },
  {
    id: 7,
    name: "users_delete_mine",
  },
  {
    id: 8,
    name: "users_read_mine",
  },
  {
    id: 9,
    name: "reports_read_all",
  },
  {
    id: 10,
    name: "contacts_read_all",
  },
  {
    id: 11,
    name: "suppliers_read_all",
  },
  {
    id: 12,
    name: "subcontractors_read_all",
  },
  {
    id: 13,
    name: "projects_read_all",
  },
];

exports.seed = (knex) => {
  const tableName = "capabilities";
  // Deletes ALL existing entries
  return knex
    .raw("SET session_replication_role = 'replica';")
    .then(() => knex(tableName).del())
    .then(() => knex(tableName).insert(capabilities))
    .then(() =>
      knex.raw(`SELECT setval('public.capabilities_id_seq', ${capabilities.length}, true);`)
    )
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};
