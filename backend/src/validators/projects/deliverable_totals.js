const { Schema, getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAllByFiscal = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("fiscal_year", S.string())
        .prop("deliverable", S.string())
        .prop("recoverable", S.string())
        .prop("id", Schema.Id)
    )
  ),
};

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("deliverable_total", S.string())
        .prop("recoverable_total", S.string())
        .prop("non_recoverable_amount", S.string())
    )
  ),
};

module.exports = {
  getAllByFiscal,
  getAll,
};
