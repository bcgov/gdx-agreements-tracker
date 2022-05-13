exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("picker_options")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("picker_options").insert([
        {
          id: 1,
          name: "status",
          title: "Status",
          description: "The status of a project.",
          definition: {
            new_request: {
              type: "string",
              title: "New Request",
            },
            active: {
              type: "string",
              title: "Active",
            },
            cancelled: {
              type: "string",
              title: "Cancelled",
            },
            complete: {
              type: "string",
              title: "Complete",
            },
          },
        },
      ]);
    });
};
