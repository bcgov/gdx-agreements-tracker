const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param           requestParams fiscal: the fiscal year for this report
 * @returns {any[]}
 */

const handleParams = (query, requestParams) => {
  if (requestParams.fiscal) {
    query.where("q.fiscal", requestParams.fiscal);
  }
};

module.exports = {
  changeRequestTypes: (requestParams) => {
    const query = knex
      .select(
        knex.raw(`
          project_number,
          project_name,
          fiscal_year,
          total_crs,
          cr_initiated_by,
          budget_sum,
          schedule_sum,
          scope_sum,
          none_sum
     FROM (
           WITH qry_changerequest_count_by_initiated_by AS (
                   SELECT cr.link_id AS cr_project_id,
                          cr.fiscal_year AS cr_fiscal_year_id,
                          coalesce(cr.initiated_by, 'None') AS qry_cr_initiated_by,
                          count(*) AS cr_count
                     FROM data.change_request AS cr
                    GROUP BY 1,
                             2,
                             3
                    ORDER BY cr_project_id
                  ) SELECT p.project_number AS project_number,
                  p.project_name AS project_name,
                  fy.fiscal_year AS fiscal_year,
                  fy.id AS fiscal,
                  cr_count.cr_count AS total_crs,
                  coalesce(cr.initiated_by, 'None') AS cr_initiated_by,
                  sum(CASE WHEN crtype.crtype_name = 'Budget' THEN 1 ELSE 0 END) AS budget_sum,
                  sum(CASE WHEN crtype.crtype_name = 'Schedule' THEN 1 ELSE 0 END) AS schedule_sum,
                  sum(CASE WHEN crtype.crtype_name = 'Scope' THEN 1 ELSE 0 END) AS scope_sum,
                  sum(CASE WHEN crtype.crtype_name IS NULL THEN 1 ELSE 0 END) AS none_sum
             FROM data.change_request_crtype AS cr_ct
             JOIN data.crtype AS crtype
               ON crtype.id = cr_ct.crtype_id
            RIGHT JOIN data.change_request AS cr
               ON cr_ct.change_request_id = cr.id
             JOIN data.fiscal_year AS fy
               ON fy.id = cr.fiscal_year
             JOIN data.project AS p
               ON p.id = cr.link_id
             LEFT JOIN qry_changerequest_count_by_initiated_by AS cr_count
               ON cr_count.cr_project_id = p.id
              AND cr_count.cr_fiscal_year_id = fy.id
              AND cr_count.qry_cr_initiated_by = coalesce(cr.initiated_by, 'None')
            GROUP BY 1,
                     2,
                     3,
                     4,
                     5,
                     6
          ) AS q`) // end knex.raw()
      ) // end knex.select()
      .groupByRaw("1,2,3,4,5,6,7,8,9")
      .orderByRaw("1,3");
    handleParams(query, requestParams);

    return query;
  },
};
