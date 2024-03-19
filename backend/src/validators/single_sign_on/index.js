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
    S.object()
      .prop("id", S.number())
      .prop("role", S.array())
      .prop("firstName", S.string())
      .prop("lastName", S.string())
      .prop("email", S.string())
  ),
};

module.exports = {
  getAll,
};
