const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("deliverable_name", S.string())
        .prop("type", S.string())
        .prop("amount", Schema.Money)
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("is_expense", S.boolean())
      .prop("contract_id", S.number())
      .prop("rate", Schema.Money)
      .prop("amount_remaining", Schema.Money)
      .prop("contract_deliverable_id", Schema.Picker)
      .prop("fiscal_year", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("contract_deliverable_id", Schema.Id)
  .prop("unit_amount", Schema.Money)
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
