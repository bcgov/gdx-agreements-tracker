// libs
const { knex } = require("@database/databaseConnection")();

/**
 *
 * Retrieves Annual stats report on all Contracts showing number of contracts,
 * total contracted amount, average duration, # of amendments, # with amendments, # of resources.",
 *
 * @returns {Promise<*>}
 */
const getReport = () => {
  const query = knex
    .with(
      "q1",
      knex.raw(
        `SELECT c.id contract_id,
        c.co_number,
        coalesce(t.fiscal, c.fiscal) fiscal,
        coalesce(fy.fiscal_year, fy_d.fiscal_year) fiscal_year,
        sic.portfolio_id,
        po.portfolio_name,
        po.portfolio_abbrev,
        c.start_date,
        p.project_number,
        c.end_date,
        c.status,
        coalesce(t.total_fee_amount, c.total_fee_amount) total_fee_amount,
        coalesce(t.total_expense_amount, c.total_expense_amount) total_expense_amount
      FROM contract c
        INNER JOIN fiscal_year fy_d ON c.fiscal = fy_d.id
        LEFT JOIN (
          SELECT contract_id,
            fiscal,
            sum(total_fee_amount) total_fee_amount,
            sum(total_expense_amount) total_expense_amount
          FROM (
              SELECT contract_id,
                fiscal,
                sum(hours * assignment_rate) total_fee_amount,
                NULL total_expense_amount
              FROM contract_resource
              GROUP BY contract_id,
                fiscal
              UNION
              SELECT contract_id,
                fiscal,
                sum(
                  CASE
                    WHEN is_expense = FALSE THEN deliverable_amount
                    ELSE cast(0 AS MONEY)
                  END
                ),
                sum(
                  CASE
                    WHEN is_expense = TRUE THEN deliverable_amount
                    ELSE cast(0 AS MONEY)
                  END
                )
              FROM contract_deliverable
              GROUP BY contract_id,
                fiscal
            ) t_sub
          GROUP BY contract_id,
            fiscal
        ) t ON c.id = t.contract_id
        LEFT JOIN fiscal_year fy ON t.fiscal = fy.id
        LEFT JOIN project p ON c.project_id = p.id
        LEFT JOIN LATERAL (
          SELECT portfolio_id
          FROM sid_internal_coding
          WHERE contract_id = c.id
          LIMIT 1
        ) sic ON TRUE
        LEFT JOIN portfolio po ON po.id = sic.portfolio_id`
      )
    )
    .with(
      "q2",
      knex.raw(
        `SELECT c.fiscal AS fiscal_year_id,
        c.fiscal_year,
        c.co_number,
        c.total_fee_amount + c.total_expense_amount AS total_fees_and_expenses,
        extract(
          DAY
          FROM c.end_date - c.start_date
        ) AS duration,
        right(
          coalesce(co_version, 'A0'),
          length(coalesce(co_version, 'A0')) -1
        )::int AS amendment_count,
        count(*) AS resource_count
      FROM (
          q1 AS c
          LEFT JOIN contract_resource ON (c.fiscal = contract_resource.fiscal)
          AND (c.contract_id = contract_resource.contract_id)
        )
        INNER JOIN contract ON c.contract_id = contract.id
      GROUP BY c.fiscal,
        c.fiscal_year,
        c.co_number,
        c.total_fee_amount,
        c.total_expense_amount,
        c.start_date,
        c.end_date,
        co_version
      UNION ALL
      SELECT fy.id,
        fy.fiscal_year,
        hc.co_number,
        hc.total_contract_amount AS total_fees_and_expenses,
        extract(
          DAY
          FROM end_date - start_date
        ) AS duration,
        hc.amendment_count,
        count(*) AS resource_count
      FROM (
          fiscal_year fy
          INNER JOIN historical_contracts hc ON fy.id = hc.fiscal_year
        )
        LEFT JOIN historical_contract_assignments hca ON hc.co_number = hca.co_number
      GROUP BY fy.id,
        fy.fiscal_year,
        hc.co_number,
        hc.total_contract_amount,
        start_date,
        end_date,
        hc.amendment_count`
      )
    )
    .select({
      fiscal_year: "q2.fiscal_year",
      contract_count: knex.raw("count(*)"),
      total_fees_and_expenses: knex.raw("sum(q2.total_fees_and_expenses)"),
      average_duration: knex.raw("round(avg(duration), 0)"),
      total_contract_amendments: knex.raw("sum(q2.amendment_count)"),
      contracts_with_amendments: knex.raw(
        `sum(
          CASE
            WHEN amendment_count = 0 THEN 0
            ELSE 1
          END
        )`
      ),
      average_amendments_per_contract: knex.raw(
        `round(
          sum(q2.amendment_count)::numeric / sum(
            CASE
              WHEN amendment_count = 0 THEN 0
              ELSE 1
            END
          ),
          2
        )`
      ),
      resource_count: knex.raw("sum(q2.resource_count)"),
    })
    .from("q2")
    .groupBy("q2.fiscal_year_id", "q2.fiscal_year")
    .orderBy("q2.fiscal_year_id", "asc")
    .catch((error) => {
      console.error(error);
    });

  return query;
};

// return the model data
module.exports = {
  required: [],
  getAll: async () => ({
    report: await getReport(),
  }),
};
