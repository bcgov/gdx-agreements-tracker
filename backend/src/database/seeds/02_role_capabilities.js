const roles = [
  {
    id: 1,
    name: "subscriber",
    display_name: "Subscriber",
    capabilities: ["users_read_mine", "users_read_all"],
  },
  {
    id: 2,
    name: "admin",
    display_name: "Administrator",
    capabilities: [
      "users_create_all",
      "users_read_all",
      "users_update_all",
      "users_delete_all",
      "contacts_read_all",
      "suppliers_read_all",
      "subcontractors_read_all",
      "projects_read_all",
    ],
  },
  {
    id: 3,
    name: "gdx",
    display_name: "GDX",
    capabilities: ["reports_read_all"],
  },
  {
    id: 4,
    name: "manager",
    display_name: "Manager",
    capabilities: [],
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex
    .raw("SET session_replication_role = 'replica';")
    .then(() => knex("roles").del())
    .then(() => knex("role_capabilities").del())
    .then(() => knex.raw("ALTER SEQUENCE public.role_capabilities_id_seq RESTART WITH 1;"))
    .then(() => {
      // Get all of the capabilities, and turn them into key (the capability name) value (the id in the database) pairs.
      return knex("capabilities")
        .select("name", "id")
        .then((rows) => {
          let caps = {};
          rows.forEach((row) => {
            caps[row.name] = parseInt(row.id);
          });
          return caps;
        });
    })
    .then((capabilities) => {
      // Iterate through the roles above, creating them, then adding the capabilities to the roles in the roles_capabilities table.
      let promises = roles.map((role) => {
        return knex("roles")
          .insert((({ capabilities, ...o }) => o)(role), "id") // Insert the role object , but omit the `capabilities` property.
          .then((id) => {
            // If we have specified capabilities for the role, associate them together in roles_capabilities.
            if (role.capabilities.length > 0) {
              return knex("role_capabilities").insert(
                // Use the key-value pairs from above to resolve the array of strings to IDs for the roles_capabilities table.
                role.capabilities.map((capabilityName) => ({
                  role_id: id[0],
                  capability_id: capabilities[capabilityName],
                })) // map (role.capabilities)
              ); // insert (role_capabilities)
            } // if (length)
          }); // then (role id) // push (knex promises)
      }); // map (roles)
      return Promise.all(promises);
    })
    .then(() => knex.raw(`SELECT setval('public.roles_id_seq', ${roles.length}, true);`))
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};
