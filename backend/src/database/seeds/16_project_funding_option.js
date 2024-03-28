exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.project_funding_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.project_funding_option").insert([
        {
          value: "Operational",
          label: "Operational",
        },
        {
          value: "Capital",
          label: "Capital",
        },
        {
          value: "Combination",
          label: "Combination",
        },
      ]);
    });
};
