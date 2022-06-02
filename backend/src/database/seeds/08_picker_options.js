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
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
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
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
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
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
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
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
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
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
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
        {
          id: 6,
          name: "project_status",
          title: "Project Status",
          description: "The status of the project.",
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
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
          id: 7,
          name: "portfolio_name",
          title: "Portfolio Name",
          description: "Portfolio",
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
          definition: {
            analytics: { type: "string", title: "Analytics", abr: "ANA" },
            business_communication_solutions: {
              type: "string",
              title: "Business & Communication Soltuions",
              abr: "BCS",
            },
            delivery_management_services: {
              type: "string",
              title: "Delivery Management Services",
              abr: "DMS",
            },
            enterprise_data_services: {
              type: "string",
              title: "Enterprise Data Services",
              abr: "EDS",
            },
            divsional_operations: { type: "string", title: "Divsional Operations", abr: "DO" },
          },
        },
        {
          id: 8,
          name: "fiscal",
          title: "Fiscal",
          description: "Fiscal year.",
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
          definition: {
            [1516]: {
              type: "string",
              title: "15-16",
            },
            [1617]: {
              type: "string",
              title: "16-17",
            },
            [1819]: {
              type: "string",
              title: "18-19",
            },
            [2021]: {
              type: "string",
              title: "20-21",
            },
            [2122]: {
              type: "string",
              title: "21-22",
            },
            [2324]: {
              type: "string",
              title: "23-24",
            },
            [2526]: {
              type: "string",
              title: "25-26",
            },
          },
        },
        {
          id: 9,
          name: "client_ministry_name",
          title: "Client Ministry Name",
          description: "Client Ministry Name",
          form_name: "Project",
          form_section: "Project Registration",
          form_tab: "Project Details",
          definition: {
            api_url: "/ministry_list",
          },
        },
      ]);
    });
};
