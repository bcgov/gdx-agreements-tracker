const getOne = {
  // Request parameters.
  params: {
    projectId: { type: "string" },
  },
  // Response validation.
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          projectId: { type: "integer" },
        },
      },
    },
  },
};

const getCloseOut = {
  // Request parameters.
  params: {
    projectId: { type: "integer" },
  },
};

const requiredStringValidation = { type: "string", minLength: 1, maxLength: 255 };
const optionalStringValidation = { type: "string", maxLength: 255 };
const yesNoEnum = ["Yes", "No", "N/A", null];

const updateOne = {
  // Request parameters.
  params: {
    id: { type: "integer" },
  },
  // Body validation.
  body: {
    type: "object",
    properties: {
      project_number: requiredStringValidation,
      project_name: requiredStringValidation,
      project_version: optionalStringValidation,
      ministry_id: { type: "integer" },
      initiation_date: { type: "string", format: "date-time" },
      portfolio_id: { type: "integer" },
      planned_start_date: { type: "string", format: "date-time" },
      fiscal: { type: "integer" },
      planned_end_date: { type: "string", format: "date-time" },
      planned_budget: { type: "number" },
      project_type: optionalStringValidation,
      funding: optionalStringValidation,
      total_project_budget: { type: "number" },
      recoverable: optionalStringValidation,
      recoverable_amount: { type: "number" },
      close_out_date: { type: "string", format: "date-time" },
      completed_by_contact_id: { type: "integer", minimum: 0 },
      actual_completion_date: { type: "string", format: "date-time" },
      hand_off_to_operations: { enum: yesNoEnum },
      records_filed: { enum: yesNoEnum },
      contract_ev_completed: { enum: yesNoEnum },
      contractor_security_terminated: { enum: yesNoEnum },
    },
  },
};

module.exports = {
  getOne,
  getCloseOut,
  updateOne,
};
