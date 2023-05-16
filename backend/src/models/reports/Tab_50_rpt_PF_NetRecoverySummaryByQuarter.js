const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - net recovery summary by quarter
 *
 * @param           requestParams fiscal: the fiscal year for this report
 * @returns {any[]}
 */

const handleParams = (query, requestParams) => {
  if (requestParams.fiscal) {
    query.where("q.fiscal", requestParams.fiscal);
  }
};

const Tab_50_rpt_PF_NetRecoverySummaryByQuarter = (requestParams) => {
  const query = knex.select("*").fromRaw(
    `
    (
      WITH stob_base AS (
        SELECT p.id AS project_id,
          p.project_number,
          p.project_name,
          p.recoverable,
          po.id AS portfolio_id,
          po.portfolio_name,
          po.portfolio_abbrev,
          p.total_project_budget,
          p.recoverable_amount,
          pb.stob,
          coalesce(pb.q1_amount, 0::MONEY) AS q1_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN pb.q1_amount
            ELSE 0::MONEY
          END AS q1_expenses,
          (
            q1_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q1_amount
                ELSE 0::MONEY
              END
            )
          ) AS q1_net,
          coalesce(pb.q2_amount, 0::MONEY) AS q2_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q2_amount
            ELSE 0::MONEY
          END AS q2_expenses,
          (
            q2_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q2_amount
                ELSE 0::MONEY
              END
            )
          ) AS q2_net,
          coalesce(pb.q3_amount, 0::MONEY) AS q3_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q3_amount
            ELSE 0::MONEY
          END AS q3_expenses,
          (
            q3_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q3_amount
                ELSE 0::MONEY
              END
            )
          ) AS q3_net,
          coalesce(pb.q4_amount, 0::MONEY) AS q4_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q4_amount
            ELSE 0::MONEY
          END AS q4_expenses,
          (
            q4_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q4_amount
                ELSE 0::MONEY
              END
            )
          ) AS q4_net,
          (q1_amount + q2_amount + q3_amount + q4_amount) AS base_recoveries,
          fy.fiscal_year,
          pd.fiscal
        FROM data.project_budget AS pb
          LEFT JOIN data.project_deliverable pd ON pb.project_deliverable_id = pd.id
          LEFT JOIN data.project AS p ON pd.project_id = p.id
          LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
          LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
      ) --end stob_base query
      SELECT stob_base.portfolio_name AS portfolio_name,
        sum(stob_base.base_recoveries) AS total_recoveries,
        (
          sum(stob_base.q1_expenses) + sum(stob_base.q2_expenses) + sum(stob_base.q3_expenses) + sum(stob_base.q4_expenses)
        ) AS less_all_project_expenses,
        (
          sum(stob_base.base_recoveries) - (
            sum(stob_base.q1_expenses) + sum(stob_base.q2_expenses) + sum(stob_base.q3_expenses) + sum(stob_base.q4_expenses)
          )
        ) AS net_recoveries,
        sum(stob_base.q1_amount) AS q1_gross,
        sum(stob_base.q1_net) AS q1_net,
        sum(stob_base.q2_amount) AS q2_gross,
        sum(stob_base.q2_net) AS q2_net,
        sum(stob_base.q3_amount) AS q3_gross,
        sum(stob_base.q3_net) AS q3_net,
        sum(stob_base.q4_amount) AS q4_gross,
        sum(stob_base.q4_net) AS q4_net,
        fiscal
      FROM stob_base
      GROUP BY fiscal,
      portfolio_name
      ORDER BY portfolio_name,
      fiscal
    ) as q
  `
  );

  handleParams(query, requestParams);

  return query;
};

const Tab_50_totals = (requestParams) => {
  const query = knex.select("*").fromRaw(`
    (
      WITH stob_base AS (
        SELECT p.id AS project_id,
          p.project_number,
          p.project_name,
          p.recoverable,
          po.id AS portfolio_id,
          po.portfolio_name,
          po.portfolio_abbrev,
          p.total_project_budget,
          p.recoverable_amount,
          pb.stob,
          coalesce(pb.q1_amount, 0::MONEY) AS q1_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN pb.q1_amount
            ELSE 0::MONEY
          END AS q1_expenses,
          (
            q1_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q1_amount
                ELSE 0::MONEY
              END
            )
          ) AS q1_net,
          coalesce(pb.q2_amount, 0::MONEY) AS q2_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q2_amount
            ELSE 0::MONEY
          END AS q2_expenses,
          (
            q2_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q2_amount
                ELSE 0::MONEY
              END
            )
          ) AS q2_net,
          coalesce(pb.q3_amount, 0::MONEY) AS q3_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q3_amount
            ELSE 0::MONEY
          END AS q3_expenses,
          (
            q3_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q3_amount
                ELSE 0::MONEY
              END
            )
          ) AS q3_net,
          coalesce(pb.q4_amount, 0::MONEY) AS q4_amount,
          CASE
            WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q4_amount
            ELSE 0::MONEY
          END AS q4_expenses,
          (
            q4_amount - (
              CASE
                WHEN left(pb.stob, 2) IN ('57', '65', '63', '60') THEN q4_amount
                ELSE 0::MONEY
              END
            )
          ) AS q4_net,
          (q1_amount + q2_amount + q3_amount + q4_amount) AS base_recoveries,
          fy.fiscal_year,
          pd.fiscal
        FROM data.project_budget AS pb
          LEFT JOIN data.project_deliverable pd ON pb.project_deliverable_id = pd.id
          LEFT JOIN data.project AS p ON pd.project_id = p.id
          LEFT JOIN data.fiscal_year AS fy ON pd.fiscal = fy.id
          LEFT JOIN data.portfolio AS po ON pb.recovery_area = po.id
      )
      SELECT sum(stob_base.base_recoveries) AS totals_recoveries,
      (
        sum(stob_base.q1_expenses) + sum(stob_base.q2_expenses) + sum(stob_base.q3_expenses) + sum(stob_base.q4_expenses)
      ) AS totals_less_all_project_expenses,
      (
        sum(stob_base.base_recoveries) - (
          sum(stob_base.q1_expenses) + sum(stob_base.q2_expenses) + sum(stob_base.q3_expenses) + sum(stob_base.q4_expenses)
        )
      ) AS totals_net_recoveries,
      sum(stob_base.q1_amount) AS totals_q1_gross,
      sum(stob_base.q1_net) AS totals_q1_net,
      sum(stob_base.q2_amount) AS totals_q2_gross,
      sum(stob_base.q2_net) AS totals_q2_net,
      sum(stob_base.q3_amount) AS totals_q3_gross,
      sum(stob_base.q3_net) AS totals_q3_net,
      sum(stob_base.q4_amount) AS totals_q4_gross,
      sum(stob_base.q4_net) AS totals_q4_net,
      stob_base.fiscal,
      stob_base.fiscal_year
      FROM stob_base
      GROUP BY stob_base.fiscal, stob_base.fiscal_year
    ) as q
  `);

  handleParams(query, requestParams);

  return query;
};

module.exports = {
  Tab_50_rpt_PF_NetRecoverySummaryByQuarter,
  Tab_50_totals,
};
