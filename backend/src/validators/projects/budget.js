const {
  Schema,
  getResponse,
  getUpdateResponse,
  getAddResponse,
  getDeleteResponse,
} = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("deliverable_name", S.string())
        .prop("recovery_area", S.anyOf([S.string(), S.null()]))
        .prop("detail_amount", S.string())
        .prop("q1_amount", S.string())
        .prop("q1_recovered", S.boolean())
        .prop("q2_amount", S.string())
        .prop("q2_recovered", S.boolean())
        .prop("q3_amount", S.string())
        .prop("q3_recovered", S.boolean())
        .prop("q4_amount", S.string())
        .prop("q4_recovered", S.boolean())
        .prop("total", S.string())
        .prop("resource_type", S.string())
        .prop("responsibility_centre", S.string())
        .prop("service_line", S.string())
        .prop("stob", S.string())
        .prop("fiscal_year", S.string())
        .prop("program_area", S.string())
        .prop("contract_id", S.anyOf([S.string(), S.null()]))
        .prop("notes", S.anyOf([S.string(), S.null()]))
    )
  ),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("q1_amount", S.string())
      .prop("q1_recovered", S.boolean())
      .prop("q2_amount", S.string())
      .prop("q2_recovered", S.boolean())
      .prop("q3_amount", S.string())
      .prop("q3_recovered", S.boolean())
      .prop("q4_amount", S.string())
      .prop("q4_recovered", S.boolean())
      .prop("fiscal_year", Schema.Picker)
      .prop("service_line", S.string())
      .prop("notes", S.anyOf([S.string(), S.null()]))
      .prop(
        "project_deliverable_id",
        S.object()
          .prop("deliverable_name", S.string())
          .prop("deliverable_id", S.number())
          .prop("value", S.number())
      )
      .prop("detail_amount", S.string())
      .prop("recovery_area", Schema.Picker)
      .prop("resource_type", Schema.Picker)
      .prop("stob", S.string())
      .prop("program_area", Schema.Picker)
      .prop("contract_id", Schema.Picker)
      .prop("responsibility_centre", S.string())
      .prop("total", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("id", S.number())
  .prop("contract_id", S.anyOf([S.number(), S.null()]))
  .prop("deliverable_name", S.anyOf([S.number(), S.null()]))
  .prop("detail_amount", S.string())
  .prop("fiscal_year", S.anyOf([S.number(), S.null()]))
  .prop("q1_amount", S.string())
  .prop("q1_recovered", S.boolean())
  .prop("q2_amount", S.string())
  .prop("q2_recovered", S.boolean())
  .prop("q3_amount", S.string())
  .prop("q3_recovered", S.boolean())
  .prop("q4_amount", S.string())
  .prop("q4_recovered", S.boolean())
  .prop("service_line", S.string())
  .prop("notes", S.anyOf([S.string(), S.null()]))
  .prop("project_deliverable_id", S.anyOf([S.number(), S.null()]))
  .prop("detail_amount", S.string())
  .prop("recovery_area", S.anyOf([S.number(), S.null()]))
  .prop("resource_type", S.anyOf([S.number(), S.null()]))
  .prop("recovery_area", S.string())
  .prop("stob", S.string())
  .prop("program_area", S.anyOf([S.number(), S.null()]))
  .prop("responsibility_centre", S.string())
  .prop("service_line", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

const fiscalBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("fiscal_year", S.string())
        .prop("total_detail_amount", S.string())
        .prop("recovered_amount", S.string())
        .prop("balance_remaining", S.string())
        .prop("q1_amount", S.string())
        .prop("q2_amount", S.string())
        .prop("q3_amount", S.string())
        .prop("q4_amount", S.string())
        .prop("id", S.string())
    )
  ),
};

const portfolioBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("portfolio_name", S.string())
        .prop("recovery_amount", S.string())
        .prop("recovered_to_date", S.string())
        .prop("balance_remaining", S.string())
        .prop("id", S.string())
    )
  ),
};

const deliverablesBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("deliverable_name", S.string())
        .prop("recovery_amount", S.string())
        .prop("recovered_to_date", S.string())
        .prop("balance_remaining", S.string())
        .prop("id", S.string())
    )
  ),
};

const recoverablesBreakdown = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("total_project_budget", S.string())
        .prop("total_recoverable_amount", S.string())
    )
  ),
};

const deleteOne = {
  params: Schema.IdParam,
  response: getDeleteResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  fiscalBreakdown,
  portfolioBreakdown,
  deliverablesBreakdown,
  recoverablesBreakdown,
  deleteOne,
};
