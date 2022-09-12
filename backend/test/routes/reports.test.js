const model = require("../../src/models/report.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/report.js");

const capability = ["reports_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/report/projects/1" },
    modelFunction: model.findById,
    capabilities: ["reports_update_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "GET", url: "/report/projects/ProjectBudgetReport" },
    modelFunction: model.projectBudgetReport,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: { method: "GET", url: "/report/projects/ProjectQuarterlyReport" },
    modelFunction: model.projectQuarterlyReport,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: { method: "GET", url: "/report/projects/ProjectStatusReport" },
    modelFunction: model.projectStatusReport,
    capabilities: capability,
    type: routeTypes.Specific,
  },
]);
