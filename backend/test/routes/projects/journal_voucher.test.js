const model = require("@models/projects/journal_voucher");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/projects/journal_voucher");

testRoutes([
  {
    request: { method: "GET", url: "projects/1/jv" },
    modelFunction: model.findAll,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/jv/1" },
    modelFunction: model.findById,
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
]);
