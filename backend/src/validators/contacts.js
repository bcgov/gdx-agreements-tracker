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
          first_name: {type: "string"},
          last_name: {type: "string"},
          job_title:{type: "string"},
          ministry_id:{type: "string"},
          notes:{type: "string"},
          created_at:{type: "string"},
          updated_at:{type: "string"}
        },
      },
    },
  },
};

module.exports = {
  getOneValidator,
};
