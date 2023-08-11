const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("q1_amount", S.number())
        .prop("q1_recovered", S.boolean())
        .prop("q2_amount", S.number())
        .prop("q2_recovered", S.boolean())
        .prop("q3_amount", S.number())
        .prop("q3_recovered", S.boolean())
        .prop("q4_amount", S.number())
        .prop("q4_recovered", S.boolean())
        .prop("fiscal", S.string())
        .prop("notes", S.anyOf([S.string(), S.null()]))
        .prop("deliverable_name", S.string())
        .prop("detail_amount", S.number())
        .prop("recovery_type_name", S.anyOf([S.string(), S.null()]))
        .prop("resource_type", S.string())
        .prop("stob", S.string())
        .prop("program_area", S.string())
        .prop("client", S.string())
        .prop("co_number", S.anyOf([S.string(), S.null()]))
    )
  ),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("q1_amount", S.number())
      .prop("q1_recovered", S.boolean())
      .prop("q2_amount", S.number())
      .prop("q2_recovered", S.boolean())
      .prop("q3_amount", S.number())
      .prop("q3_recovered", S.boolean())
      .prop("q4_amount", S.number())
      .prop("q4_recovered", S.boolean())
      .prop("fiscal", Schema.Picker)
      .prop("notes", S.anyOf([S.string(), S.null()]))
      .prop("project_deliverable_id", Schema.Picker)
      .prop("detail_amount", S.number())
      .prop("recovery_area", Schema.Picker)
      .prop("resource_type", Schema.Picker)
      .prop("stob", S.string())
      .prop("client_coding_id", Schema.Picker)
      .prop("contract_id", Schema.Picker)
      .prop("project_id", Schema.Id)
  ),
};

const addUpdateBody = S.object()
  .prop("q1_amount", Schema.Money)
  .prop("q1_recovered", S.boolean())
  .prop("q2_amount", Schema.Money)
  .prop("q2_recovered", S.boolean())
  .prop("q3_amount", Schema.Money)
  .prop("q3_recovered", S.boolean())
  .prop("q4_amount", Schema.Money)
  .prop("q4_recovered", S.boolean())
  .prop("fiscal", S.number())
  .prop("project_deliverable_id", Schema.Id)
  .prop("notes", S.anyOf([S.string(), S.null()]))
  .prop("detail_amount", Schema.Money)
  .prop("resource_type", S.string())
  .prop("stob", S.string())
  .prop("client_coding_id", Schema.Id)
  .prop("co_number", Schema.Id);

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
      S.object().prop("total_project_budget", S.string()).prop("total_recovered_amount", S.string())
    )
  ),
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
};
