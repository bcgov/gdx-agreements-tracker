const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const pickerOptions = `${dataBaseSchemas().public}.picker_options`;

/**
 * Gets all the picker options.
 *
 * @returns {Array}
 */
const findAll = () => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups(false, false));
};

/**
 * Controller to get picker options with specific project related options.
 *
 * @param   {int}   id The project id.
 * @returns {Array}
 */
const findAllByProject = (id) => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups(id, false));
};

/**
 * Controller to get picker options with specific contract related options.
 *
 * @param   {int}   id The contract id.
 * @returns {Array}
 */
const findAllByContract = (id) => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups(false, id));
};

/**
 * Helper function to get case statement for initial query for drop down values.
 *
 * @returns {string}
 */
const getCaseStatements = () => {
  return `
    CASE 
      WHEN definition ->> 'dropDownValues' IS NOT NULL THEN definition -> 'dropDownValues' 
    END definition`;
};

/**
 * This is the table lookup values, which gets an array of json values for lookups of an existing table.
 *
 * @param   {int|boolean} projectId  The project id if applicable.
 * @param   {int|boolean} contractId The contract id if applicable.
 * @returns {Array}
 */
const tableLookupValues = (projectId, contractId) => {
  return [
    {
      id: "ministry",
      name: "ministry_option",
      title: "Client Ministry Name",
      description: "",
      table: "data.ministry",
      value: "id",
      label: `concat(ministry.ministry_name, ' ', ministry.ministry_short_name)`,
      queryAdditions: ``,
    },
    {
      id: "fy",
      name: "fiscal_year_option",
      title: "Fiscal Year",
      description: "",
      table: "data.fiscal_year",
      value: "id",
      label: `fiscal_year`,
      queryAdditions: `WHERE fiscal_year IS NOT NULL`,
    },
    {
      id: "port",
      name: "portfolio_option",
      title: "Portfolio",
      description: "",
      table: "data.portfolio",
      value: "id",
      label: `concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) `,
      queryAdditions: ``,
    },
    {
      id: "sub",
      name: "subcontractor_option",
      title: "Subcontractor",
      description: "",
      table: "data.subcontractor",
      value: "id",
      label: `subcontractor_name`,
      queryAdditions: `WHERE subcontractor_name IS NOT NULL`,
    },
    {
      id: "sup",
      name: "supplier_option",
      title: "Supplier",
      description: "",
      table: "data.supplier",
      value: "id",
      label: `supplier_name`,
      queryAdditions: `WHERE supplier_name IS NOT NULL`,
    },
    {
      id: "contramend",
      name: "amendment_type_option",
      title: "Ammendment Type",
      description: "",
      table: "data.amendment_type",
      value: "id",
      label: `amendment_type_name`,
      queryAdditions: `WHERE amendment_type_name IS NOT NULL`,
    },
    {
      id: "con",
      name: "contact_option",
      title: "Contact",
      description: "",
      table: "data.contact",
      value: "id",
      label: `concat(contact.last_name, ', ', contact.first_name)`,
      queryAdditions: `WHERE last_name IS NOT NULL`,
    },
    {
      id: "proj",
      name: "project_option",
      title: "Projects",
      description: "",
      table: "data.project",
      value: "id",
      label: `project_number`,
      queryAdditions: `WHERE project_number IS NOT NULL`,
    },
    {
      id: "procurement",
      name: "procurement_method_option",
      title: "Procurement",
      description: "",
      table: "data.procurement_method",
      value: "id",
      label: `procurement_method`,
      queryAdditions: `WHERE procurement_method IS NOT NULL`,
    },
    {
      id: "lessonscategory",
      name: "lesson_category_option",
      title: "Lessons Category",
      description: "",
      table: "data.lesson_category",
      value: "id",
      label: `lesson_category_name`,
      queryAdditions: `WHERE lesson_category_name IS NOT NULL`,
    },
    {
      id: "resourceoption",
      name: "resource_option",
      title: "Resource",
      description: "",
      table: "data.resource",
      value: "id",
      label: `concat(resource_last_name, ', ', resource_first_name)`,
      queryAdditions: `WHERE resource_last_name IS NOT NULL`,
    },
    {
      id: "supplyrate",
      name: "supplier_rate_option",
      title: "Supplier Rate",
      description: "",
      table: "data.supplier_rate",
      value: "supplier_rate.id",
      label: `concat(resource_type.resource_type, ' ', supplier_rate.competency, ' - ', supplier_rate.rate)`,
      queryAdditions: `JOIN data.resource_type  ON supplier_rate.resource_type_id = resource_type.id WHERE supplier_rate.rate IS NOT NULL`,
    },
    {
      id: "clientcoding",
      name: "client_coding_option",
      title: "Client Coding",
      description: "",
      table: "data.client_coding",
      value: "client_coding.id",
      label: `COALESCE(client_coding.program_area, client_coding.client)`,
      queryAdditions: getClientCodingQueryAdditions(projectId),
    },
    {
      id: "projdel",
      name: "project_deliverable_option",
      title: "Project Deliverable",
      description: "",
      table: "data.project_deliverable",
      value: "project_deliverable.id",
      label: `project_deliverable.deliverable_name`,
      queryAdditions: getProjectDeliverablesQueryAdditions(projectId),
    },
    {
      id: "contractresource",
      name: "contract_resource",
      title: "Contract Resource",
      description: "",
      table: "data.contract_resource",
      value: "contract_resource.id",
      label: `(r.resource_last_name || ', ' || r.resource_first_name)`,
      queryAdditions: getContractResourceQueryAdditions(contractId),
    },
    {
      id: "contractdeliverable",
      name: "contract_deliverable",
      title: "Contract Deliverable",
      description: "",
      table: "data.contract_deliverable",
      value: "contract_deliverable.id",
      label: `contract_deliverable.deliverable_name`,
      queryAdditions: getContractDeliverableQueryAdditions(contractId),
    },
    {
      id: "contract",
      name: "contract_option",
      title: "Contract",
      description: "the contract",
      table: "data.contract",
      value: "contract.id",
      label: `co_number`,
      queryAdditions: ``,
    },
    {
      id: "projectBudgetContract",
      name: "budget_contract_option", //To be use din the fron end fields file
      title: "Contract", //Title for the frontend if you don't provide a title in the fields file
      description: "the contract related to the project budget",
      table: "data.contract", // The table you want to lookup to
      value: "contract.id", //The value for the picker ex: {label:"example", value:contract.id}
      label: `co_number`, //The label for the picker ex: {label:"example", value:contract.id}
      queryAdditions: getProjectBudgetContractQueryAdditions(projectId), //Any extra queries you want to add to the lookup example filters.
    },
    {
      id: "health",
      name: "health_status_option",
      title: "Health Status",
      description: "the Health Status",
      table: "data.health_indicator",
      value: "id",
      label: "health_name",
      queryAdditions: ``,
    },
    {
      id: "projectphase",
      name: "project_phase_option",
      title: "Project Phase",
      description: "the project phase",
      table: "data.project_phase",
      value: "id",
      label: "phase_name",
      queryAdditions: `ORDER BY sort_order ASC`,
    },
    {
      id: "recoveryType",
      name: "recovery_type_option",
      title: "Recovery",
      description: "the project budget recovery",
      table: "data.recovery_type",
      value: "id",
      label: "recovery_type_name",
      queryAdditions: ``,
    },
    {
      id: "resourceType",
      name: "resource_type_option",
      title: "Resource",
      description: "the project resources",
      table: "data.resource_type",
      value: "id",
      label: "resource_type", //The column you want to pull lookup data from
      queryAdditions: ``, //You can leave this blank
    },
    {
      id: "recoveryArea",
      name: "recovery_area_option",
      title: "Recovery",
      description: "the project budget recovery",
      table: "data.portfolio",
      value: "id",
      label: "portfolio_name",
      queryAdditions: ``,
    },
  ];
};

/**
 * Gets client coding query additions.
 *
 * @param   {int}    id The project id.
 * @returns {string}
 */
const getClientCodingQueryAdditions = (id) => {
  let query = `ORDER BY client_coding.program_area`;
  if (Number(id) > 0) {
    query = `
      WHERE project_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY client_coding.program_area
      `;
  }
  return query;
};

/**
 * Gets contract resource query additions.
 *
 * @param   {int}    id The contract id.
 * @returns {string}
 */
const getContractResourceQueryAdditions = (id) => {
  let query = `
    LEFT JOIN data.resource AS r on contract_resource.resource_id = r.id
    ORDER BY label ASC
    `;
  if (Number(id) > 0) {
    query = `
      LEFT JOIN data.resource AS r on contract_resource.resource_id = r.id
      WHERE contract_resource.contract_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

/**
 * Gets contract deliverable query additions.
 *
 * @param   {int}    id The contract id.
 * @returns {string}
 */
const getContractDeliverableQueryAdditions = (id) => {
  let query = `ORDER BY label ASC`;
  if (Number(id) > 0) {
    query = `
      WHERE contract_deliverable.contract_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

/**
 * Gets contract deliverable query additions.
 *
 * @param   {int}    projectId The project id.
 * @returns {string}
 */
const getProjectDeliverablesQueryAdditions = (projectId) => {
  let query = `WHERE project_deliverable.deliverable_name IS NOT NULL`;
  if (Number(projectId) > 0) {
    query = `
      WHERE project_deliverable.project_id = ${Number(projectId)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

/**
 * Gets contract deliverable query additions.
 *
 * @param   {int}    projectId The project id.
 * @returns {string}
 */
const getProjectBudgetContractQueryAdditions = (projectId) => {
  let query = `WHERE contract.project_id IS NOT NULL`;
  if (Number(projectId) > 0) {
    query = `
      WHERE contract.project_id = ${Number(projectId)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

const getTableLookups = (projectId, contractId) => {
  const unionQueries = [];
  tableLookupValues(projectId, contractId).forEach((lookup) => {
    unionQueries.push(knex.pickerOptionSelect(lookup));
  });
  return unionQueries;
};

module.exports = {
  findAll,
  findAllByProject,
  findAllByContract,
};