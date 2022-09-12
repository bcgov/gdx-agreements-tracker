const model = require("../../src/models/ministry.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/ministry.js");

const capability = ["ministries_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/ministries" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/ministries/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/ministries/1",
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
      url: "/ministries",
      payload: {
        ministry_name: "Test ministry",
        ministry_short_name: "TSMN",
      },
    },
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
