const getOneValidator = {
    // Request parameters.
    params: {
      id: { type: "string" },
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
  
  module.exports = {
    getOneValidator,
  };
  