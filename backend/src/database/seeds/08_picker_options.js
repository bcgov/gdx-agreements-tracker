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
  billingPeriod,
  deliverable_status,
  quarter,
  resourceType,
} = require("../pick_options/dropdowns");

exports.seed = function (knex) {
  const tables = {
    project_lesson: "project_lesson",
    projects: "project",
    generic: "generic",
    change_request: "change_request",
    contracts: "contracts",
    client_coding: "client_coding",
    subcontractor: "subcontractor",
    supplier: "supplier",
    resource: "resource",
    amendment_type: "amendment_type",
    contract_amendment: "contract_amendment",
    journal_voucher: "jv",
    project_budget: "project_budget",
    project_deliverables: "project_deliverables",
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
      name: "billing_period",
      title: "Billing Period",
      description: "The billing period (month)",
      definition: { dropDownValues: billingPeriod },
      associated_form: tables.generic,
    },
    {
      name: "classification",
      title: "Classification",
      description: "The classification type of the project.",
      definition: { dropDownValues: classification },
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
      name: "contract_type",
      title: "Contract Type",
      description: "The type of contract.",
      definition: { dropDownValues: contractType },
      associated_form: tables.contracts,
    },
    {
      name: "contractor_security_terminated",
      title: "Contractor Security Terminated",
      description: "Contractor IDIR terminated / building passes returned.",
      definition: { dropDownValues: yesNoOptions },
      associated_form: tables.projects,
    },
    {
      name: "deliverable_status",
      title: "Deliverable Status",
      description: "The Deliverable Status",
      definition: { dropDownValues: deliverable_status },
      associated_form: tables.generic,
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
      associated_form: tables.generic,
    },

    {
      name: "quarter",
      title: "Quarter",
      description: "The fiscal quarter",
      definition: { dropDownValues: quarter },
      associated_form: tables.generic,
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
      name: "resource_type",
      title: "Resource Type",
      description: "Resource Type",
      definition: { dropDownValues: resourceType },
      associated_form: tables.project_budget,
    },
    {
      name: "status",
      title: "Status",
      description: "The status of a contract.",
      definition: { dropDownValues: contractStatus },
      associated_form: tables.contracts,
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
