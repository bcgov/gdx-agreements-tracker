const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

/**
 * Retrieves Annual stats report on DMS office staff, salaries, division FTEs, DMS operating costs, target recoveries.
 *
 * @returns {Promise} - A promise that resolves to the query result
 */
const getReport = () =>
  knex
    .with(
      "q1",
      knex.raw(`
        SELECT fy.fiscal_year,
          ho.pmo_staff AS dms_staff,
          ho.division_fte,
          ho.salaries_and_benefits,
          ho.operating_costs,
          ho.target_recoveries,
          coalesce(
            ho.recoveries,
            sum(
              (
                CASE
                  WHEN q1_recovered THEN q1_amount
                  ELSE cast(0 AS MONEY)
                END
              ) +(
                CASE
                  WHEN q2_recovered THEN q2_amount
                  ELSE cast(0 AS MONEY)
                END
              ) +(
                CASE
                  WHEN q3_recovered THEN q3_amount
                  ELSE cast(0 AS MONEY)
                END
              ) +(
                CASE
                  WHEN q4_recovered THEN q4_amount
                  ELSE cast(0 AS MONEY)
                END
              )
            )
          ) AS recoveries
        FROM fiscal_year fy
          INNER JOIN (
            (
              historical_office_data ho
              LEFT JOIN project_deliverable pd ON ho.fiscal_year = pd.fiscal
            )
            LEFT JOIN (
              project_budget pb
              LEFT JOIN portfolio po ON pb.recovery_area = po.id
            ) ON pd.id = pb.project_deliverable_id
          ) ON fy.id = ho.fiscal_year
        WHERE coalesce(portfolio_abbrev, 'PMO') = 'DMS'
          AND coalesce(stob, '8807') IN ('8809', '8807')
        GROUP BY fy.fiscal_year,
          ho.pmo_staff,
          ho.division_fte,
          ho.salaries_and_benefits,
          ho.operating_costs,
          ho.target_recoveries,
          recoveries,
          target_recoveries,
          ho.unique_clients,
          ho.recoveries`)
    )
    .select({
      fiscal_year: "fiscal_year",
      dms_staff: "dms_staff",
      division_fte: "division_fte",
      salaries_and_benefits: "salaries_and_benefits",
      operating_costs: "operating_costs",
      target_recoveries: "target_recoveries",
      recoveries: "recoveries",
      target_over_under: knex.raw(`
        round(
          (
            recoveries::numeric / target_recoveries::numeric - 1
          ) * 100,
          2
        ) || CASE
          WHEN recoveries IS NULL THEN ''
          ELSE '%'
        END`),
    })
    .from("q1")
    .orderBy("fiscal_year");

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @returns {object} - An object containing fiscal year, report, and report total.
 */
module.exports = {
  required: [],
  getAll: async () => ({
    report: await getReport().catch((err) => log.error(err)),
  }),
};
