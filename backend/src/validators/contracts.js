const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("contract_number", S.string())
        .prop("description", S.string())
        .prop("supplier", S.string())
        .prop("start_date", S.string())
        .prop("end_date", S.string())
        .prop("status", S.string())
        .prop("fiscal", S.string())
        .prop("project_number", S.string())
        .prop("project_name", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("co_number", S.string().minLength(1))
      .prop("contract_number", S.string())
      .prop("status", Schema.Picker)
      .prop("amendment_number", S.string())
      .prop("fiscal", Schema.Picker)
      .prop("project_id", Schema.Picker)
      .prop("project_name", S.string())
      .prop("contract_type", Schema.Picker)
      .prop("supplier_id", Schema.Picker)
      .prop("total_project_budget", S.string())
      .prop("subcontractor_id", S.array().items(Schema.Picker))
      .prop("total_fee_amount", S.number())
      .prop("total_expense_amount", S.number())
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
  .prop("total_project_budget", Schema.Money)
  .prop("subcontractor_id", S.array().items(Schema.Picker))
  .prop("total_fee_amount", Schema.Money)
  .prop("total_expense_amount", Schema.Money)
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
