
exports.seed = function(knex) {
  const tableName = "roles";
  // Deletes ALL existing entries
  return knex.raw('SET session_replication_role = \'replica\';')
    .then(function () { return knex(tableName).del() })
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          id: 1,
          name: 'admin',
        },
        {
          id: 2,
          name: 'user',
        }
      ]);
    })
    .then(function () { return knex.raw('SET session_replication_role = \'origin\';')});
};
