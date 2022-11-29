const { Schema, getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("projectId", S.number())),
};

module.exports = {
  getOne,
};
