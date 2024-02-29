const S = require("fluent-json-schema");

const Id = S.integer().minimum(0);

const MaxStringLength = 255;

/**
 * Collection of commonly used field validations.
 */
const Schema = {
  Money: S.string().pattern("^(\\$)?-?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$"),
  Date: S.oneOf([S.string().format(S.FORMATS.DATE), S.const("")]),
  RequiredDateTime: S.string().format(S.FORMATS.DATE_TIME).minLength(1),
  RequiredDate: S.string().format(S.FORMATS.DATE).minLength(1),
  Email: S.oneOf([S.string().format(S.FORMATS.EMAIL), S.const("")]),
  RequiredEmail: S.string().format(S.FORMATS.EMAIL).minLength(1),
  Id: Id,
  IdParam: S.object().prop("id", Id),
  Phone: S.oneOf([S.string().pattern("^[0-9]{3} [0-9]{3}-[0-9]{4}$"), S.const("")]),
  Picker: S.object().patternProperties({
    "^.*$": S.anyOf([Id, S.string(), S.null()]), // Match any string as the property name
  }),
  ShortString: S.string().maxLength(MaxStringLength),
  Uri: S.oneOf([S.string().format(S.FORMATS.URI), S.const("")]),
  Enum: (list) => {
    return S.enum(list);
  },
};

/**
 * Default response including user data.
 *
 * @param   {any} data Response data to attach to response.
 * @returns {any}      response
 */
const getResponse = (data) => {
  return {
    "2xx": S.object().prop("data", data),
    default: S.object().prop("data", S.object().prop("message", S.string())),
  };
};

/**
 * Default add response returning rowCount.
 */
const getAddResponse = () => {
  getResponse(S.object().prop("rowCount", S.integer()));
};

/**
 * Default update response returning id.
 */
const getUpdateResponse = () => {
  getResponse(Schema.Id);
};

/**
 * Default delete response returning number.
 */
const getDeleteResponse = () => {
  getResponse(S.number());
};

exports.Schema = Schema;
exports.getResponse = getResponse;
exports.getAddResponse = getAddResponse;
exports.getUpdateResponse = getUpdateResponse;
exports.getDeleteResponse = getDeleteResponse;
