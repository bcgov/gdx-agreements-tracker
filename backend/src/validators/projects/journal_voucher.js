const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("fiscal", S.string())
        .prop("quarter", S.number())
        .prop("jv_number", S.string())
        .prop("billed_date", S.string())
        .prop("amount", S.string())
        .prop("financial_contact", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("jv_number", S.string())
      .prop("billed_date", S.string())
      .prop("amount", S.string())
      .prop("fiscal_year_id", Schema.Picker)
      .prop("quarter", S.number())
      .prop("client_coding_id", Schema.Picker)
  ),
};

const addUpdateBody = S.object()
  .prop("id", Schema.Id)
  .prop("jv_number", Schema.ShortString.minLength(1))
  .prop("billed_date", Schema.ShortString.minLength(1))
  .prop("amount", Schema.Float)
  .prop("quarter", Schema.Id)
  .prop("fiscal_year_id", Schema.Id)
  .prop("client_coding_id", Schema.Id);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody.required([
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
