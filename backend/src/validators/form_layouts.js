const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("associated_table", Schema.ShortString)
  .prop("title", Schema.ShortString)
  .prop("associated_table", Schema.ShortString)
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
