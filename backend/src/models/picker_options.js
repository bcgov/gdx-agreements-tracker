const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const pickerOptions = `${dataBaseSchemas().public}.picker_options`;

// Get all.
const findAll = () => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups());
};

// Get all by project id.
const findAllByProject = (id) => {
  return knex(pickerOptions)
    .select(
      "id",
      "name",
      "title",
      "description",
      knex.raw(getCaseStatements(id, null)),
      "associated_form"
    )
    .unionAll(getTableLookups());
};

// Get all by contract id.
const findAllByContract = (id) => {
  return knex(pickerOptions)
    .select(
      "id",
      "name",
      "title",
      "description",
      knex.raw(getCaseStatements(null, id)),
      "associated_form"
    )
    .unionAll(getTableLookups());
};

const getCaseStatements = (projectId, contractId) => {
  return `CASE
    ${getClientCodingTableLookup(projectId)}
    ${getContractResourcesTableLookup(contractId)}
    ${getContractDeliverablesTableLookup(contractId)}
    WHEN definition ->> 'dropDownValues' IS NOT NULL THEN definition -> 'dropDownValues'
  END definition`;
};

const getClientCodingTableLookup = (id) => {
  let query = `SELECT 
    client_coding.id AS value, 
    COALESCE(client_coding.program_area, client_coding.client, '') AS label 
    FROM data.client_coding
    ORDER BY client_coding.program_area
    `;
  if (Number(id) > 0) {
    query = `SELECT 
      client_coding.id AS value,
      COALESCE(client_coding.program_area, client_coding.client) AS label
      FROM data.client_coding
      LEFT JOIN data.jv  on data.jv.client_coding_id = data.client_coding.id
      WHERE jv.project_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY client_coding.program_area
      `;
  }
  // json_agg() returns null for empty set which breaks frontend select inputs. COALESCE to an empty array.
  return `WHEN definition ->> 'tableLookup' = 'client_coding' THEN (SELECT COALESCE(json_agg(cc), '[]') FROM (${query}) cc)`;
};

const getContractResourcesTableLookup = (id) => {
  let query = `SELECT 
    cr.id AS value,
    (r.resource_last_name || ', ' || r.resource_first_name) AS label
    FROM data.contract_resource AS cr
    LEFT JOIN data.resource AS r on cr.resource_id = r.resource_id
    ORDER BY label ASC
    `;
  if (Number(id) > 0) {
    query = `SELECT 
      cr.id AS value,
      (r.resource_last_name || ', ' || r.resource_first_name) AS label
      FROM data.contract_resource AS cr
      LEFT JOIN data.resource AS r on cr.resource_id = r.resource_id
      WHERE cr.contract_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  // json_agg() returns null for empty set which breaks frontend select inputs. COALESCE to an empty array.
  return `WHEN definition ->> 'tableLookup' = 'contract_resource' THEN (SELECT COALESCE(json_agg(conres), '[]') FROM (${query}) conres)`;
};

const getContractDeliverablesTableLookup = (id) => {
  let query = `SELECT 
    cd.id AS value,
    cd.deliverable_name AS label
    FROM data.contract_deliverable AS cd
    ORDER BY label ASC
    `;
  if (Number(id) > 0) {
    query = `SELECT 
      cd.id AS value,
      cd.deliverable_name AS label
      FROM data.contract_deliverable AS cd
      WHERE cd.contract_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  // json_agg() returns null for empty set which breaks frontend select inputs. COALESCE to an empty array.
  return `WHEN definition ->> 'tableLookup' = 'contract_deliverable' THEN (SELECT COALESCE(json_agg(condel), '[]') FROM (${query}) condel)`;
};

const getTablePickerQuery = (option) => {
  return knex().select(
    knex.raw(`'${option.name}' as name`),
    knex.raw(`'${option.title}' as title`),
    knex.raw(`'${option.description}' as description`),
    knex.raw(`
    (
      SELECT json_agg(${option.id}) 
      FROM (
        SELECT  ${option.value} AS value, 
        ${option.label} AS label 
        FROM ${option.table}
        ${option?.queryAdditions}
      ) 
      ${option.id}
    ) as definition`),
    knex.raw("'_options' as associated_form")
  );
};

const tableLookupValues = [
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
];

const getTableLookups = () => {
  const unionQueries = [];
  tableLookupValues.forEach((lookup) => {
    unionQueries.push(getTablePickerQuery(lookup));
  });
  return unionQueries;
};

module.exports = {
  findAll,
  findAllByProject,
  findAllByContract,
};
