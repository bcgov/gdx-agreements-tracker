const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", S.number())
  .prop("associated_table", S.string())
  .prop("title", S.string())
  .prop("associated_table", S.string())
  .prop("definition", S.string());

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(body),
};

module.exports = {
  getAll,
  getOne,
};
