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
    properties: {},
  },
};
const updateOne = {};

const deleteOne = getOne;

module.exports = {
  getOne,
  addOne,
  updateOne,
  deleteOne,
};
