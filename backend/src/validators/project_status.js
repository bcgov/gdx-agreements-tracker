const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", S.number())
  .prop("project_id", S.number())
  .prop("project_phase_id", S.number())
  .prop("health_id", S.number())
  .prop("schedule_health_id", S.number())
  .prop("budget_health_id", S.number())
  .prop("team_health_id", S.number())
  .prop("reported_by_contact_id", S.number())
  .prop("status_date", S.string())
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
