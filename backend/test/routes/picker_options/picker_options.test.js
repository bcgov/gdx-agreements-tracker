const model = require("@models/picker_options");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/picker_options");

const capability = ["general_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/picker_options" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/picker_options/project/1" },
    modelFunction: model.findAllByProject,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/picker_options/contract/1" },
    modelFunction: model.findAllByContract,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
