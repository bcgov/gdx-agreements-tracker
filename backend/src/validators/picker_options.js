const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("name", S.string())
        .prop("title", S.string())
        .prop("description", S.string())
        .prop("associated_form", S.string())
        .prop("definition", S.array().items(Schema.Picker))
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("id", Schema.Id)),
};

module.exports = {
  getAll,
  getOne,
};
