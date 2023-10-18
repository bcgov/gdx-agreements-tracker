const {
  Schema,
  getResponse,
  getAddResponse,
  getUpdateResponse,
  getDeleteResponse,
} = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("fiscal", S.string())
        .prop("resource", S.string())
        .prop("assignment_role", S.string())
        .prop("supplier_rate", S.string())
        .prop("assignment_rate", S.number())
        .prop("hours", S.number())
        .prop("fees_for_resource", S.number())
        .prop("start_date", S.string())
        .prop("end_date", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("fiscal", Schema.Picker)
      .prop("resource_id", Schema.Picker)
      .prop("assignment_role", S.string())
      .prop("assignment_rate", S.number())
      .prop("supplier_rate_id", Schema.Picker)
      .prop("assignment_rate", S.string())
      .prop("hours", S.number())
      .prop("fees_for_resource", S.string())
      .prop("start_date", S.string())
      .prop("end_date", S.string())
  ),
};

const addUpdateBody = S.object()
  .prop("fiscal", Schema.Id)
  .prop("resource_id", Schema.Id)
  .prop("supplier_rate_id", Schema.Id)
  .prop("assignment_rate", Schema.Money)
  .prop("hours", S.number())
  .prop("start_date", Schema.Date)
  .prop("end_date", Schema.Date);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: addUpdateBody.required(["resource_id", "supplier_rate_id", "assignment_rate", "fiscal"]),
  response: getAddResponse(),
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
  deleteOne,
};
