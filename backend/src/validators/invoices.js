const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("received_date", S.string())
        .prop("invoice_date", S.string())
        .prop("due_date", S.string())
        .prop("billing_period", S.string())
        .prop("fiscal", S.string())
        .prop("invoice_total", S.number())
        .prop("invoice_number", S.string())
        .prop("invoice_total", S.number())
        .prop("is_gl", S.boolean())
        .prop("notes", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("received_date", S.string())
      .prop("invoice_date", S.string())
      .prop("due_date", S.string())
      .prop("billing_period", S.string())
      .prop("fiscal", Schema.Picker)
      .prop("invoice_number", S.string())
      .prop("invoice_total", S.number())
      .prop("is_gl", S.boolean())
      .prop("notes", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("received_date", Schema.RequiredDate)
  .prop("invoice_date", Schema.Date)
  .prop("due_date", Schema.Date)
  .prop("billing_period", Schema.ShortString)
  .prop("fiscal", Schema.Id)
  .prop("invoice_number", Schema.ShortString)
  .prop("invoice_total", Schema.Money)
  .prop("is_gl", S.boolean())
  .prop("notes", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
