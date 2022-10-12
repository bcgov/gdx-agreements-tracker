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
      knex.raw(getCaseStatements(id)),
      "associated_form"
    )
    .unionAll(getTableLookups());
};

const getCaseStatements = (id) => {
  return `CASE
    WHEN definition ->> 'tableLookup' = 'fiscal_year' THEN (SELECT json_agg(t) FROM (SELECT id AS value ,fiscal_year AS label FROM data.fiscal_year WHERE fiscal_year IS NOT NULL) t)
    WHEN definition ->> 'tableLookup' = 'ministry' THEN (SELECT json_agg(d) FROM (SELECT  id AS value, concat(ministry.ministry_name, ' ', ministry.ministry_short_name) AS label FROM data.ministry) d)
    WHEN definition ->> 'tableLookup' = 'portfolio' THEN (SELECT json_agg(g) FROM (SELECT id AS value, concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) AS label FROM data.portfolio) g)
    WHEN definition ->> 'tableLookup' = 'subcontractor' THEN (SELECT json_agg(sub) FROM (SELECT id AS value, subcontractor_name AS label FROM data.subcontractor WHERE subcontractor_name IS NOT NULL) sub)
    WHEN definition ->> 'tableLookup' = 'supplier' THEN (SELECT json_agg(sup) FROM (SELECT id AS value, supplier_name AS label FROM data.supplier WHERE supplier_name IS NOT NULL) sup)
    WHEN definition ->> 'tableLookup' = 'user_roles' THEN (SELECT json_agg(roles) FROM (SELECT id AS value, display_name AS label FROM public.roles WHERE display_name IS NOT NULL) roles)
    WHEN definition ->> 'tableLookup' = 'amendment_type' THEN (SELECT json_agg(contramend) FROM (SELECT id AS value,amendment_type_name AS label FROM data.amendment_type WHERE amendment_type_name IS NOT NULL) contramend)
    WHEN definition ->> 'tableLookup' = 'contact' THEN (SELECT json_agg(c) FROM (SELECT id AS value, concat(contact.last_name, ', ', contact.first_name) AS label FROM data.contact WHERE last_name IS NOT NULL) c)
    WHEN definition ->> 'tableLookup' = 'project' THEN (SELECT json_agg(proj) FROM (SELECT id AS value, project_number AS label FROM data.project WHERE project_number IS NOT NULL) proj)
    WHEN definition ->> 'tableLookup' = 'procurement_method' THEN (SELECT json_agg(procure) FROM (SELECT id AS value, procurement_method AS label FROM data.procurement_method WHERE procurement_method IS NOT NULL) procure)
    WHEN definition ->> 'tableLookup' = 'lesson_category' THEN (SELECT json_agg(lessoncat) FROM (SELECT id AS value, lesson_category_name AS label FROM data.lesson_category WHERE lesson_category_name IS NOT NULL) lessoncat)
    WHEN definition ->> 'tableLookup' = 'resource' THEN (SELECT json_agg(resrc) FROM (SELECT resource_id AS value, concat(resource_last_name, ', ', resource_first_name) AS label FROM data.resource WHERE resource_last_name IS NOT NULL) resrc)
    WHEN definition ->> 'tableLookup' = 'supplier_rate' THEN (SELECT json_agg(suprate) FROM (SELECT sr.id AS value, concat(rt.resource_type, ' ', sr.competency, ' - ', sr.rate)  AS label FROM data.supplier_rate sr JOIN data.resource_type rt ON sr.resource_type_id = rt.id WHERE sr.rate IS NOT NULL) suprate)
    ${getClientCodingTableLookup(id)}
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
};
