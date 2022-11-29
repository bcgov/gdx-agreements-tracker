const model = require("@models/subcontractors");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/subcontractors");

testRoutes([
  {
    request: { method: "GET", url: "/subcontractors" },
    modelFunction: model.findAll,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/subcontractors/1" },
    modelFunction: model.findById,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/subcontractors/1",
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
      url: "/subcontractors",
      payload: {
        subcontractor_name: "Test subcontractor",
      },
    },
    modelFunction: model.addOne,
    capabilities: ["admin_form_add_one"],
    type: routeTypes.General,
  },
]);
