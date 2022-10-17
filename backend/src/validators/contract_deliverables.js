const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", S.number())
  .prop("comments", S.string())
  .prop("completion_date", S.string())
  .prop("deliverable_amount", S.number())
  .prop("deliverable_name", S.string())
  .prop("deliverable_status", S.string())
  .prop("description", S.string())
  .prop("fiscal", S.number())
  .prop("is_expense", S.boolean())
  .prop("project_deliverable_id", S.number());

const requestBody = S.object()
  .prop("comments", S.string())
  .prop("completion_date", S.string())
  .prop("deliverable_amount", S.number())
  .prop("deliverable_name", S.string())
  .prop("deliverable_status", S.string())
  .prop("description", S.string())
  .prop("fiscal", S.number())
  .prop("is_expense", S.boolean())
  .prop("project_deliverable_id", S.number());

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    body
      .without(["fiscal", "resource", "supplier_rate", "assignment_rate"])
      .prop("fiscal", Schema.Picker)
      .prop("supplier_rate_id", Schema.Picker)
      .prop("resource_id", Schema.Picker)
      .prop("assignment_rate", Schema.Money)
  ),
};

const updateOne = {
  params: Schema.IdParam,
  body: requestBody.minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: requestBody,
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
