const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Retrieves the multi-year annual project stats, filtered by portfolio name
 *
 * @param   {number | string | Array} fiscal- The fiscal year to grab data for
 * @returns {Promise}                         - A promise that resolves to the query result
 */
const reportQueries = {
  portfolioName: (portfolio) =>
    knex("portfolio").select("portfolio_name").where("portfolio.id", portfolio).first(),

  // The columns on which to calculate totals.
  columns: {
    // No totals for this report.
  },

  // The report query, which builds off of base queries.
  report: (portfolio) =>
    knex
      .with(
        "q1",
        knex.raw(
          `SELECT
            hp.project_number, 
            hp.project_name, 
            hp.total_project_budget, 
            fy.fiscal_year AS budget_fiscal, 
            hpb.q1, 
            hpb.q2, 
            hpb.q3, 
            hpb.q4, 
            (
              COALESCE(
                q1, 
                cast(0 AS MONEY)
              )+ COALESCE(
                q2, 
                cast(0 AS MONEY)
              )+ COALESCE(
                q3, 
                cast(0 AS MONEY)
              )+ COALESCE(
                q4, 
                cast(0 AS MONEY)
              )
            ):: MONEY AS total_recovered 
          FROM 
            historical_projects hp 
          INNER JOIN (
            fiscal_year fy 
            INNER JOIN historical_project_billing hpb ON fy.id = hpb.fiscal_year
          ) ON hp.project_number = hpb.project_number 
          GROUP BY
            hp.project_number, 
            hp.project_name, 
            hp.total_project_budget, 
            fy.fiscal_year, 
            hpb.q1, 
            hpb.q2, 
            hpb.q3, 
            hpb.q4`
        )
      )
      .with(
        "q2",
        knex.raw(
          `SELECT 
            cr.link_ID AS project_id, 
            COUNT(*) AS cr_count 
          FROM 
            change_request cr 
          GROUP BY 
            cr.link_id`
        )
      )
      .with(
        "q3",
        knex.raw(
          `SELECT 
            p.ID AS project_id, 
            p.project_number, 
            p.project_name, 
            p.total_project_budget, 
            fy.fiscal_year, 
            SUM(
              CASE WHEN quarter = '1' THEN amount ELSE NULL END
            ) AS q1, 
            SUM(
              CASE WHEN Quarter = '2' THEN amount ELSE NULL END
            ) AS q2, 
            SUM(
              CASE WHEN Quarter = '3' THEN amount ELSE NULL END
            ) AS q3, 
            SUM(
              CASE WHEN Quarter = '4' THEN amount ELSE NULL END
            ) AS q4, 
            SUM(jv.amount) AS total_recovered 
          FROM 
            fiscal_year fy 
          INNER JOIN (
            project p 
            INNER JOIN jv ON p.id = jv.project_id
          ) ON fy.id = jv.fiscal_year_id 
          GROUP BY 
            p.id, 
            p.project_number, 
            p.project_name, 
            p.total_project_budget, 
            fy.fiscal_year`
        )
      )
      .with(
        "q5",
        knex.raw(
          `SELECT 
            fy.id AS fiscal_year_id, 
            fy.fiscal_year, 
            hod.unique_clients, 
            cc.service_line 
          FROM 
            (
              client_coding cc 
              RIGHT JOIN (
                project p 
                RIGHT JOIN fiscal_year fy ON p.fiscal = fy.id
              ) ON cc.project_id = p.id
            ) 
          INNER JOIN historical_office_data hod ON fy.id = hod.fiscal_year 
          GROUP BY 
            fy.id, 
            fy.fiscal_year, 
            hod.unique_clients, 
            cc.service_line 
          ORDER BY 
            fiscal_year_id, 
            service_line`
        )
      )
      .with(
        "q4",
        knex.raw(
          `SELECT 
            q5.fiscal_year_id, 
            q5.fiscal_year, 
            (
              CASE WHEN unique_clients IS NOT NULL THEN unique_clients ELSE COUNT(*) END
            ) AS unique_client_count 
          FROM 
            q5 
          GROUP BY 
            q5.fiscal_year_id, 
            q5.fiscal_year, 
            q5.unique_clients`
        )
      )
      .with(
        "q0",
        knex.raw(
          `SELECT
            portfolio_id,
            p.fiscal AS fyid, 
            fy.fiscal_year AS fy, 
            p.project_number, 
            p.total_project_budget, 
            q3.total_recovered, 
            q2.cr_count, 
            p.project_type, 
            p.planned_start_date, 
            p.planned_end_date 
          FROM 
            q3 
          RIGHT JOIN (
            (
              project p 
              INNER JOIN fiscal_year fy ON p.fiscal = fy.id
            ) 
            LEFT JOIN q2 ON p.id = q2.project_id
          ) ON q3.project_id = p.id 
          WHERE 
            p.project_status <> 'Cancelled' 
            AND p.planned_start_date IS NOT NULL 
            AND p.planned_end_date IS NOT NULL 
          GROUP BY 
            p.fiscal, 
            fy.fiscal_year, 
            p.project_number, 
            p.total_project_budget, 
            q3.total_recovered, 
            q2.cr_count, 
            p.project_type, 
            p.planned_start_date, 
            p.planned_end_date,
            portfolio_id
          UNION 
          SELECT
            portfolio_id,
            hp.fiscal_year AS fyid, 
            fy.fiscal_year, 
            hp.project_number, 
            hp.total_project_budget, 
            q1.total_recovered, 
            hp.change_request_count, 
            hp.project_type, 
            hp.start_date, 
            hp.end_date
          FROM 
            fiscal_year fy 
          INNER JOIN (
            historical_projects hp 
            LEFT JOIN q1 ON hp.project_number = q1.project_number
          ) ON fy.id = hp.fiscal_year`
        )
      )
      .select({
        fiscal: "q0.fy",
        average_duration: knex.raw(
          `ROUND(
            AVG(
              DATE_PART(
                'day', planned_end_date - planned_start_date
              )
            ):: NUMERIC, 
            0
          )`
        ),
        average_cr_per_project: knex.raw(
          `ROUND(
            SUM(cr_count)/ COALESCE(
              SUM(
                CASE WHEN cr_count <> 0 THEN 1 ELSE NULL END
              ), 
              1
            ), 
            2
          )`
        ),
        unique_client_count: "q4.unique_client_count",
      })
      .count({
        project_count: "*",
      })
      .sum({
        total_project_budget: "q0.total_project_budget",
        total_recovered: "q0.total_recovered",
        change_request_count: "q0.cr_count",
        projects_with_crs: knex.raw(`CASE WHEN cr_count <> 0 THEN 1 ELSE NULL END`),
        internal_projects: knex.raw(`CASE WHEN project_type = 'Internal' THEN 1 ELSE 0 END`),
        external_projects: knex.raw(`CASE WHEN project_type = 'External' THEN 1 ELSE 0 END`),
        social_media_projects: knex.raw(
          `CASE WHEN project_type = 'Social Media' THEN 1 ELSE 0 END`
        ),
        service_projects: knex.raw(`CASE WHEN project_type = 'Service' THEN 1 ELSE 0 END`),
      })
      .from("q0")
      .leftJoin("q4", "q0.fyid", "q4.fiscal_year_id")
      .groupBy("fiscal", "q4.unique_client_count")
      .where("q0.portfolio_id", portfolio)
      .orderBy("q0.fy"),

  // Grand totals for the report columns.
  grandTotals: (portfolio) =>
    knex(reportQueries.report(portfolio).as("report")).sum(reportQueries.columns),
};

module.exports = {
  required: ["portfolio"],
  getAll: async ({ portfolio }) => {
    const [{ portfolio_name }, report, grandTotals] = await Promise.all([
      reportQueries.portfolioName(portfolio),
      reportQueries.report(portfolio),
      reportQueries.grandTotals(portfolio),
    ]);

    return { portfolio_name, report, grandTotals };
  },
};
