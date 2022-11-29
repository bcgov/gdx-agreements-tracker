const { Schema, getResponse } = require("../common_schema");
const S = require("fluent-json-schema");

const getOne = {
  params: Schema.IdParam.prop("lessonsLearnedId", Schema.Id),
  response: getResponse(
    S.object()
      .prop("lesson_category_id", Schema.Picker)
      .prop("lesson_sub_category", S.string())
      .prop("lesson", S.string())
      .prop("recommendations", S.string())
      .prop("id", S.number())
  ),
};

const getAll = {
  params: Schema.IdParam,
  response: getResponse(
    S.array().items(
      S.object()
        .prop("category", S.string())
        .prop("subcategory", S.string())
        .prop("lesson", S.string())
        .prop("recommendations", S.string())
        .prop("id", Schema.Id)
    )
  ),
};

module.exports = {
  getOne,
  getAll,
};
