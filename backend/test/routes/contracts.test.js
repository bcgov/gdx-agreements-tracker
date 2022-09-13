const model = require("../../src/models/contracts.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/contracts.js");

const capability = ["contracts_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/contracts" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
