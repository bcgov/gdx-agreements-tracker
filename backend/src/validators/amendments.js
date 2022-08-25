const getOneValidator = {
  // Request parameters.
  params: {
    contractId: { type: "string" },
    amendmentId: { type: "string" },
  },
  // Response validation.
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          contractId: { type: "integer" },
          amendmentId: { type: "string" },
        },
      },
    },
  },
};

module.exports = {
  getOneValidator,
};
