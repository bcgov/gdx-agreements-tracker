exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.contract_type_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.contract_type_option").insert([
        {
          value: "ChangeOrder",
          label: "Change Order",
        },
        {
          value: "General Service Agreement",
          label: "General Service Agreement",
        },
        {
          value: "IT General Service Agreement",
          label: "IT General Service Agreement",
        },
        {
          value: "StandingOffer",
          label: "Standing Offer",
        },
        {
          value: "Agile Service Agreement",
          label: "Agile Service Agreement",
        },
      ]);
    });
};
