const model = require("../../src/models/subcontractors.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/subcontractors.js");

const capability = ["subcontractors_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/subcontractors" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/subcontractors/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/subcontractors/1",
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
      url: "/subcontractors",
      payload: {
        subcontractor_name: "Test subcontractor",
      },
    },
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
