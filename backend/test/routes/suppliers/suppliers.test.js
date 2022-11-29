const model = require("@models/suppliers");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/suppliers");

testRoutes([
  {
    request: { method: "GET", url: "/suppliers" },
    modelFunction: model.findAll,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/suppliers/1" },
    modelFunction: model.findById,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/suppliers/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: ["admin_form_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/suppliers",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.addOne,
    capabilities: ["admin_form_add_one"],
    type: routeTypes.General,
  },
]);
