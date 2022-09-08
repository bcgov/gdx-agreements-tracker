const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
  .prop("id", Schema.Id)
  .prop("ministry_name", Schema.ShortString.minLength(1))
  .prop("ministry_short_name", Schema.ShortString.minLength(1))
  .prop("is_active", Schema.ShortString);

const singleBody = body.without(["is_active"]).prop("is_active", S.boolean());

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(singleBody),
};

const updateOne = {
  params: Schema.IdParam,
  body: singleBody.minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  body: singleBody.required(["ministry_name", "ministry_short_name"]),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
