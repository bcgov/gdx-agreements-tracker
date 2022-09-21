const {
  yesNoOptions,
  classification,
  agreementType,
  contractStatus,
  contractType,
  projectStatus,
  projectType,
  projectFunding,
  projectRecoverable,
  initiatedBy,
} = require("../pick_options/dropdowns");

exports.seed = function (knex) {
  const tables = {
    projects: "project",
    generic: "generic",
    change_request: "change_request",
    contracts: "contracts",
    subcontractor: "subcontractor",
    supplier: "supplier",
    resource: "resource",
    users: "users",
    amendment_type: "amendment_type",
    contract_amendment: "contract_amendment",
    jv: "jv",
  };

  const pickers = [
    {
      name: "agreement_type",
      title: "Agreement Type",
      description: "The agreement type of the project.",
      definition: { dropDownValues: agreementType },
      associated_form: tables.projects,
    },
    {
      name: "amendment_number",
      title: "Contract Type",
      description: "The Contract Type",
      definition: { tableLookup: "amendment_type" },
      associated_form: tables.contract_amendment,
    },
    {
      name: "status",
      title: "Status",
      description: "The status of a contract.",
      definition: { dropDownValues: contractStatus },
      associated_form: tables.contracts,
    },
    {
      name: "contract_type",
      title: "Contract Type",
      description: "The type of contract.",
      definition: { dropDownValues: contractType },
      associated_form: tables.contracts,
    },
    {
      name: "project_id",
      title: "Project Number",
      description: "The project the contract belongs to.",
      definition: { tableLookup: "project" },
      associated_form: tables.contracts,
    },
    {
      name: "procurement_method",
      title: "Procurement Method",
      description: "The procurement method used for the contract.",
      definition: { tableLookup: "procurement_method" },
      associated_form: tables.contracts,
    },
    {
      name: "classification",
      title: "Classification",
      description: "The classification type of the project.",
      definition: { dropDownValues: classification },
      associated_form: tables.projects,
    },
    {
      name: "completed_by_contact_id",
      title: "Contact",
      description: "The Contact",
      definition: { tableLookup: "contact" },
      associated_form: tables.projects,
    },
    {
      name: "contract_ev_completed",
      title: "Contract Evaluation Completed",
      description: "Contract evaluation completed if applicable.",
      definition: { dropDownValues: yesNoOptions },
      associated_form: tables.projects,
    },
    {
      name: "contractor_security_terminated",
      title: "Contractor Security Terminated",
      description: "Contractor IDIR terminated / building passes returned.",
      definition: { dropDownValues: yesNoOptions },
      associated_form: tables.projects,
    },

    {
      name: "fiscal",
      title: "Fiscal",
      description: "Fiscal Years",
      definition: { tableLookup: "fiscal_year" },
      associated_form: tables.generic,
    },
    {
      name: "fiscal_year",
      title: "Fiscal",
      description: "Fiscal Years",
      definition: { tableLookup: "fiscal_year" },
      associated_form: tables.generic,
    },
    {
      name: "fiscal_year_id",
      title: "Fiscal",
      description: "Fiscal Years",
      definition: { tableLookup: "fiscal_year" },
      associated_form: tables.jv,
    },
    {
      name: "funding",
      title: "Funding",
      description: "The funding of a project.",
      definition: { dropDownValues: projectFunding },
      associated_form: tables.projects,
    },
    {
      name: "hand_off_to_operations",
      title: "Hand Off to Operations",
      description: "Post implementation hand-off to operation completed.",
      definition: { dropDownValues: yesNoOptions },
      associated_form: tables.projects,
    },
    {
      name: "initiated_by",
      title: "Initiated By",
      description: "Who the change request was initiated by",
      definition: { dropDownValues: initiatedBy },
      associated_form: tables.change_request,
    },
    {
      name: "ministry_id",
      title: "Client Ministry Name",
      description: "Client Ministry field",
      definition: { tableLookup: "ministry" },
      associated_form: tables.projects,
    },
    {
      name: "portfolio_id",
      title: "Portfolio Name",
      description: "Portfolio of the project.",
      definition: { tableLookup: "portfolio" },
      associated_form: tables.projects,
    },
    {
      name: "project_status",
      title: "Status",
      description: "The status of a project.",
      definition: { dropDownValues: projectStatus },
      associated_form: tables.projects,
    },
    {
      name: "project_type",
      title: "Project Type",
      description: "The Project Type of a project.",
      definition: { dropDownValues: projectType },
      associated_form: tables.projects,
    },

    {
      name: "role_id",
      title: "Role",
      description: "The Role",
      definition: { tableLookup: "user_roles" },
      associated_form: tables.users,
    },
    {
      name: "recoverable",
      title: "Recovery Details",
      description: "The recoverable of a project.",
      definition: { dropDownValues: projectRecoverable },
      associated_form: tables.projects,
    },

    {
      name: "records_filed",
      title: "Records Filed",
      description: "Project documentation filled in accordance with records management.",
      definition: { dropDownValues: yesNoOptions },
      associated_form: tables.projects,
    },

    {
      name: "subcontractor_id",
      title: "Subcontractor",
      description: "Subcontractors",
      definition: { tableLookup: "subcontractor" },
      associated_form: tables.resource,
    },
    {
      name: "supplier_id",
      title: "Supplier",
      description: "Supplier",
      definition: { tableLookup: "supplier" },
      associated_form: tables.resource,
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
