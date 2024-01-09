const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const color = S.object().prop("red", S.number()).prop("green", S.number()).prop("blue", S.number());

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("status_date", S.string())
        .prop("progress", S.string())
        .prop("issues", S.string())
        .prop("risk", S.string())
        .prop("forecast_and_next_steps", S.string())
        .prop("project_health", color)
        .prop("schedule_health", color)
        .prop("budget_health", color)
        .prop("team_health", color)
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("health_id", Schema.Picker)
      .prop("budget_health_id", Schema.Picker)
      .prop("schedule_health_id", Schema.Picker)
      .prop("team_health_id", Schema.Picker)
      .prop("project_phase_id", Schema.Picker)
      .prop(
        "reported_by_contact_id",
        S.object().prop("name", S.string()).prop("ministry", S.string()).prop("value", S.number())
      )
      .prop("id", S.number())
      .prop("status_date", S.string())
      .prop("general_progress_comments", S.string())
      .prop("issues_and_decisions", S.string())
      .prop("general_progress_comments", S.string())
      .prop("forecast_and_next_steps", S.string())
      .prop("identified_risk", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("health_id", Schema.Id)
  .prop("budget_health_id", Schema.Id)
  .prop("schedule_health_id", Schema.Id)
  .prop("team_health_id", Schema.Id)
  .prop("project_phase_id", Schema.Id)
  .prop("reported_by_contact_id", Schema.Id)
  .prop("id", Schema.Id)
  .prop("status_date", Schema.Date)
  .prop("general_progress_comments", S.string())
  .prop("issues_and_decisions", S.string())
  .prop("general_progress_comments", S.string())
  .prop("forecast_and_next_steps", S.string())
  .prop("identified_risk", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
};
