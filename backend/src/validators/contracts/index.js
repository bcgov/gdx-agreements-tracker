const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("contract_number", S.string())
        .prop("co_number", S.string().minLength(1))
        .prop("description", S.string())
        .prop("supplier", S.string())
        .prop("start_date", S.string())
        .prop("end_date", S.string())
        .prop("max_amount", S.string())
        .prop("remaining_amount", S.string())
        .prop("status", S.string())
        .prop("fiscal", S.string())
        .prop("project_number", S.string())
        .prop("portfolio", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("max_amount", S.string())
      .prop("co_number", S.string().minLength(1))
      .prop("contract_number", S.string())
      .prop("status", Schema.Picker)
      .prop("fiscal", Schema.Picker)
      .prop(
        "project_id",
        S.object()
          .prop("project_number", S.string())
          .prop("project_name", S.string())
          .prop("project_status", S.string())
          .prop("value", S.number())
      )
      .prop("project_name", S.string())
      .prop("contract_type", Schema.Picker)
      .prop("supplier_id", Schema.Picker)
      .prop("total_project_budget", S.string())
      .prop("subcontractor_id", S.array().items(Schema.Picker))
      .prop("total_fee_amount", S.string())
      .prop("total_expense_amount", S.string())
      .prop("requisition_number", S.string())
      .prop("start_date", S.string())
      .prop("procurement_method_id", Schema.Picker)
      .prop("end_date", S.string())
      .prop("description", S.string())
      .prop("notes", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("co_number", Schema.ShortString.minLength(1))
  .prop("contract_number", Schema.ShortString)
  .prop("status", Schema.ShortString.minLength(1))
  .prop("amendment_number", Schema.ShortString)
  .prop("fiscal", Schema.Id)
  .prop("project_id", Schema.Id)
  .prop("project_name", Schema.ShortString)
  .prop("contract_type", Schema.ShortString.minLength(1))
  .prop("supplier_id", Schema.Id)
  .prop("total_project_budget", S.string())
  .prop("subcontractor_id", S.array().items(Schema.Picker))
  .prop("total_fee_amount", S.string())
  .prop("total_expense_amount", S.string())
  .prop("requisition_number", Schema.ShortString)
  .prop("start_date", Schema.RequiredDate)
  .prop("procurement_method_id", S.oneOf([Schema.Id, S.const("")]))
  .prop("end_date", Schema.RequiredDate)
  .prop("description", S.string())
  .prop("notes", S.string());

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody.required([
    "total_fee_amount",
    "total_expense_amount",
    "start_date",
    "end_date",
    "status",
    "fiscal",
    "contract_type",
    "supplier_id",
  ]),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
