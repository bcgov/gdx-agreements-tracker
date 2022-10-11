const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("name", S.string())
        .prop("email", S.string())
        .prop("user_role", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("name", S.string())
      .prop("email", S.string())
      .prop("role_id", Schema.Picker)
  ),
};

const addUpdateBody = S.object()
  .prop("name", Schema.ShortString)
  .prop("email", Schema.RequiredEmail)
  .prop("role_id", Schema.Id);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  headers: S.object().prop("Authorization", S.string()),
  body: addUpdateBody.required(["email", "name", "role_id"]),
  response: getAddResponse(),
};

const getByEmail = {
  headers: S.object().prop("Authorization", S.string()),
  body: S.object().prop("email", S.string()).required(["email"]),
  response: getAddResponse(),
};

const deleteOne = getOne;

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  deleteOne,
  getByEmail,
};
