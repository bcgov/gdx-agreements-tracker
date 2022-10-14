const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("fiscal", Schema.ShortString)
  .prop("resource", Schema.ShortString)
  .prop("assignment_role", Schema.ShortString)
  .prop("supplier_rate", Schema.ShortString)
  .prop("assignment_rate", Schema.ShortString)
  .prop("hours", S.number())
  .prop("fees_for_resource", Schema.ShortString)
  .prop("start_date", Schema.Date)
  .prop("end_date", Schema.Date);

const requestBody = S.object()
  .prop("fiscal", Schema.Id)
  .prop("resource_id", Schema.Id)
  .prop("supplier_rate_id", Schema.Id)
  .prop("assignment_rate", Schema.Money)
  .prop("hours", S.number())
  .prop("start_date", Schema.Date)
  .prop("end_date", Schema.Date);

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
  body: requestBody.required(["resource_id", "supplier_rate_id", "assignment_rate", "fiscal"]),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
