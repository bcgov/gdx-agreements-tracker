const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("jv_number", Schema.ShortString.minLength(1))
  .prop("billed_date", Schema.ShortString.minLength(1))
  .prop("amount", Schema.Float)
  .prop("quarter", Schema.Id)
  .prop("fiscal_year_id", Schema.Id)
  .prop("client_coding_id", Schema.Id);

const responseSingleBody = body.prop("fiscal_year_id", Schema.Picker);
const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(responseSingleBody),
};

const updateOne = {
  params: Schema.IdParam,
  body: body.minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  body: body.required([
    "jv_number",
    "billed_date",
    "amount",
    "quarter",
    "project_id",
    "fiscal_year_id",
    "client_coding_id",
  ]),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
