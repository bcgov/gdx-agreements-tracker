const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("contractId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("amendment_types", S.array())
        .prop("amendment_date", S.string())
        .prop("amendment_number", S.number())
        .prop("description", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam.prop("amendmentId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop(
        "amendment_types",
        S.array().items(S.object().prop("label", S.string()).prop("value", S.number()))
      )
      .prop("amendment_date", S.string())
      .prop("amendment_number", S.number())
      .prop("description", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop(
    "amendment_types",
    S.array().items(S.object().prop("label", S.string()).prop("value", S.number()))
  )
  .prop("amendment_date", Schema.Date)
  .prop("description", S.string());

const addPostBody = S.object()
  .prop(
    "amendment_types",
    S.array().items(S.object().prop("label", S.string()).prop("value", S.number()))
  )
  .prop("amendment_date", Schema.Date)
  .prop("description", S.string())
  .prop("contract_id", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addPostBody,
  response: getAddResponse(),
};

module.exports = {
  getOne,
  getAll,
  updateOne,
  addOne,
};
