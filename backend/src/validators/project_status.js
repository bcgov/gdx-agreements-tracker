const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("project_id", Schema.Id)
  .prop("project_phase_id", Schema.Id)
  .prop("health_id", Schema.Id)
  .prop("schedule_health_id", Schema.Id)
  .prop("budget_health_id", Schema.Id)
  .prop("team_health_id", Schema.Id)
  .prop("reported_by_contact_id", Schema.Id)
  .prop("status_date", Schema.Date)
  .prop("general_progress_comments", S.string())
  .prop("issues_and_decisions", S.string())
  .prop("forecast_and_next_steps", S.string())
  .prop("identified_risk", S.string());

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(body),
};

module.exports = {
  getAll,
  getOne,
};
