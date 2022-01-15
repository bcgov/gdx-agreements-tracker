
exports.seed = function(knex) {
  const tableName = "user_roles";
  // Deletes ALL existing entries
  return knex.raw('SET session_replication_role = \'replica\';')
    .then(function () { return knex(tableName).del() })
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          user_id: 1, //alex
          role_id: 1, //admin
        },
        {
          user_id: 1, //alex
          role_id: 2, //user
        },
        {
          user_id: 2, //shawn
          role_id: 1, //admin
        },
        {
          user_id: 2, //shawn
          role_id: 2, //user
        },
        {
          user_id: 3, //craig
          role_id: 1, //admin
        },
        {
          user_id: 3, //craig
          role_id: 2, //user
        },
        {
          user_id: 4, //adam
          role_id: 1, //admin
        },
        {
          user_id: 4, //adam
          role_id: 2, //user
        },
      ]);
    })
    .then(function () { return knex.raw('SET session_replication_role = \'origin\';') });
};
