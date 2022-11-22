const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const color = S.object().prop("red", S.number()).prop("green", S.number()).prop("blue", S.number());

const body = S.object()
  .prop("id", S.number())  
  .prop("status_date", S.string())
  .prop("progress", S.string())
  .prop("issues", S.string())
  .prop("risk", S.string())
  .prop("project_health", color)
  .prop("schedule_health", color)
  .prop("budget_health", color)
  .prop("team_health", color);

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
