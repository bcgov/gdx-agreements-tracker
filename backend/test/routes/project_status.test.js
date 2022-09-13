const model = require("../../src/models/project_status.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/project_status.js");

testRoutes([
  {
    request: { method: "GET", url: "/project_status" },
    modelFunction: model.findAll,
    capabilities: ["project_statuses_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/project_status/1" },
    modelFunction: model.findById,
    capabilities: ["project_statuses_read_all"],
    type: routeTypes.Specific,
  },
]);
