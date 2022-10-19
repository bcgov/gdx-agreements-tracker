const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("deliverable_name", S.string())
        .prop("type", S.string())
        .prop("amount", S.number())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("contract_deliverable_id", Schema.Picker)
      .prop("unit_amount", S.number())
      .prop("rate", S.number())
      .prop("amount_remaining", S.number())
      .prop("fiscal_year", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("contract_deliverable_id", Schema.Id)
  .prop("unit_amount", S.number())
  .prop("rate", Schema.Money);

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
