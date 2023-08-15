/*Note : Could not determine sort order of Access report */
SET search_path = PUBLIC,
  DATA;
WITH q1 AS (
  SELECT contract_id,
    co_number,
    total_fee_amount,
    total_expense_amount,
    fees_invoiced,
    expenses_invoiced,
    total_invoiced,
    total_fee_amount - fees_invoiced fees_remaining,
    total_expense_amount - expenses_invoiced expenses_remaining,
    total_fee_amount + total_expense_amount - total_invoiced total_remaining
  FROM (
      SELECT c.id contract_id,
        c.co_number,
        c.total_fee_amount,
        c.total_expense_amount,
        sum(
          coalesce(
            CASE
              WHEN coalesce(cd.is_expense, FALSE) <> FALSE THEN cast(0 AS MONEY)
              ELSE id.unit_amount * id.rate
            END,
            cast(0 AS MONEY)
          )
        ) fees_invoiced,
        sum(
          coalesce(
            CASE
              WHEN coalesce(cd.is_expense, FALSE) <> FALSE THEN id.unit_amount * id.rate
            END,
            cast(0 AS MONEY)
          )
        ) expenses_invoiced,
        sum(
          coalesce(id.unit_amount * id.rate, cast(0 AS MONEY))
        ) total_invoiced
      FROM contract c
        LEFT JOIN invoice i ON c.id = i.contract_id
        LEFT JOIN invoice_detail id ON i.id = id.invoice_id
        LEFT JOIN contract_deliverable cd ON id.contract_deliverable_id = cd.id
      GROUP BY c.id,
        c.co_number,
        c.total_fee_amount,
        c.total_expense_amount
    ) a
)
SELECT po.portfolio_name,
  r.resource_first_name,
  r.resource_last_name,
  c.co_number,
  fiscal_year.fiscal_year,
  s.supplier_name,
  to_char(c.end_date, 'DD-Mon-YY') AS contract_end_date,
  sic.qualified_receiver,
  c.fiscal
FROM (
    portfolio po
    INNER JOIN (
      (
        supplier s
        INNER JOIN (
          q1
          INNER JOIN (
            RESOURCE r
            INNER JOIN (
              contract c
              INNER JOIN contract_resource cr ON c.id = cr.contract_id
            ) ON r.id = cr.resource_id
          ) ON q1.contract_id = c.id
        ) ON s.id = c.supplier_id
      )
      INNER JOIN sid_internal_coding sic ON c.id = sic.contract_id
    ) ON po.id = sic.portfolio_id
  )
  INNER JOIN fiscal_year ON c.fiscal = fiscal_year.id
WHERE c.status = 'Active'
ORDER BY portfolio_name,
  resource_last_name,
  resource_first_name;