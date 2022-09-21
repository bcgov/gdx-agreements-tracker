const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("received_date", Schema.Date)
  .prop("invoice_date", Schema.Date)
  .prop("due_date", Schema.Date)
  .prop("billing_period", Schema.ShortString)
  .prop("fiscal_year", Schema.ShortString)
  .prop("invoice_number", Schema.ShortString)
  .prop("invoice_total", Schema.Money)
  .prop("is_gl", S.boolean())
  .prop("notes", S.string());

const getAll = {
  params: Schema.IdParam,
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  //response: getResponse(responseSingleBody),
};

module.exports = {
  getAll,
  getOne,
};
