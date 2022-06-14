exports.seed = function (knex) {
  const tables = {
    projects: "project",
  };

  const pickers = [
    {
      name: "project_status",
      title: "Status",
      description: "The status of a project.",
      definition: {
        dropDownValues: [
          {
            label: "New Request",
            value: "NewRequest",
          },
          {
            label: "Active",
            value: "Active",
          },
          {
            label: "Cancelled",
            value: "Cancelled",
          },
          {
            label: "Complete",
            value: "Complete",
          },
        ],
      },
      associated_table: tables.projects,
    },
    {
      name: "ministry_id",
      title: "Client Ministry Name",
      description: "Client Ministry field",
      definition: {
        tableLookup: "ministry",
      },
      associated_table: tables.projects,
    },
    {
      name: "portfolio_id",
      title: "Portfolio Name",
      description: "Portfolio of the project.",
      definition: {
        tableLookup: "ministry",
      },
      associated_table: tables.projects,
    },
    {
      name: "fiscal",
      title: "Fiscal",
      description: "Fiscal Years",
      definition: {
        tableLookup: "fiscal_year",
      },
      associated_table: tables.projects,
    },
    {
      name: "project_type",
      title: "Project Type",
      description: "The Project Type of a project.",
      definition: {
        dropDownValues: [
          {
            label: "External",
            value: "External",
          },
          {
            label: "Internal",
            value: "Internal",
          },
        ],
      },
      associated_table: tables.projects,
    },
    {
      name: "funding",
      title: "Funding",
      description: "The funding of a project.",
      definition: {
        dropDownValues: [
          {
            label: "Operational",
            value: "Operational",
          },
          {
            label: "Capital",
            value: "Capital",
          },
          {
            label: "Combination",
            value: "Combination",
          },
        ],
      },
      associated_table: tables.projects,
    },
    {
      name: "recoverable",
      title: "Recovery Details",
      description: "The recoverable of a project.",
      definition: {
        dropDownValues: [
          {
            label: "Fully",
            value: "Fully",
          },
          {
            label: "Partially",
            value: "Partially",
          },
          {
            label: "Non-Recoverable",
            value: "Non-Recoverable",
          },
        ],
      },
      associated_table: tables.projects,
    },
  ];

  const pickersWithId = () => {
    return pickers.map((picker, index) => {
      picker.id = index;
      return picker;
    });
  };

  // Deletes ALL existing entries
  return knex("picker_options")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("picker_options").insert(pickersWithId());
    });
};
