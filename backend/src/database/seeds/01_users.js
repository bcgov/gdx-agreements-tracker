
exports.seed = function(knex) {
  const tableName = "users";
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          username: 'alex',
          email: 'alexander.wintschel@gov.bc.ca',
          name: 'Alex'
        },
        {
          username: 'shawn',
          email: 'shawn.turple@gov.bc.ca',
          name: 'Shawn'
        },
        {
          username: 'craig',
          email: 'craig.robertson@gov.bc.ca',
          name: 'Craig'
        },
        {
          username: 'adam',
          email: 'adam.spiteri@gov.bc.ca',
          name: 'Adam'
        }
      ]);
    });
};
