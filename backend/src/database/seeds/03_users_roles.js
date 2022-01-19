const users = [
  {
    id: 1,
    username: "demo_subscriber",
    email: "subscriber@example.com",
    name: "Demo Subscriber",
    roles: ["subscriber"],
  },
  {
    id: 2,
    username: "demo_admin",
    email: "admin@example.com",
    name: "Demo Admin",
    roles: ["subscriber", "admin"],
  },
  {
    id: 3,
    username: "demo_gdx",
    email: "gdx@example.com",
    name: "Demo GDX",
    roles: ["subscriber", "gdx"],
  },
  {
    id: 4,
    username: "demo_manager",
    email: "manager@example.com",
    name: "Demo Manager",
    roles: ["subscriber", "manager"],
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex
    .raw("SET session_replication_role = 'replica';")
    .then(() => knex("users").del())
    .then(() => knex("user_roles").del())
    .then(() => knex.raw("ALTER SEQUENCE public.user_roles_id_seq RESTART WITH 1;"))
    .then(() => {
      // Get all of the roles from the db, and turn them into key (the role name) value (the id in the database) pairs.
      return knex("roles")
        .select("name", "id")
        .then((rows) => {
          let roles = {};
          rows.forEach((row) => {
            roles[row.name] = row.id;
          });
          return roles;
        });
    })
    .then((roles) => {
      // Iterate through the users above, creating them, then adding the roles to the users in the user_roles table.
      let promises = users.map((user) => {
        return knex("users")
          .insert((({ roles, ...o }) => o)(user), "id") // Remove the `roles` property from the object before attempting insertion.
          .then((id) => {
            // If we have specified roles for the user, associate them together in user_roles.
            if (user.roles.length > 0) {
              // Use the key-value pairs from above to resolve the array of strings to IDs for the user_roles table.
              return knex("user_roles").insert(
                user.roles.map((roleName) => ({
                  user_id: id[0],
                  role_id: roles[roleName],
                })) // map (user.roles)
              ); // insert (user_roles)
            } // if (length)
          }); // then (user id) // return (knex promise)
      }); // map (users)

      return Promise.all(promises);
    })
    .then(() => knex.raw(`SELECT setval('public.users_id_seq', ${users.length}, true);`))
    .then(() => knex.raw("SET session_replication_role = 'origin';"));
};
