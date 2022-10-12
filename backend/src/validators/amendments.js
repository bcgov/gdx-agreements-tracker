const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("contractId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("contract", S.string())
        .prop("amendment_date", S.string())
        .prop("amendment_type", S.string())
        .prop("description", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam.prop("amendmentId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("amendment_number", Schema.Picker)
      .prop("amendment_date", S.string())
      .prop("description", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("amendment_number", Schema.Id)
  .prop("amendment_date", Schema.Date)
  .prop("description", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody.required(["contract_id", "amendment_number", "amendment_date"]),
  response: getAddResponse(),
};

module.exports = {
  getOne,
  getAll,
  updateOne,
  addOne,
};
