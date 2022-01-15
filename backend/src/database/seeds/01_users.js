
exports.seed = function(knex) {
  const tableName = "users";
  // Deletes ALL existing entries
  return knex.raw('SET session_replication_role = \'replica\';')
    .then(function () { return knex(tableName).del() })
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          id: 1,
          username: 'alex',
          email: 'alexander.wintschel@gov.bc.ca',
          name: 'Alex'
        },
        {
          id: 2,
          username: 'shawn',
          email: 'shawn.turple@gov.bc.ca',
          name: 'Shawn'
        },
        {
          id: 3,
          username: 'craig',
          email: 'craig.robertson@gov.bc.ca',
          name: 'Craig'
        },
        {
          id: 4,
          username: 'adam',
          email: 'adam.spiteri@gov.bc.ca',
          name: 'Adam'
        }
      ]);
    })
    .then(function () { return knex.raw('SET session_replication_role = \'origin\';') });
};
