const formatted_picker_options = ` 
DROP VIEW IF EXISTS public.formatted_picker_options;
CREATE VIEW public.formatted_picker_options AS
SELECT
 p.id,
 p.name,
 p.title, 
 p.description,
    CASE
        WHEN definition ->> 'tableLookup' = 'fiscal_year' THEN (SELECT json_agg(t) FROM (SELECT id AS value ,fiscal_year AS label FROM data.fiscal_year) t)
        WHEN definition ->> 'tableLookup' = 'ministry' THEN (SELECT json_agg(d) FROM (SELECT  id AS value, concat(ministry.ministry_name, ' ', ministry.ministry_short_name) AS label FROM data.ministry) d)
        WHEN definition ->> 'tableLookup' = 'portfolio' THEN (SELECT json_agg(g) FROM (SELECT id AS value, concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) AS label FROM data.portfolio) g)
        WHEN definition ->> 'tableLookup' = 'subcontractor' THEN (SELECT json_agg(sub) FROM (SELECT id AS value, subcontractor_name AS label FROM data.subcontractor) sub)
        WHEN definition ->> 'tableLookup' = 'supplier' THEN (SELECT json_agg(sup) FROM (SELECT id AS value, supplier_name AS label FROM data.supplier) sup)
        WHEN definition ->> 'dropDownValues' IS NOT NULL THEN p.definition -> 'dropDownValues'
    END definition,
p.associated_form
FROM public.picker_options p;`

exports.up = function (knex) {
  return knex.raw(formatted_picker_options);
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW formatted_picker_options;`);
};