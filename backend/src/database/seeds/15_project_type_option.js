exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.project_type_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.project_type_option").insert([
        {
          value: "External",
          label: "External",
        },
        {
          value: "Internal",
          label: "Internal",
        },
        {
          value: "Social Media",
          label: "Social Media",
        },
        {
          value: "Service",
          label: "Service",
        },
      ]);
    });
};
