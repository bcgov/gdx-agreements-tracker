--* Note .. added fiscal_year (header) sort order is off on value 'Engagement  - General Support' extra space before dash */
SET search_path = PUBLIC,
  DATA;
WITH fixed_price_resource_count AS (
  SELECT contract_id,
    count(*) fixed_price_resource_count
  FROM contract_resource
  WHERE hours IS NULL
  GROUP BY contract_id
),
fixed_price_invoice_total AS (
  SELECT i.contract_id,
    sum(id.unit_amount * id.rate) fixed_price_amount
  FROM invoice i
    INNER JOIN invoice_detail id ON i.id = id.invoice_id
    INNER JOIN contract_deliverable cd ON id.contract_deliverable_id = cd.id
  WHERE cd.is_expense = FALSE
  GROUP BY i.contract_id
),
contract_deliverable_fee_total AS (
  SELECT contract_id,
    sum(deliverable_amount) deliverable_total
  FROM contract_deliverable
  WHERE deliverable_amount IS NOT NULL
    AND is_expense = FALSE
  GROUP BY contract_id
),
contract_portfolio AS (
  SELECT contract_id,
    min(portfolio_id) port_id
  FROM sid_internal_coding
  GROUP BY contract_id
),
q1 AS (
  SELECT cr.contract_id,
    c.co_number,
    c.total_fee_amount,
    po.portfolio_name,
    po.portfolio_abbrev,
    rt.resource_type,
    fy.fiscal_year,
    fy.id as fiscal,
    CASE
      WHEN cr.hours IS NULL THEN TRUE
      ELSE FALSE
    END fixed,
    sum(id.unit_amount * id.rate) hourly_fees,
    fpit.fixed_price_amount,
    count(*) resource_count,
    fprc.fixed_price_resource_count,
    fpit.fixed_price_amount * cast(count(*) AS float) / fprc.fixed_price_resource_count allocated_deliverable_total
  FROM contract c
    INNER JOIN fiscal_year fy ON c.fiscal = fy.id
    INNER JOIN contract_resource cr ON c.id = cr.contract_id
    INNER JOIN supplier_rate sr ON cr.supplier_rate_id = sr.id
    INNER JOIN resource_type rt ON sr.resource_type_id = rt.id
    INNER JOIN contract_portfolio cp ON c.id = cp.contract_id
    INNER JOIN portfolio po ON cp.port_id = po.id
    LEFT JOIN invoice_detail id ON cr.id = id.contract_resource_id
    LEFT JOIN fixed_price_resource_count fprc ON c.id = fprc.contract_id
    LEFT JOIN fixed_price_invoice_total fpit ON c.id = fpit.contract_id
    LEFT JOIN contract_deliverable_fee_total cdft ON c.id = cdft.contract_id
  GROUP BY cr.contract_id,
    c.co_number,
    c.total_fee_amount,
    po.portfolio_name,
    po.portfolio_abbrev,
    rt.resource_type,
    fy.fiscal_year,
    fy.id,
    CASE
      WHEN cr.hours IS NULL THEN TRUE
      ELSE FALSE
    END,
    fpit.fixed_price_amount,
    fprc.fixed_price_resource_count
),
q2 AS (
  SELECT q1.fiscal_year,
    q1.fiscal,
    q1.resource_type,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'BCF' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS bcf,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'OSS' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS oss,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'DES' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS des,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'DP' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS dp,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'ANA' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS ana,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'DMS' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS dms,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'SD' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS sd,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'CE' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS ce,
    sum(
      CASE
        WHEN q1.portfolio_abbrev = 'GC' THEN coalesce(
          hourly_fees,
          cast(0 AS MONEY) + coalesce(
            allocated_deliverable_total,
            cast(0 AS MONEY)
          )
        )
        ELSE NULL
      END
    ) AS gc
  FROM q1
  GROUP BY q1.fiscal_year,
    q1.fiscal,
    q1.resource_type
)
SELECT q2.*,
  cast(
    coalesce(q2.bcf::numeric, 0) + coalesce(q2.oss::numeric, 0) + coalesce(q2.des::numeric, 0) + coalesce(q2.dp::numeric, 0) + coalesce(q2.ana::numeric, 0) + coalesce(q2.dms::numeric, 0) + coalesce(q2.sd::numeric, 0) + coalesce(q2.ce::numeric, 0) + coalesce(q2.gc::numeric, 0) AS MONEY
  ) AS total
FROM q2
where fiscal = 12