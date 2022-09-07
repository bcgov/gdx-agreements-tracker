const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const multiBody = S.array().items(
  S.object()
    .prop("id", Schema.Id)
    .prop("last_name", Schema.ShortString)
    .prop("first_name", Schema.ShortString)
    .prop("contact_title", Schema.ShortString)
    .prop("ministry_short_name", Schema.ShortString)
);

const baseSingleBody = S.object()
  .prop("id", Schema.Id)
  .prop("last_name", Schema.ShortString.minLength(1))
  .prop("first_name", Schema.ShortString.minLength(1))
  .prop("email", Schema.Email)
  .prop("contact_phone", Schema.Phone)
  .prop("contact_title", Schema.ShortString)
  .prop("business_area_id", Schema.Id)
  .prop("address", Schema.ShortString)
  .prop("city", Schema.ShortString)
  .prop("province", Schema.ShortString)
  .prop("postal", Schema.ShortString)
  .prop("country", Schema.ShortString)
  .prop("website", Schema.Uri)
  .prop("mobile", Schema.Phone)
  .prop("fax", Schema.Phone)
  .prop("notes", S.string());

const requestSingleBody = baseSingleBody.prop("ministry_id", Schema.Id);
const responseSingleBody = baseSingleBody.prop("ministry_id", Schema.Picker);

const getAll = {
  response: getResponse(multiBody),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(responseSingleBody),
};

const updateOne = {
  params: Schema.IdParam,
  body: requestSingleBody.minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  body: requestSingleBody.required(["first_name", "last_name"]),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
