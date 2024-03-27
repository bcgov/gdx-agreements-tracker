exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.contract_status_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.contract_status_option").insert([
        {
          value: "Active",
          label: "Active",
        },
        {
          value: "Draft",
          label: "Draft",
        },
        {
          value: "Sent",
          label: "Sent",
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
