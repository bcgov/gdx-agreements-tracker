const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const multiBody = S.object()
  .prop("id", Schema.Id)
  .prop("co_version", Schema.ShortString)
  .prop("description", S.string())
  .prop("supplier_name", Schema.ShortString)
  .prop("start_date", Schema.Date)
  .prop("end_date", Schema.Date)
  .prop("total_expense_amount", Schema.Money)
  .prop("status", Schema.ShortString)
  .prop("fiscal_year", Schema.ShortString)
  .prop("project_number", Schema.ShortString)
  .prop("portfolio_name", Schema.ShortString);

const singleBody = S.object()
  .prop("co_number", Schema.ShortString)
  .prop("contract_number", Schema.ShortString)
  .prop("status", Schema.Picker)
  .prop("amendment_number", Schema.ShortString)
  .prop("fiscal", Schema.Picker)
  .prop("project_id", Schema.Picker)
  .prop("project_name", Schema.ShortString)
  .prop("contract_type", Schema.Picker)
  .prop("supplier_id", Schema.Picker)
  .prop("total_project_budget", Schema.Money)
  .prop("subcontractor_id", S.array().items(Schema.Picker))
  .prop("total_fee_amount", Schema.Money)
  .prop("total_expense_amount", Schema.Money)
  .prop("requisition_number", Schema.ShortString)
  .prop("start_date", Schema.Date)
  .prop("procurement_method_id", Schema.Picker)
  .prop("end_date", Schema.Date)
  .prop("description", S.string())
  .prop("notes", S.string());

const requestBody = singleBody
  .without([
    "status",
    "fiscal",
    "project_id",
    "contract_type",
    "supplier_id",
    "procurement_method_id",
  ])
  .prop("status", Schema.ShortString)
  .prop("fiscal", Schema.Id)
  .prop("project_id", Schema.Id)
  .prop("contract_type", Schema.ShortString)
  .prop("supplier_id", Schema.Id)
  .prop("procurement_method_id", S.oneOf([Schema.Id, S.const("")]));

const getAll = {
  response: getResponse(S.array().items(multiBody)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(singleBody),
};

const updateOne = {
  params: Schema.IdParam,
  body: requestBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: requestBody.required([
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
