// import knex database connection and utilities
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const _ = require("lodash");

/**
 *
 *
 * @param   {number}               subcontractor - The subcontractor team to grab data for
 * @returns {Promise<{report: *}>}
 */
const queries = {
  report: (subcontractor) =>
    knex
      .with(
        "q1",
        knex.raw(
          `SELECT 
                fy.fiscal_year, 
                s.subcontractor_name, 
                p.project_number, 
                c.co_number, 
                c.co_version, 
                c.description, 
                c.start_date, 
                c.end_date, 
                c.status, 
                c.total_fee_amount + c.total_expense_amount as total_contract_amt 
            FROM 
                subcontractor s 
                inner join (
                (
                    project p 
                    inner join (
                    contract c 
                    inner join fiscal_year fy on c.fiscal = fy.id
                    ) on p.id = c.project_id
                ) 
                inner join contract_subcontractor cs on c.id = cs.contract_id
                ) on s.id = cs.subcontractor_id 
            WHERE 
                s.id = ? 
            UNION 
            SELECT 
                fy.fiscal_year, 
                s.subcontractor_name, 
                hc.project_number, 
                hc.co_number, 
                CASE WHEN hc.amendment_count <> 0 THEN 'a' || hc.amendment_count ELSE '' END AS expr1, 
                'historical contract' AS expr2, 
                hc.start_date, 
                hc.end_date, 
                'complete' AS status, 
                hc.total_contract_amount 
            FROM 
                subcontractor s 
                INNER JOIN (
                fiscal_year fy 
                INNER JOIN historical_contracts hc ON fy.id = hc.fiscal_year
                ) ON s.id = hc.subcontractor_id 
            WHERE 
                s.id = ?
          `,
          [subcontractor, subcontractor]
        )
      )
      .select({
        fiscal_year: "fiscal_year",
        subcontractor_name: "subcontractor_name",
        total_contract_amt: "total_contract_amt",
        co_number: "co_number",
        co_version: "co_version",
        project_number: "project_number",
        description: "description",
        start_date: knex.raw(`to_char(start_date, 'dd-Mon-yy')`),
        end_date: knex.raw(`to_char(end_date, 'dd-Mon-yy')`),
        status: "status",
      })
      .from("q1")
      .groupBy(
        "fiscal_year",
        "subcontractor_name",
        "co_number",
        "co_version",
        "project_number",
        "description",
        "start_date",
        "end_date",
        "total_contract_amt",
        "status"
      ),

  // returns the report total.
  report_totals: (fiscal) =>
    knex(queries.report(fiscal).as("report")).sum({ total_contract_amt: "total_contract_amt" }),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options               - Options object containing fiscal year.
 * @param   {string} options.fiscal        - The fiscal year to retrieve data for.
 * @param            options.subcontractor - The subcontractor to retrieve data for.
 * @returns {object}                       - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ subcontractor }) =>
  // Retrieve data from queries and process it into a structured object
  await Promise.all(
    // Map each query promise (simultaneously) to its execution with the 'fiscal' parameter.
    _.map(queries, (queryPromise) => queryPromise(subcontractor))
  )
    .then(
      // Destructure the results array to extract individual components
      ([report, report_totals]) =>
        // Combine the extracted components into an object
        ({
          report,
          report_totals,
        })
    )
    // Catch, then throw the error to be caught by the controller.
    .catch((error) => {
      log.error(error);
      throw error;
    });

// Export the functions to be used in controller.
module.exports = { required: ["subcontractor"], getAll };
