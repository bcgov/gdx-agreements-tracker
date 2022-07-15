const getOneValidator = {
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

module.exports = {
  getOneValidator,
};
