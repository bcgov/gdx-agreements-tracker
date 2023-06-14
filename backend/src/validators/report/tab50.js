const { Schema, getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.object().prop("projectId", S.number())),
};

const getAll = {
  params: S.object().prop("fiscal", S.string()),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("date", S.string())
        .prop("fiscal", S.string())
        .prop(
          "report",
          S.array().items(
            S.object()
              .prop("portfolio_name", S.string())
              .prop("total_recoveries", S.string())
              .prop("less_all_project_expenses", S.string())
              .prop("net_recoveries", S.string())
              .prop("q1_gross", S.string())
              .prop("q1_net", S.string())
              .prop("q2_gross", S.string())
              .prop("q2_net", S.string())
              .prop("q3_gross", S.string())
              .prop("q3_net", S.string())
              .prop("q4_gross", S.string())
              .prop("q4_net", S.string())
              .prop("fiscal", S.number())
          )
        )
        .prop(
          "report_totals",
          S.array().items(
            S.object()
              .prop("totals_recoveries", S.string())
              .prop("totals_less_all_project_expenses", S.string())
              .prop("totals_net_recoveries", S.string())
              .prop("totals_q1_gross", S.string())
              .prop("totals_q1_net", S.string())
              .prop("totals_q2_gross", S.string())
              .prop("totals_q2_net", S.string())
              .prop("totals_q3_gross", S.string())
              .prop("totals_q3_net", S.string())
              .prop("totals_q4_gross", S.string())
              .prop("totals_q4_net", S.string())
              .prop("fiscal", S.number())
          )
        )
    )
  ),
};

module.exports = {
  getOne,
  getAll,
};
