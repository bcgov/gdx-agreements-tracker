const { Schema, getResponse, getAddResponse, getUpdateResponse } = require("./common_schema.js");
const S = require("fluent-json-schema");

const multiBody = S.object()
  .prop("id", Schema.Id)
  .prop("supplier_number", Schema.Id)
  .prop("signing_authority_name", Schema.ShortString)
  .prop("financial_contact_name", Schema.ShortString)
  .prop("province", Schema.ShortString);

const singleBody = S.object()
  .prop("id", Schema.Id)
  .prop("address", Schema.ShortString)
  .prop("city", Schema.ShortString)
  .prop("country", Schema.ShortString)
  .prop("fax", Schema.Phone)
  .prop("email", Schema.Email)
  .prop("financial_contact_email", Schema.Email)
  .prop("financial_contact_name", Schema.ShortString)
  .prop("financial_contact_phone", Schema.Phone)
  .prop("phone", Schema.Phone)
  .prop("postal_code", Schema.ShortString)
  .prop("province", Schema.ShortString)
  .prop("signing_authority_name", Schema.ShortString)
  .prop("signing_authority_title", Schema.ShortString)
  .prop("site_number", Schema.ShortString)
  .prop("supplier_legal_name", Schema.ShortString)
  .prop("supplier_name", Schema.ShortString)
  .prop("supplier_number", Schema.Id)
  .prop("website", Schema.Uri);

const getAll = {
  response: getResponse(S.array().items(multiBody)),
};

const getOne = {
  params: Schema.IdParam,
  response: getResponse(S.array().items(singleBody)),
};

const updateOne = {
  params: Schema.IdParam,
  body: singleBody.without(["id"]).minProperties(1),
  response: getUpdateResponse(),
};

const addOne = {
  body: singleBody.without(["id"]).minProperties(1),
  response: getAddResponse(),
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
