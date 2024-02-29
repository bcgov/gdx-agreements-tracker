const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("resource_assignment", Schema.Money)
        .prop("hours", S.number())
        .prop("rate", Schema.Money)
        .prop("amount", Schema.Money)
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("contract_resource_id", Schema.Picker)
      .prop("unit_amount", S.number())
      .prop("rate", Schema.Money)
      .prop("amount_remaining", Schema.Money)
      .prop("fiscal_year", S.string())
      .prop("amount", Schema.Money)
  ),
};

const addUpdateBody = S.object()
  .prop("contract_resource_id", Schema.Id)
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
