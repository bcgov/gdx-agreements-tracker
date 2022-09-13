const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const multiBody = S.object()
  .prop("id", Schema.Id)
  .prop("contract", Schema.ShortString)
  .prop("amendment_type", Schema.ShortString)
  .prop("amendment_date", Schema.ShortString)
  .prop("description", S.string());

const singleResponseBody = multiBody
  .without(["contract", "amendment_date"])
  .prop("amendment_date", Schema.Date)
  .prop("contract_id", Schema.Picker)
  .prop("amendment_number", Schema.Picker);

const requestBody = multiBody
  .without(["contract", "amendment_date"])
  .prop("amendment_date", Schema.Date)
  .prop("contract_id", Schema.Id)
  .prop("amendment_number", Schema.Id);

const getAll = {
  params: S.object().prop("contractId", Schema.Id),
  response: getResponse(S.array().items(multiBody)),
};

const getOne = {
  params: Schema.IdParam.prop("amendmentId", Schema.Id),
  response: getResponse(singleResponseBody),
};

const updateOne = {
  params: Schema.IdParam,
  body: requestBody.minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  body: requestBody.required(["contract_id", "amendment_number", "amendment_date"]),
  response: getAddResponse(),
};

module.exports = {
  getOne,
  getAll,
  updateOne,
  addOne,
};
