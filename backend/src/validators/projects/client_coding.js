const {
  Schema,
  getResponse,
  getUpdateResponse,
  getAddResponse,
  getDeleteResponse,
} = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("program_area", S.string())
        .prop("client", S.string())
        .prop("responsibility_centre", S.string())
        .prop("service_line", S.string())
        .prop("stob", S.string())
        .prop("project_code", S.string())
        .prop("contact_id", S.string())
        .prop("expense_authority_name", S.string())
        .prop("client_amount", S.string())
    )
  ),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("program_area", S.string())
      .prop("client", S.string())
      .prop("responsibility_centre", S.string())
      .prop("service_line", S.string())
      .prop("stob", S.string())
      .prop("project_code", S.string())
      .prop("contact_id", Schema.Picker)
      .prop("expense_authority_name", S.string())
      .prop("client_amount", S.string())
      .prop("project_id", Schema.Id)
  ),
};

const addUpdateBody = S.object()
  .prop("id", S.number())
  .prop("program_area", S.string())
  .prop("client", S.string())
  .prop("responsibility_centre", S.string())
  .prop("service_line", S.string())
  .prop("stob", S.string())
  .prop("project_code", S.string())
  .prop("contact_id", S.string())
  .prop("expense_authority_name", S.string())
  .prop("client_amount", S.string())
  .prop("project_id", Schema.Id);

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
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
