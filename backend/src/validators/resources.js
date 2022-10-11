const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("last_name", S.string())
        .prop("first_name", S.string())
        .prop("supplier", S.string())
        .prop("subcontractor", S.string())
        .prop("created_date", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("created_date", S.string())
      .prop("created_date_formatted", S.string())
      .prop("resource_first_name", S.string())
      .prop("resource_last_name", S.string())
      .prop("subcontractor_id", Schema.Picker)
      .prop("supplier_id", Schema.Picker)
  ),
};

const addUpdateBody = S.object()
  .prop("created_date", Schema.Date)
  .prop("created_date_formatted", Schema.ShortString)
  .prop("resource_first_name", Schema.ShortString)
  .prop("resource_last_name", Schema.ShortString)
  .prop("subcontractor_id", Schema.Id)
  .prop("supplier_id", Schema.Id);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
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
