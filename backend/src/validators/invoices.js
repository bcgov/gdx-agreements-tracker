const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("received_date", Schema.RequiredDate)
  .prop("invoice_date", Schema.Date)
  .prop("due_date", Schema.Date)
  .prop("billing_period", Schema.ShortString)
  .prop("fiscal", Schema.ShortString)
  .prop("invoice_total", Schema.Money)
  .prop("invoice_number", Schema.ShortString)
  .prop("invoice_total", Schema.Money)
  .prop("is_gl", S.boolean())
  .prop("notes", S.string());

const singleBody = body.without(["fiscal", "invoice_total"]).prop("fiscal", Schema.Picker);

const getAll = {
  params: Schema.IdParam,
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(singleBody),
};

const updateOne = {
  params: Schema.IdParam,
  body: body.without(["id", "fiscal", "invoice_total"]).prop("fiscal", Schema.Id),
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: body.without(["id", "fiscal", "invoice_total"]).prop("fiscal", Schema.Id),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
