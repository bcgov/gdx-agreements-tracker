const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const resource = S.object()
  .prop("id", Schema.Id)
  .prop("resource_name", Schema.ShortString)
  .prop("hours", S.number())
  .prop("rate", Schema.Money)
  .prop("amount", Schema.Money);

const getResources = {
  params: Schema.IdParam,
  response: getResponse(S.array().items(resource)),
};

const deliverable = S.object()
  .prop("id", Schema.Id)
  .prop("deliverable_name", Schema.ShortString)
  .prop("rate", Schema.Money);

const getDeliverables = {
  params: Schema.IdParam,
  response: getResponse(S.array().items(deliverable)),
};

const getOneResource = {
  params: Schema.IdParam,
};

module.exports = {
  getResources,
  getOneResource,
  getDeliverables,
};
