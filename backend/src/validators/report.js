const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("projectId", Schema.Id)),
};

module.exports = {
  getOne,
};
