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
        {
          id: 2,
          name: "agreement_type",
          title: "Agreement Type",
          description: "The type of agreement.",
          definition: {
            partnership_agreement: {
              type: "string",
              title: "Partnership Agreement",
            },
            mou: {
              type: "string",
              title: "MOU",
            },
            project_charter: {
              type: "string",
              title: "Project Charter",
            },
            other: {
              type: "string",
              title: "Other",
            },
          },
        },
        {
          id: 3,
          name: "project_type",
          title: "Project Type",
          description: "The type of project.",
          definition: {
            internal: {
              type: "string",
              title: "Internal",
            },
            external: {
              type: "string",
              title: "External",
            },
            social_media: {
              type: "string",
              title: "Social Media",
            },
            service: {
              type: "string",
              title: "Service",
            },
          },
        },
        {
          id: 4,
          name: "funding",
          title: "Funding",
          description: "The type of funding.",
          definition: {
            operational: {
              type: "string",
              title: "Operational",
            },
            capital: {
              type: "string",
              title: "Capital",
            },
            combination: {
              type: "string",
              title: "Combination",
            },
          },
        },
        {
          id: 5,
          name: "recovery_details",
          title: "Recovery Details",
          description: "The recovery details.",
          definition: {
            fully: {
              type: "string",
              title: "Fully",
            },
            partially: {
              type: "string",
              title: "Partially",
            },
            non_recoverable: {
              type: "string",
              title: "Non - Recoverable",
            },
          },
        },
      ]);
    });
};
