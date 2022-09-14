const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const baseBody = S.object()
  .prop("id", Schema.Id)
  .prop("name", Schema.ShortString)
  .prop("email", Schema.RequiredEmail)
  .prop("role_id", Schema.Id);

const getAll = {
  response: getResponse(
    S.array().items(baseBody.without(["role_id"]).prop("display_name", Schema.ShortString))
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(baseBody.prop("role_id", Schema.Picker)),
};

const updateOne = {
  params: Schema.IdParam,
  body: baseBody.without(["id"]).minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  headers: S.object().prop("Authorization", S.string()),
  body: baseBody.without(["id"]).required(["email", "name", "role_id"]),
  response: getAddResponse(),
};


const getByEmail = {
  headers: S.object().prop("Authorization", S.string()),
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
    },
  },
  response: getAddResponse(),
};

const deleteOne = getOne;

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  deleteOne,
  getByEmail
};
