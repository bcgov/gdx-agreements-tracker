const S = require("fluent-json-schema");
const getReport = {
  params: S.object().prop("type", S.string()),
  query: S.object()
    .prop("templateType", S.string())
    .prop("date", S.string())
    .prop("category", S.string())
    .prop("type", S.anyOf([S.string(), S.null()]))
    .prop("exportType", S.string())
    .prop("fiscal", S.number())
    .prop("portfolio", S.anyOf([S.number(), S.array()]))
    .required(["templateType", "category", "exportType"]),
  headers: S.object().prop("Authorization", S.string().minLength(1500)).required(["Authorization"]),
  response: {
    "2xx": S.object(),
  },
};

module.exports = {
  getReport,
};
