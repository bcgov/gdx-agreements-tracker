const model = require("@models/form_layouts/index");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/form_layouts/index");

const capability = ["general_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/form_layouts" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
