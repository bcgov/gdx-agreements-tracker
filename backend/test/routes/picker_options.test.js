const model = require("../../src/models/picker_options.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/picker_options.js");

const capability = ["general_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/picker_options" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
