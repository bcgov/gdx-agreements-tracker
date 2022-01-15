
exports.seed = function(knex) {
  const tableName = "role_capabilities";
  // Deletes ALL existing entries
  return knex.raw('SET session_replication_role = \'replica\';')
    .then(function () { return knex(tableName).del() })
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          role_id: 1, // admin
          capability_id: 1, // users_create_all
        },
        {
          role_id: 1, // admin
          capability_id: 2, // users_xxx_all
        },
        {
          role_id: 1, // admin
          capability_id: 3, // users_xxx_all
        },
        {
          role_id: 1, // admin
          capability_id: 4, // users_xxx_all
        },
        {
          role_id: 2, // user
          capability_id: 5, // users_create_mine
        },
        {
          role_id: 2, // user
          capability_id: 6, // users_xxx_mine
        },
        {
          role_id: 2, // user
          capability_id: 7, // users_xxx_mine
        },
        {
          role_id: 2, // user
          capability_id: 8, // users_xxx_mine
        },
      ]);
    })
    .then(function () { return knex.raw('SET session_replication_role = \'origin\';') });
};
