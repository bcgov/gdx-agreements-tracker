const {
  Schema,
  getResponse,
  getUpdateResponse,
  getAddResponse,
  getDeleteResponse,
} = require("./common_schema.js");
const S = require("fluent-json-schema");

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("program_area", S.string())
        .prop("service_line", S.string())
        .prop("client", S.string())
        .prop("financial_contact", S.string())
        .prop("expense_authority_name", S.string())
        .prop("stob", S.string())
        .prop("responsibility_centre", S.string())
        .prop("project_code", S.string())
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
      .prop("service_line", S.string())
      .prop("client", S.string())
      .prop("contact_id", Schema.Picker)
      .prop("expense_authority_name", S.string())
      .prop("stob", S.string())
      .prop("responsibility_centre", S.string())
      .prop("project_code", S.string())
      .prop("client_amount", S.number())
  ),
};

const addUpdateBody = S.object()
  .prop("program_area", Schema.ShortString)
  .prop("service_line", Schema.ShortString)
  .prop("client", Schema.ShortString)
  .prop("contact_id", Schema.Id)
  .prop("expense_authority_name", Schema.ShortString)
  .prop("stob", Schema.ShortString)
  .prop("responsibility_centre", Schema.ShortString)
  .prop("project_code", Schema.ShortString)
  .prop("client_amount", Schema.Money);

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
