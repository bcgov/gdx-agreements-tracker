-- Parameter $1 looking for all projects (status) = '%' */
SET search_path = DATA;
SELECT n1.project_number,
  n1.project_name,
  n1.total_project_budget,
  n2.fiscal_year,
  n2.co_number,
  n2.co_version,
  (
    n2.supplier_name || CASE
      WHEN length(n2.subcontractor_name || '') > 0 THEN '/' || n2.subcontractor_name
      ELSE ''
    END
  ) supplier_subcontractor,
  n2.end_date::date,
  n2.total_contract_amount,
  n2.invoiced_to_date,
  (
    CASE
      WHEN n2.status IN (
        'Complete',
        'Cancelled'
      ) THEN cast(0 AS MONEY)
      ELSE (
        CASE
          WHEN n2.balance_remaining IS NOT NULL THEN n2.balance_remaining
          ELSE n2.total_contract_amount
        END
      )
    END
  ) balance_remaining,
  (
    CASE
      WHEN status IN (
        'Complete',
        'Cancelled'
      ) THEN (
        CASE
          WHEN balance_remaining IS NOT NULL THEN balance_remaining
          ELSE total_contract_amount
        END
      )
      ELSE cast(0 AS MONEY)
    END
  ) AS descoped
FROM (
    SELECT DISTINCT p.id AS project_id,
      p.fiscal,
      p.project_number,
      p.project_version,
      p.project_name,
      p.total_project_budget,
      p.recoverable_amount
    FROM contract c
      INNER JOIN project p ON c.project_id = p.id
    WHERE p.project_status like 'Complete'
      OR p.project_status = 'Active'
  ) n1
  INNER JOIN (
    SELECT p.id project_id,
      c.co_number,
      c.co_version,
      s.supplier_name,
      sc.subcontractor_name,
      coalesce(fy.fiscal_year, fy_d.fiscal_year) fiscal_year,
      coalesce(
        t.total_fee_amount,
        c.total_fee_amount
      ) + coalesce(
        t.total_expense_amount,
        c.total_expense_amount
      ) total_contract_amount,
      sum(id.unit_amount * id.rate) invoiced_to_date,
      coalesce(
        t.total_fee_amount,
        c.total_fee_amount
      ) + coalesce(
        t.total_expense_amount,
        c.total_expense_amount
      ) - sum(id.unit_amount * id.rate) balance_remaining,
      c.end_date,
      p.id,
      c.status
    FROM project p
      LEFT JOIN contract c ON p.id = c.project_id
      LEFT JOIN contract_subcontractor cs ON cs.contract_id = c.id
      LEFT JOIN subcontractor sc ON cs.subcontractor_id = sc.id
      LEFT JOIN fiscal_year fy_d ON c.fiscal = fy_d.id
      LEFT JOIN supplier s ON c.supplier_id = s.id
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
                  WHEN is_expense = 0::boolean THEN deliverable_amount
                  ELSE 0::MONEY
                END
              ),
              sum(
                CASE
                  WHEN is_expense = 1::boolean THEN deliverable_amount
                  ELSE 0::MONEY
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
      LEFT JOIN invoice i ON t.contract_id = i.contract_id
      AND t.fiscal = i.fiscal
      LEFT JOIN invoice_detail id ON i.id = id.invoice_id
    GROUP BY p.id,
      c.co_number,
      c.co_version,
      s.supplier_name,
      sc.subcontractor_name,
      coalesce(fy.fiscal_year, fy_d.fiscal_year),
      coalesce(
        t.total_fee_amount,
        c.total_fee_amount
      ) + coalesce(
        t.total_expense_amount,
        c.total_expense_amount
      ),
      c.end_date,
      p.id,
      c.status
  ) n2 ON n1.project_id = n2.project_id
GROUP BY n1.project_number,
  project_name,
  n1.total_project_budget,
  n2.fiscal_year,
  n2.co_number,
  n2.co_version,
  n2.supplier_name,
  n2.subcontractor_name,
  n2.end_date,
  n2.total_contract_amount,
  n2.invoiced_to_date,
  n2.status,
  n2.balance_remaining,
  fiscal
HAVING fiscal = 12
ORDER BY n1.project_number,
  n2.fiscal_year,
  n2.co_number;