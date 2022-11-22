const dbConnection = require("../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const { dateFormat } = require("../helpers/standards");

// Get all.
const findAll = (projectId) => {
  return knex(`${projectStatusTable} as ps`)
    .columns(
      "ps.id",
      "ps.status_date",
      { progress: "ps.general_progress_comments" },
      { issues: "ps.issues_and_decisions" },
      { risk: "ps.identified_risk" },
      {
        project_health: knex.raw(
          "( SELECT json_build_object('red', ph.colour_red, 'green', ph.colour_green, 'blue', ph.colour_blue) )"
        ),
      },
      {
        schedule_health: knex.raw(
          "( SELECT json_build_object('red', sh.colour_red, 'green', sh.colour_green, 'blue', sh.colour_blue) )"
        ),
      },
      {
        budget_health: knex.raw(
          "( SELECT json_build_object('red', bh.colour_red, 'green', bh.colour_green, 'blue', bh.colour_blue) )"
        ),
      },
      {
        team_health: knex.raw(
          "( SELECT json_build_object('red', th.colour_red, 'green', th.colour_green, 'blue', th.colour_blue) )"
        ),
      }
    )
    .join(`${projectPhaseTable} as pp`, "ps.project_phase_id", "pp.id")
    .join(`${contactTable} as c`, "ps.reported_by_contact_id", "c.id")
    .join(`${healthIndicatorTable} as ph`, "ps.health_id", "ph.id")
    .leftJoin(`${healthIndicatorTable} as sh`, "ps.schedule_health_id", "sh.id")
    .leftJoin(`${healthIndicatorTable} as bh`, "ps.budget_health_id", "bh.id")
    .leftJoin(`${healthIndicatorTable} as th`, "ps.team_health_id", "th.id")
    .where("ps.project_id", projectId);
};

// Get specific one by id.
const findById = (projectStatusId) => {
  return knex(projectStatusTable).where("id", projectStatusId).first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectStatusTable).where("id", id).update(body);
};

// Add one.
const addOne = (newStatus) => {
  return knex(projectStatusTable).insert(newStatus);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne
};
