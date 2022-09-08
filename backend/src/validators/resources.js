const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const multiBody = S.object()
  .prop("id", Schema.Id)
  .prop("Last Name", Schema.ShortString)
  .prop("First Name", Schema.ShortString)
  .prop("Supplier", Schema.ShortString)
  .prop("Subcontractor", Schema.ShortString)
  .prop("created_date", Schema.ShortString);

const singleBody = S.object()
  .prop("id", Schema.Id)
  .prop("created_date", Schema.Date)
  .prop("created_date_formatted", Schema.ShortString)
  .prop("resource_first_name", Schema.ShortString)
  .prop("resource_last_name", Schema.ShortString)
  .prop("subcontractor_id", Schema.Picker)
  .prop("supplier_id", Schema.Picker);

const requestBody = singleBody
  .without(["created_date_formatted", "subcontractor_id", "supplier_id"])
  .minProperties(1)
  .prop("subcontractor_id", Schema.Id)
  .prop("supplier_id", Schema.Id);

const getAll = {
  response: getResponse(S.array().items(multiBody)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(singleBody),
};

const updateOne = {
  body: requestBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: requestBody,
  response: getAddResponse(),
};

const deleteOne = getOne;

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  deleteOne,
};
