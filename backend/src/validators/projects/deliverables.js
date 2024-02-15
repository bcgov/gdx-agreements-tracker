const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");
const color = S.object().prop("red", S.number()).prop("green", S.number()).prop("blue", S.number());

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", Schema.Id)
        .prop("deliverable_name", S.string())
        .prop("start_date", S.anyOf([S.null(), S.string()]))
        .prop("completion_date", S.anyOf([S.null(), S.string()]))
        .prop("deliverable_amount", S.string())
        .prop("recoverable_amount", S.string())
        .prop("is_expense", S.boolean())
        .prop("comments", S.anyOf([S.string(), S.null()]))
        .prop("fiscal", S.string())
        .prop("percent_complete", S.number())
        .prop("deliverable_status", S.string())
        .prop("health_id", color)
    )
  ),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("deliverable_name", S.string())
      .prop("start_date", S.anyOf([S.null(), S.string()]))
      .prop("completion_date", S.anyOf([S.null(), S.string()]))
      .prop("deliverable_amount", S.string())
      .prop("recoverable_amount", S.string())
      .prop("is_expense", S.boolean())
      .prop("comments", S.anyOf([S.string(), S.null()]))
      .prop("fiscal", Schema.Picker)
      .prop("percent_complete", S.number())
      .prop("deliverable_status", S.string())
      .prop("health_id", Schema.Picker)
  ),
};

const addUpdateBody = S.object()
  .prop("id", S.number())
  .prop("deliverable_name", S.string())
  .prop("start_date", S.anyOf([S.null(), S.string()]))
  .prop("completion_date", S.anyOf([S.null(), S.string()]))
  .prop("deliverable_amount", S.string())
  .prop("recoverable_amount", S.string())
  .prop("is_expense", S.boolean())
  .prop("comments", S.anyOf([S.string(), S.null()]))
  .prop("fiscal", S.number())
  .prop("percent_complete", S.number())
  .prop("deliverable_status", S.string())
  .prop("health_id", S.number());

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
