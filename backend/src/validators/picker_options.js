const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("name", Schema.ShortString)
  .prop("title", Schema.ShortString)
  .prop("description", S.string())
  .prop("associated_form", Schema.ShortString)
  .prop("definition", S.anyOf([S.array().items(Schema.Picker)]));

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("id", Schema.Id)),
};

module.exports = {
  getAll,
  getOne,
};
