const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");


const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("version", S.string())
        .prop("init_date", S.string())
        .prop("types", S.string())
        .prop("summary", S.string())

    )
  ),
};

const getOne = {
  params: S.object().prop("changeRequestId", Schema.Id).prop("projectId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("id", S.number())
      .prop("version", S.string())
      .prop("initiation_date", S.string())
      .prop("cr_contact", S.string())
      .prop("initiated_by", Schema.Picker)
      .prop("fiscal_year", Schema.Picker)
      .prop("summary", S.string())
      .prop("approval_date", S.string())
      .prop("link_id", S.number())
  ),
};

const addUpdateBody = S.object()
  .prop("initiation_date", Schema.Date)
  .prop("cr_contact", Schema.ShortString)
  .prop("initiated_by", Schema.ShortString)
  .prop("fiscal_year", Schema.ShortString)
  .prop("summary", S.string())
  .prop("approval_date", Schema.Date)
  .prop("fiscal_year", Schema.Id)
  .prop("initiated_by", Schema.Enum(["GDX", "Client", null]));

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
