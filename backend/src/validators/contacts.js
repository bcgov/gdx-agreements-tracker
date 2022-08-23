const REQUIRED_STRING_VALIDATION = { type: "string", minLength: 1, maxLength: 255 };
const OPTIONAL_STRING_VALIDATION = { type: "string", maxLength: 255 };
const BODY_PROPERTY_VALIDATIONS = {
  last_name: REQUIRED_STRING_VALIDATION,
  first_name: REQUIRED_STRING_VALIDATION,
  email: OPTIONAL_STRING_VALIDATION,
  contact_phone: OPTIONAL_STRING_VALIDATION,
  contact_title: OPTIONAL_STRING_VALIDATION,
  ministry_id: { type: "integer", minimum: 0 },
  business_area_id: { type: "integer" },
  address: OPTIONAL_STRING_VALIDATION,
  city: OPTIONAL_STRING_VALIDATION,
  province: OPTIONAL_STRING_VALIDATION,
  postal: OPTIONAL_STRING_VALIDATION,
  country: OPTIONAL_STRING_VALIDATION,
  website: OPTIONAL_STRING_VALIDATION,
  mobile: OPTIONAL_STRING_VALIDATION,
  fax: OPTIONAL_STRING_VALIDATION,
  notes: { type: "string" },
};

const getOneValidator = {
  // Request parameters.
  params: {
    id: { type: "integer" },
  },
  // Response validation.
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          id: { type: "integer" },
        },
      },
    },
  },
};

const updateOneValidator = {
  // Request parameters.
  params: {
    id: { type: "integer" },
  },
  // Body validation.
  body: {
    type: "object",
    properties: BODY_PROPERTY_VALIDATIONS,
  },
};

const addOneValidator = {
  // Body validation.
  body: {
    type: "object",
    required: ["last_name", "first_name"],
    properties: BODY_PROPERTY_VALIDATIONS,
  },
};

module.exports = {
  getOneValidator,
  updateOneValidator,
  addOneValidator,
};
