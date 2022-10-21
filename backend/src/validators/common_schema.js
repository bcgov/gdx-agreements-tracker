const S = require("fluent-json-schema");

const Id = S.integer().minimum(0);

const MaxStringLength = 255;

/**
 * Collection of commonly used field validations.
 */
const Schema = {
  Money: S.oneOf([S.number().multipleOf(0.01), S.const("")]),
  Date: S.oneOf([S.string().format(S.FORMATS.DATE_TIME), S.const("")]),
  RequiredDate: S.string().format(S.FORMATS.DATE_TIME).minLength(1),
  Email: S.oneOf([S.string().format(S.FORMATS.EMAIL), S.const("")]),
  RequiredEmail: S.string().format(S.FORMATS.EMAIL).minLength(1),
  Id: Id,
  IdParam: S.object().prop("id", Id),
  Phone: S.oneOf([S.string().pattern("^[0-9]{3} [0-9]{3}-[0-9]{4}$"), S.const("")]),
  Picker: S.object()
    .prop("value", S.anyOf([Id, S.string(), S.null()]))
    .prop("label", S.string()),
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
    "2xx": S.object()
      .prop("data", data)
      .prop(
        "user",
        S.object()
          .prop("capabilities", S.array().items(S.string()))
          .prop("email", S.string())
          .prop("name", S.string())
          .prop("preferred_username", S.string())
          .prop("roles", S.array().items(S.string()))
      ),
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