const model = require("../../src/models/suppliers.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/suppliers.js");

const capability = ["suppliers_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/suppliers" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/suppliers/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/suppliers/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/suppliers",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
