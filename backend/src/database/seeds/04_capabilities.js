
exports.seed = function(knex) {
  const tableName = "capabilities";
  // Deletes ALL existing entries
  return knex.raw('SET session_replication_role = \'replica\';')
    .then(function () { return knex(tableName).del() })
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          id: 1,
          name: 'users_create_all',
        },
        {
          id: 2,
          name: 'users_update_all',
        },
        {
          id: 3,
          name: 'users_delete_all',
        },
        {
          id: 4,
          name: 'users_read_all',
        },
        {
          id: 5,
          name: 'users_create_mine',
        },
        {
          id: 6,
          name: 'users_update_mine',
        },
        {
          id: 7,
          name: 'users_delete_mine',
        },
        {
          id: 8,
          name: 'users_read_mine',
        },
      ]);
    })
    .then(function() { return knex.raw('SET session_replication_role = \'origin\';') });
};
