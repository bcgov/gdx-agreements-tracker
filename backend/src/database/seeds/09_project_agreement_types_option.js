exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.project_agreement_types_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.project_agreement_types_option").insert([
        { value: "Project Charter", label: "Project Charter" },
        { value: "Other", label: "Other" },
        { value: "Mou", label: "Mou" },
        { value: "Partnership Agreement", label: "Partnership Agreement" },
      ]);
    });
};
