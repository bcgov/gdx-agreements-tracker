// libs
const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

// utilities
const { formatDate } = require("./helpers");

const reportQuery = (date) => {
  const query = knex
    .select({
      portfolio_name: "po.portfolio_name",
      "#": "p.project_number",
      name: "p.project_name",
      project_manager: knex.raw(`(
        SELECT first_name || ' ' || last_name
        FROM contact
        WHERE id = p.project_manager
      )`),
      description: "p.description",
      initiation_date: knex.raw("to_char(p.initiation_date, 'dd-Mon-yy')"),
      start_date: knex.raw("to_char(p.planned_start_date, 'dd-Mon-yy')"),
      end_date: knex.raw("to_char(p.planned_end_date, 'dd-Mon-yy')"),
      planned_budget: "p.planned_budget",
      ministry: "m.ministry_short_name",
    })
    .from("portfolio AS po")
    .rightJoin("project AS p", "po.id", "p.portfolio_id")
    .innerJoin("ministry AS m", "p.ministry_id", "m.id")
    .groupBy(
      "po.portfolio_name",
      "p.project_number",
      "p.project_name",
      "p.project_manager",
      "p.description",
      "p.initiation_date",
      "p.planned_start_date",
      "p.planned_end_date",
      "p.planned_budget",
      "m.ministry_short_name"
    )
    .orderBy("po.portfolio_name")
    .orderBy("p.project_number");
  //The frontend enforces that you enter a date, this is a second layer of validation.  This is a unique knex query where knex will check if the initiation date is greater than or equal to the param date passed in.
  if (date) {
    query.where("p.initiation_date", ">=", date);
  }

  return query;
};

const getAll = async ({ date }) => {
  try {
    return {
      report: await reportQuery(date),
      afterDate: formatDate(date),
    };
  } catch (error) {
    handleGetAllError(error);
  }
};

// Handle the error thrown by the getAll function.
const handleGetAllError = (error) => {
  log.error(error);
  throw new Error("Error retrieving data for the  Projects registered report.");
};

module.exports = { required: ["date"], getAll };
