<<<<<<< HEAD
const { AllCapabilities } = require("../AllCapabilities/index.ts");

const autoId = AllCapabilities.map((capability, index) => {
  return { id: index, name: capability };
});
=======
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
<<<<<<< HEAD
    name: "subcontractors_read_mine",
  },
  {
    id: 34,
    name: "subcontractors_update_all",
  },
  {
    id: 35,
    name: "subcontractors_update_mine",
  },
  {
    id: 36,
    name: "contacts_add_one",
  },
  {
    id: 37,
    name: "contacts_update_all",
  },
=======
    name: "contacts_update_all",
  },
  {
    id: 34,
    name: "contacts_add_one",
  },
>>>>>>> 26a0c8b (Added contact add/update capabilities and role capabilities.)
];
>>>>>>> 00ff177 (Added contact add/update capabilities and role capabilities.)

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
