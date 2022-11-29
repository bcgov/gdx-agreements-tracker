const { Schema, getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const response = S.array().items(
  S.object()
    .prop("id", S.number())
    .prop("name", S.string())
    .prop("title", S.string())
    .prop("description", S.string())
    .prop("associated_form", S.string())
    .prop("definition", S.array().items(Schema.Picker))
);

const getAll = {
  response: getResponse(response),
};

const getAllById = {
  params: Schema.IdParam,
  response: getResponse(response),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("id", Schema.Id)),
};

module.exports = {
  getAll,
  getAllById,
  getOne,
};
