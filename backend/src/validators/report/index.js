const S = require("fluent-json-schema");
const getReport = {
  params: S.object().prop("type", S.string().required(["type"])),
  query: S.object()
    .prop("templateType", S.string())
    .prop("date", S.string())
    .prop("category", S.string())
    .prop("type", S.string())
    .prop("exportType", S.string())
    .prop("fiscal", S.string())
    .required(["templateType", "category", "exportType"]),
  headers: S.object().prop("Authorization", S.string().minLength(1500)).required(["Authorization"]),
  response: {
    200: S.object(),
    400: S.object().prop("code", S.string()).prop("error", S.string()).prop("message", S.string()),
  },
};

module.exports = {
  getReport,
};
