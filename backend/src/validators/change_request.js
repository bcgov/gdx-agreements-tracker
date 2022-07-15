const getOneValidator = {
  // Request parameters.
  params: {
    change_request_id: { type: "string" },
    project_id: { type: "string" },
  },
  // Response validation.
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          change_request_id: { type: "integer" },
          project_id: { type: "string" },
        },
      },
    },
  },
};

module.exports = {
  getOneValidator,
};
