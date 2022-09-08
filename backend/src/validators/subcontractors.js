const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object().prop("id", Schema.Id).prop("subcontractor_name", Schema.ShortString);

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(body),
};

const updateOne = {
  params: Schema.IdParam,
  body: body.without(["id"]).minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  body: body.without(["id"]).required(["subcontractor_name"]),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
