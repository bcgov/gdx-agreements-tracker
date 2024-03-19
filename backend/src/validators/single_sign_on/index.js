const { getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("role", S.string())
        .prop("firstName", S.string())
        .prop("lastName", S.string())
        .prop("email", S.string())
    )
  ),
};

const getOne = {
  response: getResponse(
    S.object().prop(
      "user",
      S.object()
        .prop("role", S.array().items(S.string()))
        .prop("firstName", S.string())
        .prop("lastName", S.string())
        .prop("email", S.string())
    )
  ),
};

module.exports = {
  getAll,
  getOne,
};
