const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getResources = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("resource_name", S.string())
        .prop("hours", S.number())
        .prop("rate", S.number())
        .prop("amount", S.number())
    )
  ),
};

const getDeliverables = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("deliverable_name", S.string())
        .prop("rate", S.number())
    )
  ),
};

const getOneResource = {
  params: Schema.IdParam,
};

module.exports = {
  getResources,
  getOneResource,
  getDeliverables,
};
