const dbConnection = require("../database/databaseConnection");
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
      id: "roles",
      name: "user_roles_option",
      title: "Roles",
      description: "",
      table: "public.roles",
      value: "id",
      label: `display_name`,
      queryAdditions: `WHERE display_name IS NOT NULL`,
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
      title: "",
      description: "",
      table: "data.resource",
      value: "resource_id",
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
      queryAdditions: `WHERE project_deliverable.deliverable_name IS NOT NULL`,
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
      LEFT JOIN data.jv  on data.jv.client_coding_id = data.client_coding.id
      WHERE jv.project_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY client_coding.program_area
      `;
  }
  return query;
};

/**
 * Gets all the table lookups, using the new pickerOptionSelect, and unions with the dropdown options.
 *
 * @param   {int}   projectId  The project id for picker options that have specific project related lists.
 * @param   {int}   contractId The contract id for picker options that have specific contract related lists.
 * @returns {Array}
 */
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
