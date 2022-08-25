const getOne = {
  params: {
    id: { type: "integer" },
  },
};

const addOne = {
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
  },
  body: {
    type: "object",
    required: ["email", "name", "role_id"],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      role_id: { type: "integer" },
    },
  },
};
const deleteOne = getOne;

module.exports = {
  getOne,
  addOne,
  deleteOne,
};
