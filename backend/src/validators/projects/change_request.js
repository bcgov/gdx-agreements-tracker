const { Schema, getResponse, getUpdateResponse, getAddResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getAll = {
  params: S.object().prop("projectId", Schema.Id),
  response: getResponse(
    S.array().items(
      S.object()
        .prop("id", S.number())
        .prop("init_date", S.string())
        .prop("initiated_by", S.string())
        .prop("link_id", S.number())
        .prop("summary", S.string())
        .prop("types", S.anyOf([S.string(), S.null()]))
        .prop("version", S.string())
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
      .prop(
        "types",
        S.anyOf([
          S.array().items(
            S.object()
              .prop("crtype_name", S.string())
              .prop("inactive", S.boolean())
              .prop("value", S.number())
          ),
          S.array(),
        ])
      )
  ),
};

const addUpdateBody = S.object()
  .prop("version", S.string())
  .prop("initiation_date", Schema.Date)
  .prop("cr_contact", Schema.ShortString)
  .prop("initiated_by", Schema.ShortString)
  .prop("fiscal_year", Schema.ShortString)
  .prop("summary", S.string())
  .prop("approval_date", Schema.Date)
  .prop(
    "types",
    S.array().items(
      S.object()
        .prop("crtype_name", S.string())
        .prop("inactive", S.boolean())
        .prop("value", S.number())
    )
  );

const updateOne = {
  params: Schema.IdParam,
  body: addUpdateBody,
  response: getUpdateResponse(),
};

const addOne = {
  body: addUpdateBody,
  response: getAddResponse(),
};

const getNextCRVersion = S.object().prop("cr_version", S.string());

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
  getNextCRVersion,
};
