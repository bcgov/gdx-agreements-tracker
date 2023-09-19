// import knex database connection and utilities
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);
const _ = require("lodash");

/**
 *
 * Retrieves invoiced amount towards each type of contract resource
 * (Application Design-Development, Application Management, Architecture,
 * Business Analysis and Process Consultation etc.)
 * Based on the Competencies in the SRI
 *
 * @param   {number}               fiscal - The fiscal year to grab data for
 * @returns {Promise<{report: *}>}
 */
const queries = {
  // returns the fiscal year.
  fiscal_year: (fiscal) =>
    knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

  // returns the report data.
  report: (fiscal) =>
    knex
      .with(
        "q1",
        knex.raw(`
        select 
          c.Fiscal, 
          fy.Fiscal_Year, 
          c.Supplier_ID, 
          s.Supplier_Name, 
          p.Portfolio_Abbrev as Portfolio, 
          c.CO_Number, 
          Sum(Unit_Amount * Rate) as Total_Invoiced 
        from 
          (
            Portfolio p 
            inner join (
              (
                (
                  (
                    Supplier s 
                    right join Contract c on s.ID = c.Supplier_ID
                  ) 
                  inner join Invoice i on c.ID = i.Contract_ID
                ) 
                inner join Invoice_Detail id on i.ID = id.Invoice_ID
              ) 
              inner join SID_Internal_Coding sic on c.ID = sic.Contract_ID
            ) on p.ID = sic.Portfolio_ID
          ) 
          inner join Fiscal_Year fy ON c.Fiscal = fy.ID 
        group by 
          c.Fiscal, 
          fy.Fiscal_Year, 
          c.Supplier_ID, 
          s.Supplier_Name, 
          c.CO_Number, 
          p.Portfolio_Abbrev 
        union 
        select 
          hc.Fiscal_Year, 
          fy.Fiscal_Year, 
          hc.Supplier_ID, 
          s.Supplier_Name, 
          p.Portfolio_Abbrev, 
          hc.CO_Number, 
          hc.Invoiced 
        from 
          (
            Supplier s 
            inner join (
              Fiscal_Year fy 
              inner join Historical_Contracts hc on fy.ID = hc.Fiscal_Year
            ) on s.ID = hc.Supplier_ID
          ) 
          inner join Portfolio p on hc.Portfolio_ID = p.ID`)
      )
      .with(
        "q2",
        knex.raw(`
        select 
          q1.Fiscal, 
          q1.Fiscal_Year, 
          q1.Supplier_ID, 
          q1.Supplier_Name, 
          Sum(
            case when q1.Portfolio = 'OSS' then q1.Total_Invoiced else cast(0 as money) end
          ) as OSS, 
          Sum(
            case when q1.Portfolio = 'DES' then q1.Total_Invoiced else cast(0 as money) end
          ) as DES, 
          Sum(
            case when q1.Portfolio = 'DMS' then q1.Total_Invoiced else cast(0 as money) end
          ) as DMS, 
          Sum(
            case when q1.Portfolio = 'DP' then q1.Total_Invoiced else cast(0 as money) end
          ) as DP, 
          Sum(
            case when q1.Portfolio = 'ANA' then q1.Total_Invoiced else cast(0 as money) end
          ) as ANA, 
          Sum(
            case when q1.Portfolio = 'SD' then q1.Total_Invoiced else cast(0 as money) end
          ) as SD, 
          Sum(
            case when q1.Portfolio = 'CE' then q1.Total_Invoiced else cast(0 as money) end
          ) as CE, 
          Sum(
            case when q1.Portfolio = 'EDS' then q1.Total_Invoiced else cast(0 as money) end
          ) as EDS, 
          Sum(
            case when q1.Portfolio = 'BCS' then q1.Total_Invoiced else cast(0 as money) end
          ) as BCS, 
          Sum(
            case when q1.Portfolio = 'DIV' then q1.Total_Invoiced else cast(0 as money) end
          ) as DIV, 
          Sum(
            case when q1.Portfolio = 'GC' then q1.Total_Invoiced else cast(0 as money) end
          ) as GC 
        from 
          q1 
        where q1.Supplier_Name In ('CGI', 'Sierra', 'Fujitsu')
        group by 
          q1.Fiscal, 
          q1.Fiscal_Year, 
          q1.Supplier_ID, 
          q1.Supplier_Name`)
      )
      .select({
        fiscal: "fiscal",
        supplier_name: "supplier_name",
        bcs: knex.raw("CAST(BCS AS MONEY)"),
        oss: knex.raw("CAST(OSS AS MONEY)"),
        des: knex.raw("CAST(DES AS MONEY)"),
        dp: knex.raw("CAST(DP AS MONEY)"),
        ana: knex.raw("CAST(ANA AS MONEY)"),
        dms: knex.raw("CAST(DMS AS MONEY)"),
        sd: knex.raw("CAST(SD AS MONEY)"),
        ce: knex.raw("CAST(CE AS MONEY)"),
        gc: knex.raw("CAST(GC AS MONEY)"),
        total: knex.raw(`
        CAST(
          (
            BCS + OSS + DES + DP + ANA + DMS + SD + CE + GC
          ) AS MONEY
        )`),
      })
      .from("q2")
      .where("fiscal", fiscal)
      .orderBy("supplier_name"),

  // returns the report total.
  report_total: (fiscal) =>
    knex(queries.report(fiscal).as("report"))
      .sum({
        bcs: "bcs",
        oss: "oss",
        des: "des",
        dp: "dp",
        ana: "ana",
        dms: "dms",
        sd: "sd",
        ce: "ce",
        gc: "gc",
        total: "total",
      })
      .first(),
};

/**
 * Retrieve and process data from queries to create a structured result object.
 *
 * @param   {object} options        - Options object containing fiscal year.
 * @param   {string} options.fiscal - The fiscal year to retrieve data for.
 * @returns {object}                - An object containing fiscal year, report, and report total.
 */
const getAll = async ({ fiscal }) =>
  // Retrieve data from queries and process it into a structured object
  await Promise.all(
    // Map each query promise (simultaneously) to its execution with the 'fiscal' parameter.
    _.map(queries, (queryPromise) => queryPromise(fiscal))
  )
    .then(
      // Destructure the results array to extract individual components
      ([{ fiscal_year }, report, report_total]) =>
        // Combine the extracted components into an object
        ({
          fiscal_year,
          report,
          report_total,
        }) // implicit return
    )
    // Catch, then throw the error to be caught by the controller.
    .catch((error) => {
      log.error(error);
      throw error;
    });

// Export the functions to be used in controller.
module.exports = { required: ["fiscal"], getAll };
