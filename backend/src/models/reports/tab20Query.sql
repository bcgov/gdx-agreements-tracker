SET search_path = PUBLIC,
  data;
select *
FROM (
    WITH base AS (
      SELECT jv.fiscal_year_id AS fy,
        fiscal_year.fiscal_year,
        P.project_number,
        P.project_name,
        Sum(jv.amount) AS SumOfAmount,
        Sum(
          CASE
            WHEN jv.quarter = '1' THEN jv.amount
          END
        ) AS "q1",
        Sum(
          CASE
            WHEN jv.quarter = '2' THEN jv.amount
          END
        ) AS "q2",
        Sum(
          CASE
            WHEN jv.quarter = '3' THEN jv.amount
          END
        ) AS "q3",
        Sum(
          CASE
            WHEN jv.quarter = '4' THEN jv.amount
          END
        ) AS "q4"
      FROM fiscal_year
        INNER JOIN (
          project P
          RIGHT JOIN jv ON P.id = jv.project_id
        ) ON fiscal_year.id = jv.fiscal_year_id
      GROUP BY jv.fiscal_year_id,
        fiscal_year.fiscal_year,
        P.project_number,
        P.project_name
      ORDER BY P.project_number ASC,
        fiscal_year DESC
    )
    SELECT fy,
      project_number,
      project_name,
      q1,
      q2,
      q3,
      q4,
      COALESCE("q1", Cast(0 AS MONEY)) + COALESCE("q2", Cast(0 AS MONEY)) + COALESCE("q3", Cast(0 AS MONEY)) + COALESCE("q4", Cast(0 AS MONEY)) AS total
    FROM base
  ) AS query
WHERE fy = 9;