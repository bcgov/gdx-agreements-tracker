const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getOne = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(S.object().prop("projectId", Schema.Id)),
};

module.exports = {
  getOne,
};
