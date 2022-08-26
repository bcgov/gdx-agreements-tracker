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
