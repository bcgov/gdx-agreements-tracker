const getOneValidator = {
  // Request parameters.
  params: {
    changeRequestId: { type: "string" },
    projectId: { type: "string" },
  },
  // Response validation.
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          changeRequestId: { type: "integer" },
          projectId: { type: "string" },
        },
      },
    },
  },
};

module.exports = {
  getOneValidator,
};
