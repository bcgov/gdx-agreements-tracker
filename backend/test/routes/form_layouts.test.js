const model = require("../../src/models/form_layouts.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/form_layouts.js");

const capability = ["general_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/form_layouts" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
