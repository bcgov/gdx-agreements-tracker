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
  {
    id: 14,
    name: "picker_options_read_all",
  },
  {
    id: 15,
    name: "general_read_all",
  },
  {
    id: 16,
    name: "general_read_mine",
  },
  {
    id: 17,
    name: "resources_read_all",
  },
  {
    id: 18,
    name: "resources_read_mine",
  },
  {
    id: 19,
    name: "projects_update_all",
  },
  {
    id: 20,
    name: "projects_update_mine",
  },
  {
    id: 21,
    name: "change_request_read_all",
  },
  {
    id: 22,
    name: "change_request_read_mine",
  },
  {
    id: 23,
    name: "report_read_mine",
  },
  {
    id: 24,
    name: "change_request_update_one",
  },
  {
    id: 25,
    name: "change_request_update_all",
  },
  {
    id: 26,
    name: "change_request_add_one",
  },
  {
    id: 27,
    name: "contracts_read_all",
  },
  {
    id: 28,
    name: "contracts_read_mine",
  },
  {
    id: 29,
    name: "resources_update_all",
  },
  {
    id: 30,
    name: "resources_update_mine",
  },
  {
    id: 31,
    name: "project_status_read_all",
  },
  {
    id: 32,
    name: "project_status_read_mine",
  },
  {
    id: 33,
    name: "contacts_update_all",
  },
  {
    id: 34,
    name: "contacts_add_one",
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
