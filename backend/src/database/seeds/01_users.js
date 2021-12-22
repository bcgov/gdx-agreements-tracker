
exports.seed = function(knex) {
  const tableName = "users";
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          username: 'alex',
          email: 'Alexander.Wintschel@gov.bc.ca',
          name: 'Alex'
        },
        {
          username: 'shawn',
          email: 'Shawn.Turple@gov.bc.ca',
          name: 'Shawn'
        },
        {
          username: 'craig',
          email: 'Craig.Robertson@gov.bc.ca',
          name: 'Craig'
        },
        {
          username: 'adam',
          email: 'Adam.Spiteri@gov.bc.ca',
          name: 'Adam'
        }
      ]);
    });
};
