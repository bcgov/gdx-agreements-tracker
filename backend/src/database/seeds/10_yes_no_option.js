exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.yes_no_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.yes_no_option").insert([
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "N/A", label: "N/A" },
      ]);
    });
};
