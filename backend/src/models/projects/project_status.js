const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const projectStatusTable = `${dataBaseSchemas().data}.project_status`;
const projectPhaseTable = `${dataBaseSchemas().data}.project_phase`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;
const contactTable = `${dataBaseSchemas().data}.contact`;

// Get all.
const findAll = (projectId) => {
  return knex(`${projectStatusTable} as ps`)
    .columns(
      "ps.id",
      "ps.status_date",
      { progress: "ps.general_progress_comments" },
      { issues: "ps.issues_and_decisions" },
      { forecast_and_next_steps: "ps.forecast_and_next_steps" },
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
  return knex(`${projectStatusTable} as ps`)
    .columns({
      health_id: knex.raw("( SELECT json_build_object('value', ph.id, 'label', ph.health_name) )"),
      budget_health_id: knex.raw(
        "( SELECT json_build_object('value', bh.id, 'label', bh.health_name) )"
      ),
      schedule_health_id: knex.raw(
        "( SELECT json_build_object('value', sh.id, 'label', sh.health_name) )"
      ),
      team_health_id: knex.raw(
        "( SELECT json_build_object('value', th.id, 'label', th.health_name) )"
      ),
      project_phase_id: knex.raw(
        "( SELECT json_build_object('value', pp.id, 'label', pp.phase_name) )"
      ),
      reported_by_contact_id: knex.raw(
        "( SELECT json_build_object('value', c.id, 'label', c.last_name || ', ' || c.first_name) )"
      ),
      id: "ps.id",
      status_date: "ps.status_date",
      general_progress_comments: "ps.general_progress_comments",
      issues_and_decisions: "ps.issues_and_decisions",
      forecast_and_next_steps: "ps.forecast_and_next_steps",
      identified_risk: "ps.identified_risk",
    })
    .join(`${projectPhaseTable} as pp`, "ps.project_phase_id", "pp.id")
    .join(`${contactTable} as c`, "ps.reported_by_contact_id", "c.id")
    .join(`${healthIndicatorTable} as ph`, "ps.health_id", "ph.id")
    .leftJoin(`${healthIndicatorTable} as sh`, "ps.schedule_health_id", "sh.id")
    .leftJoin(`${healthIndicatorTable} as bh`, "ps.budget_health_id", "bh.id")
    .leftJoin(`${healthIndicatorTable} as th`, "ps.team_health_id", "th.id")
    .where("ps.id", projectStatusId)
    .first();
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
  addOne,
};
