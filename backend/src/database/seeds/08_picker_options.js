exports.seed = function (knex) {
  const tables = {
    projects: "project",
    generic: "generic",
    change_request: "change_request",
  };

  const pickers = [
    {
      name: "classification",
      title: "Classification",
      description: "The classification type of the project.",
      definition: {
        dropDownValues: [
          {
            value: "Strategic",
            label: "Strategic",
          },
          {
            value: "Innovation",
            label: "Innovation",
          },
          {
            value: "Tactical",
            label: "Tactical",
          },
          {
            value: "Maintenance/Sustainment",
            label: "Maintenance/Sustainment",
          },
          {
            value: "Operational",
            label: "Operational",
          },
          {
            value: "Infrastructure",
            label: "Infrastructure",
          },
          {
            value: "Support for Strategic or Business Planning",
            label: "Support for Strategic or Business Planning",
          },
          {
            value: "Transformation",
            label: "Transformation",
          },
        ],
      },
      associated_form: tables.projects,
    },
    {
      name: "agreement_type",
      title: "Agreement Type",
      description: "The agreement type of the project.",
      definition: {
        dropDownValues: [
          {
            value: "Project Charter",
            label: "Project Charter",
          },
          {
            value: "Other",
            label: "Other",
          },
          {
            value: "Partnership Agreement",
            label: "Partnership Agreement",
          },
          {
            value: "MOU",
            label: "MOU",
          },
        ],
      },
      associated_form: tables.projects,
    },
    {
      name: "project_status",
      title: "Status",
      description: "The status of a project.",
      definition: {
        dropDownValues: [
          {
            value: "NewRequest",
            label: "New Request",
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
        ],
      },
      associated_form: tables.projects,
    },
    {
      name: "ministry_id",
      title: "Client Ministry Name",
      description: "Client Ministry field",
      definition: {
        tableLookup: "ministry",
      },
      associated_form: tables.projects,
    },
    {
      name: "portfolio_id",
      title: "Portfolio Name",
      description: "Portfolio of the project.",
      definition: {
        tableLookup: "portfolio",
      },
      associated_form: tables.projects,
    },
    {
      name: "fiscal_year",
      title: "Fiscal",
      description: "Fiscal Years",
      definition: {
        tableLookup: "fiscal_year",
      },
      associated_form: tables.generic,
    },
    {
      name: "project_type",
      title: "Project Type",
      description: "The Project Type of a project.",
      definition: {
        dropDownValues: [
          {
            value: "External",
            label: "External",
          },
          {
            value: "Internal",
            label: "Internal",
          },
        ],
      },
      associated_form: tables.projects,
    },
    {
      name: "funding",
      title: "Funding",
      description: "The funding of a project.",
      definition: {
        dropDownValues: [
          {
            value: "Operational",
            label: "Operational",
          },
          {
            value: "Capital",
            label: "Capital",
          },
          {
            value: "Combination",
            label: "Combination",
          },
        ],
      },
      associated_form: tables.projects,
    },
    {
      name: "recoverable",
      title: "Recovery Details",
      description: "The recoverable of a project.",
      definition: {
        dropDownValues: [
          {
            value: "Fully",
            label: "Fully",
          },
          {
            value: "Partially",
            label: "Partially",
          },
          {
            value: "Non-Recoverable",
            label: "Non-Recoverable",
          },
        ],
      },
      associated_form: tables.projects,
    },
    {
      name: "initiated_by",
      title: "Initiated By",
      description: "Who the change request was initiated by",
      definition: {
        dropDownValues: [
          {
            value: "GDX",
            label: "GDX",
          },
          {
            value: "Client",
            label: "Client",
          },
        ],
      },
      associated_form: tables.change_request,
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
