const formatted_picker_options  = ` 
CREATE VIEW data.formatted_picker_options AS
SELECT
 p.id,
 p.title,
 p.name,
    CASE
        WHEN definition ->> 'tableLookup' = 'fiscal_year' THEN (SELECT json_agg(t) FROM (SELECT fiscal_year AS label, id AS value FROM data.fiscal_year) t)
        WHEN definition ->> 'tableLookup' = 'ministry' THEN (SELECT json_agg(d) FROM (SELECT concat(ministry.ministry_name, ' ', ministry.ministry_short_name) AS label, id AS value FROM data.ministry) d)
        WHEN definition ->> 'tableLookup' = 'portfolio' THEN (SELECT json_agg(g) FROM (SELECT concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) AS label, id AS value FROM data.portfolio) g)
        WHEN definition ->> 'dropDownValues' IS NOT NULL THEN p.definition -> 'dropDownValues'
    END definition
FROM public.picker_options p;`


exports.up = function (knex) {
  return knex.raw(formatted_picker_options );
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW formatted_picker_options;`);
};
