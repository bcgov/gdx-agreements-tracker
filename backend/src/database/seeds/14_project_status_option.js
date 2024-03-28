exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.project_status_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.project_status_option").insert([
        {
          value: "NewRequest",
          label: "NewRequest",
        },
        {
          value: "Active",
          label: "Active",
        },
        {
          value: "Cancelled",
          label: "Cancelled",
        },
        {
          value: "Complete",
          label: "Complete",
        },
      ]);
    });
};
