const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const baseBody = S.object()
  .prop("id", Schema.Id)
  .prop("version", Schema.ShortString)
  .prop("initiation_date", Schema.Date)
  .prop("cr_contact", Schema.ShortString)
  .prop("initiated_by", Schema.ShortString)
  .prop("fiscal_year", Schema.ShortString)
  .prop("summary", S.string())
  .prop("approval_date", Schema.Date)
  .prop("link_id", Schema.Id);

const requestBody = baseBody
  .minProperties(1)
  .without(["id", "link_id", "version", "fiscal_year", "initiated_by"])
  .prop("fiscal_year", Schema.Id)
  .prop("initiated_by", Schema.Enum(["GDX", "Client", null]));

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(S.array().items(baseBody)),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      baseBody
        .without(["initiated_by", "fiscal_year"])
        .prop("initiated_by", Schema.Picker)
        .prop("fiscal_year", Schema.Picker)
    )
  ),
};

const updateOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  body: requestBody,
  response: getUpdateResponse(),
};

const addOne = {
  params: S.object().prop("projectId", Schema.Id),
  body: requestBody,
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
