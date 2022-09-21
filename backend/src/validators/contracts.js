const { Schema, getResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const body = S.object()
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

const getAll = {
  response: getResponse(S.array().items(body)),
};

const getOne = {
  params: Schema.IdParam,
  //response: getResponse(body),
};

module.exports = {
  getAll,
  getOne,
};
