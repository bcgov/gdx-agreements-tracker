const formatted_picker_options = ` 
DROP VIEW IF EXISTS public.formatted_picker_options;
CREATE VIEW public.formatted_picker_options AS
SELECT
 p.id,
 p.name,
 p.title, 
 p.description,
    CASE
        WHEN definition ->> 'tableLookup' = 'fiscal_year' THEN (SELECT json_agg(t) FROM (SELECT id AS value ,fiscal_year AS label FROM data.fiscal_year WHERE fiscal_year IS NOT NULL) t)
        WHEN definition ->> 'tableLookup' = 'ministry' THEN (SELECT json_agg(d) FROM (SELECT  id AS value, concat(ministry.ministry_name, ' ', ministry.ministry_short_name) AS label FROM data.ministry) d)
        WHEN definition ->> 'tableLookup' = 'portfolio' THEN (SELECT json_agg(g) FROM (SELECT id AS value, concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) AS label FROM data.portfolio) g)
        WHEN definition ->> 'tableLookup' = 'subcontractor' THEN (SELECT json_agg(sub) FROM (SELECT id AS value, subcontractor_name AS label FROM data.subcontractor WHERE subcontractor_name IS NOT NULL) sub)
        WHEN definition ->> 'tableLookup' = 'supplier' THEN (SELECT json_agg(sup) FROM (SELECT id AS value, supplier_name AS label FROM data.supplier WHERE supplier_name IS NOT NULL) sup)
        WHEN definition ->> 'tableLookup' = 'user_roles' THEN (SELECT json_agg(roles) FROM (SELECT id AS value, display_name AS label FROM public.roles WHERE display_name IS NOT NULL) roles)
        WHEN definition ->> 'tableLookup' = 'contact' THEN (SELECT json_agg(c) FROM (SELECT id AS value, concat(contact.last_name, ', ', contact.first_name) AS label FROM data.contact WHERE last_name IS NOT NULL) c)
        WHEN definition ->> 'dropDownValues' IS NOT NULL THEN p.definition -> 'dropDownValues'
    END definition,
p.associated_form
FROM public.picker_options p;`;

exports.up = function (knex) {
  return knex.raw(formatted_picker_options);
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW formatted_picker_options;`);
};
