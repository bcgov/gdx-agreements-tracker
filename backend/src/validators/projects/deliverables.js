const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");
const color = S.object().prop("red", S.number()).prop("green", S.number()).prop("blue", S.number());

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", Schema.Id)
        .prop("description", S.anyOf([S.string(), S.null()]))
        .prop("start_date", S.anyOf([S.string(), S.null()]))
        .prop("completion_date", S.anyOf([S.string(), S.null()]))
        .prop("deliverable_amount", S.string())
        .prop("project_id", Schema.Id)
        .prop("comments", S.anyOf([S.string(), S.null()]))
        .prop("fiscal", S.string())
        .prop("deliverable_status", S.string())
        .prop("percent_complete", S.number())
        .prop("health_id", color)
        .prop("is_expense", S.boolean())
    )
  ),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("deliverable_name", S.string())
      .prop("description", S.string())
      .prop("start_date", S.string())
      .prop("completion_date", S.string())
      .prop("deliverable_amount", S.number())
      .prop("recoverable_amount", S.number())
      .prop("project_id", Schema.Picker)
      .prop("comments", S.anyOf([S.string(), S.null()]))
      .prop("fiscal", Schema.Picker)
      .prop("deliverable_status", S.string())
      .prop("percent_complete", S.number())
      .prop("health_id", Schema.Picker)
      .prop("is_expense", S.boolean())
  ),
};

const addUpdateBody = S.object()
  .prop("deliverable_name", S.string())
  .prop("description", S.string())
  .prop("start_date", S.string())
  .prop("completion_date", S.string())
  .prop("deliverable_amount", Schema.Money)
  .prop("project_id", Schema.Id)
  .prop("comments", S.anyOf([S.string(), S.null()]))
  .prop("fiscal", S.number())
  .prop("deliverable_status", S.string())
  .prop("percent_complete", S.number())
  .prop("health_id", S.number())
  .prop("is_expense", S.boolean())
  .prop("recoverable_amount", Schema.Money);

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
  updateOne,
  addOne,
};
