const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const pickerOptions = `${dataBaseSchemas().public}.picker_options`;

// Get all.
const findAll = () => {
  return knex(pickerOptions).select(
    "id",
    "name",
    "title",
    "description",
    knex.raw(
      `CASE
           WHEN definition ->> 'tableLookup' = 'fiscal_year' THEN (SELECT json_agg(t) FROM (SELECT id AS value ,fiscal_year AS label FROM data.fiscal_year WHERE fiscal_year IS NOT NULL) t)
           WHEN definition ->> 'tableLookup' = 'ministry' THEN (SELECT json_agg(d) FROM (SELECT  id AS value, concat(ministry.ministry_name, ' ', ministry.ministry_short_name) AS label FROM data.ministry) d)
           WHEN definition ->> 'tableLookup' = 'portfolio' THEN (SELECT json_agg(g) FROM (SELECT id AS value, concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) AS label FROM data.portfolio) g)
           WHEN definition ->> 'tableLookup' = 'subcontractor' THEN (SELECT json_agg(sub) FROM (SELECT id AS value, subcontractor_name AS label FROM data.subcontractor WHERE subcontractor_name IS NOT NULL) sub)
           WHEN definition ->> 'tableLookup' = 'supplier' THEN (SELECT json_agg(sup) FROM (SELECT id AS value, supplier_name AS label FROM data.supplier WHERE supplier_name IS NOT NULL) sup)
           WHEN definition ->> 'tableLookup' = 'user_roles' THEN (SELECT json_agg(roles) FROM (SELECT id AS value, display_name AS label FROM public.roles WHERE display_name IS NOT NULL) roles)
           WHEN definition ->> 'tableLookup' = 'amendment_type' THEN (SELECT json_agg(contramend) FROM (SELECT id AS value,amendment_type_name AS label FROM data.amendment_type WHERE amendment_type_name IS NOT NULL) contramend)
           WHEN definition ->> 'tableLookup' = 'project' THEN (SELECT json_agg(proj) FROM (SELECT id AS value, project_number AS label FROM data.project WHERE project_number IS NOT NULL) proj)
           WHEN definition ->> 'tableLookup' = 'procurement_method' THEN (SELECT json_agg(procure) FROM (SELECT id AS value, procurement_method AS label FROM data.procurement_method WHERE procurement_method IS NOT NULL) procure)
           WHEN definition ->> 'tableLookup' = 'lesson_category' THEN (SELECT json_agg(lessoncat) FROM (SELECT id AS value, lesson_category_name AS label FROM data.lesson_category WHERE lesson_category_name IS NOT NULL) lessoncat)
           WHEN definition ->> 'dropDownValues' IS NOT NULL THEN definition -> 'dropDownValues'
       END definition`
    ),
    "associated_form"
  );
};

module.exports = {
  findAll,
};
