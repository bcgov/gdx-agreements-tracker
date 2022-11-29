const { Schema, getResponse, getUpdateResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("contractId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("role_id", S.number())
        .prop("role_type", S.string())
        .prop("contacts", S.array().items(Schema.Picker))
    )
  ),
};

const updateOne = {
  params: Schema.IdParam,
  body: S.object().prop(
    "contacts",
    S.array(
      S.object()
        .prop("contact_id", Schema.Id)
        .prop("project_id", Schema.Id)
        .prop("contact_role", Schema.Id)
    )
  ),
  response: getUpdateResponse(),
};

module.exports = {
  getAll,
  updateOne,
};
