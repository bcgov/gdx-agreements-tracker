
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, project_number: 'project number 1',project_name:"example name 1"},
        {id: 2, project_number: 'project number 2',project_name:"example name 2"},
      ]);
    });
};
