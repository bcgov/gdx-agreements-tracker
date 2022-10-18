const model = require("../../src/models/client_coding.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/client_coding.js");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/client-coding" },
    modelFunction: model.findAll,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/projects/client-coding/1" },
    modelFunction: model.findById,
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "PUT", url: "/projects/client-coding/1", payload: {} },
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "POST", url: "/projects/1/client-coding", payload: {} },
    modelFunction: model.addOne,
    capabilities: ["projects_add_one"],
    type: routeTypes.General,
  },
]);
